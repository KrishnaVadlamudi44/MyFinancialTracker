export interface IPlaidBalance {
  current: number;
  available?: number;
  limit?: number;
  iSOCurrencyCode: string;
  unoffcialCurrencyCode: string;
}
