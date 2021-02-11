import { IPlaidBalance } from './PlaidBalance';

export interface IPlaidAccount {
  id: string;
  itemId: string;
  institutionId: string;
  name: string;
  mask: string;
  officialName: string;
  type: string;
  subType: string;
  balance: IPlaidBalance;
  owners: any;
}
