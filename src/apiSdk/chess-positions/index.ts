import axios from 'axios';
import queryString from 'query-string';
import { ChessPositionInterface, ChessPositionGetQueryInterface } from 'interfaces/chess-position';
import { GetQueryInterface } from '../../interfaces';

export const getChessPositions = async (query?: ChessPositionGetQueryInterface) => {
  const response = await axios.get(`/api/chess-positions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createChessPosition = async (chessPosition: ChessPositionInterface) => {
  const response = await axios.post('/api/chess-positions', chessPosition);
  return response.data;
};

export const updateChessPositionById = async (id: string, chessPosition: ChessPositionInterface) => {
  const response = await axios.put(`/api/chess-positions/${id}`, chessPosition);
  return response.data;
};

export const getChessPositionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/chess-positions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChessPositionById = async (id: string) => {
  const response = await axios.delete(`/api/chess-positions/${id}`);
  return response.data;
};
