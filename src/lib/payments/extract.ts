import {
  findLedgerByExternalReference,
  listLedgerEntries,
  markLedgerReconciled,
} from "@/lib/store";
import type { ExtractMatchResult, ExtractRow, LedgerEntry } from "@/lib/types";

function parseAmountToCents(raw: string): number | null {
  const cleaned = raw.trim().replace(/R\$\s?/i, "").replace(/\s/g, "");
  if (!cleaned) return null;

  // 1.234,56 ou 1234,56 (BR) | 1234.56 (US)
  if (cleaned.includes(",")) {
    const normalized = cleaned.replace(/\./g, "").replace(",", ".");
    const value = Number(normalized);
    return Number.isFinite(value) ? Math.round(value * 100) : null;
  }

  const value = Number(cleaned);
  if (!Number.isFinite(value)) return null;
  // Se for inteiro grande sem decimal, assume reais; se tiver ponto, decimais
  if (cleaned.includes(".")) return Math.round(value * 100);
  return Math.round(value * 100);
}

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    if (ch === ";" && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function headerIndex(headers: string[], aliases: string[]): number {
  const normalized = headers.map((h) => h.toLowerCase().normalize("NFD").replace(/\p{M}/gu, ""));
  for (const alias of aliases) {
    const idx = normalized.findIndex((h) => h === alias || h.includes(alias));
    if (idx >= 0) return idx;
  }
  return -1;
}

/**
 * CSV diário Itaú (flexível).
 * Cabeçalhos aceitos: data/date, valor/amount, nsu, referencia/external_reference
 * Separador: vírgula ou ponto-e-vírgula.
 */
export function parseExtractCsv(csvText: string): ExtractRow[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]!);
  const dateIdx = headerIndex(headers, ["data", "date", "dt"]);
  const amountIdx = headerIndex(headers, ["valor", "amount", "value", "vl"]);
  const nsuIdx = headerIndex(headers, ["nsu", "autorizacao", "authorization"]);
  const refIdx = headerIndex(headers, ["referencia", "reference", "external_reference", "ref"]);

  if (amountIdx < 0) {
    throw new Error("CSV precisa de coluna de valor (valor / amount)");
  }

  const rows: ExtractRow[] = [];
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const amountCents = parseAmountToCents(cells[amountIdx] ?? "");
    if (amountCents == null || amountCents === 0) continue;

    rows.push({
      date: dateIdx >= 0 ? cells[dateIdx] || null : null,
      amountCents,
      nsu: nsuIdx >= 0 ? cells[nsuIdx] || null : null,
      externalReference: refIdx >= 0 ? cells[refIdx] || null : null,
      raw: line,
    });
  }

  return rows;
}

function findCandidateForRow(row: ExtractRow, pool: LedgerEntry[]): LedgerEntry | undefined {
  if (row.externalReference) {
    const byRef = findLedgerByExternalReference(row.externalReference);
    if (byRef) return byRef;
  }

  if (row.nsu) {
    const byNsu = pool.find((e) => e.nsu && e.nsu === row.nsu);
    if (byNsu) return byNsu;
  }

  // Prioriza restante pago (baixa manual da Amanda) ainda não conciliado
  const paidRestante = pool.find(
    (e) =>
      e.kind === "restante" &&
      e.status === "paid" &&
      !e.reconciledAt &&
      e.amountCents === row.amountCents,
  );
  if (paidRestante) return paidRestante;

  return pool.find(
    (e) => e.status === "paid" && !e.reconciledAt && e.amountCents === row.amountCents,
  );
}

/**
 * Concilia o extrato do dia com o Caixa.
 * Marca `reconciledAt` nas linhas que baterem (ref, NSU ou valor).
 */
export function reconcileDailyExtract(csvText: string): {
  ok: boolean;
  results: ExtractMatchResult[];
  matched: number;
  unmatched: number;
  error?: string;
} {
  let rows: ExtractRow[];
  try {
    rows = parseExtractCsv(csvText);
  } catch (error) {
    return {
      ok: false,
      results: [],
      matched: 0,
      unmatched: 0,
      error: error instanceof Error ? error.message : "CSV inválido",
    };
  }

  if (rows.length === 0) {
    return { ok: false, results: [], matched: 0, unmatched: 0, error: "Nenhuma linha útil no extrato" };
  }

  const pool = listLedgerEntries();
  const used = new Set<string>();
  const results: ExtractMatchResult[] = [];
  let matched = 0;
  let unmatched = 0;

  for (const row of rows) {
    const available = pool.filter((e) => !used.has(e.id));
    const candidate = findCandidateForRow(row, available);

    if (!candidate) {
      unmatched += 1;
      results.push({
        row,
        status: "unmatched",
        ledgerEntryId: null,
        message: "Sem correspondente no Caixa",
      });
      continue;
    }

    if (candidate.reconciledAt) {
      used.add(candidate.id);
      results.push({
        row,
        status: "already_reconciled",
        ledgerEntryId: candidate.id,
        message: "Já conciliado anteriormente",
      });
      continue;
    }

    markLedgerReconciled(candidate.id);
    used.add(candidate.id);
    matched += 1;
    results.push({
      row,
      status: "matched",
      ledgerEntryId: candidate.id,
      message: `Conciliado com ${candidate.externalReference}`,
    });
  }

  return { ok: true, results, matched, unmatched };
}
