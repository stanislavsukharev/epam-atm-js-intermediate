import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { expect } from '@playwright/test';

export function removeFile(filePath: string): void {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export async function validateDownloadedCsv(
  filePath: string,
  expectedCost: string,
): Promise<void> {
  const csvContent = fs.readFileSync(filePath, 'utf-8');

  const rows: Record<string, string>[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const totalRow = rows.find(
    (row) => row['sku']?.trim() === 'Total Price:',
  );

  if (!totalRow) {
    throw new Error('Row with "Total Price:" not found in column "sku".');
  }

  const actualCost = totalRow['total_price, USD']?.trim();
  if (!actualCost) {
    throw new Error('"total_price, USD" field is missing or empty in the total row.');
  }

  expect(actualCost).toBe(expectedCost.replace(/[^\d.]/g, ''));

  removeFile(filePath);
}
