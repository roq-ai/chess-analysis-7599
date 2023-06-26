import { ChessPositionInterface } from 'interfaces/chess-position';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AccountInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  chess_position?: ChessPositionInterface[];
  user?: UserInterface;
  _count?: {
    chess_position?: number;
  };
}

export interface AccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
