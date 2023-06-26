import { ChessPositionInterface } from 'interfaces/chess-position';
import { GetQueryInterface } from 'interfaces';

export interface AnalysisInterface {
  id?: string;
  analysis_data: string;
  chess_position_id?: string;
  created_at?: any;
  updated_at?: any;

  chess_position?: ChessPositionInterface;
  _count?: {};
}

export interface AnalysisGetQueryInterface extends GetQueryInterface {
  id?: string;
  analysis_data?: string;
  chess_position_id?: string;
}
