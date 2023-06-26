import { AnalysisInterface } from 'interfaces/analysis';
import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface ChessPositionInterface {
  id?: string;
  position_data: string;
  account_id?: string;
  created_at?: any;
  updated_at?: any;
  analysis?: AnalysisInterface[];
  account?: AccountInterface;
  _count?: {
    analysis?: number;
  };
}

export interface ChessPositionGetQueryInterface extends GetQueryInterface {
  id?: string;
  position_data?: string;
  account_id?: string;
}
