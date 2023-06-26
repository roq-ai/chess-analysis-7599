import axios from 'axios';
import queryString from 'query-string';
import { AnalysisInterface, AnalysisGetQueryInterface } from 'interfaces/analysis';
import { GetQueryInterface } from '../../interfaces';

export const getAnalyses = async (query?: AnalysisGetQueryInterface) => {
  const response = await axios.get(`/api/analyses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAnalysis = async (analysis: AnalysisInterface) => {
  const response = await axios.post('/api/analyses', analysis);
  return response.data;
};

export const updateAnalysisById = async (id: string, analysis: AnalysisInterface) => {
  const response = await axios.put(`/api/analyses/${id}`, analysis);
  return response.data;
};

export const getAnalysisById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/analyses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAnalysisById = async (id: string) => {
  const response = await axios.delete(`/api/analyses/${id}`);
  return response.data;
};
