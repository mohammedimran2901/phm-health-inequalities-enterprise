import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Area {
  lsoa_code: string;
  lsoa_name: string;
  la_name: string;
  imd_rank: number;
  imd_score: number;
  imd_quintile: number;
}

export interface AreaDetails {
  lsoa_code: string;
  lsoa_name: string;
  la_code: string;
  la_name: string;
  imd_rank: number;
  imd_score: number;
  imd_quintile: number;
  domain_scores: {
    income: number;
    employment: number;
    education: number;
    health: number;
    crime: number;
    housing: number;
    environment: number;
  };
}

export interface InequalityMetrics {
  sii: number;
  rii: number;
  absolute_gap: number;
  relative_gap_percent: number;
}

export interface AIInsight {
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface AnalyticsData {
  metric: string;
  summary: {
    metric: string;
    mean: number;
    median: number;
    std: number;
    min: number;
    max: number;
  };
  inequality: InequalityMetrics;
  quintile_data: Array<{
    quintile: number;
    quintile_label: string;
    mean: number;
    std: number;
    n: number;
  }>;
  insights: AIInsight[];
}

export interface Core20Summary {
  total_lsoas: number;
  core20_count: number;
  core20_percentage: number;
  avg_imd_score: number;
  priority_areas: Array<{
    lsoa11nm: string;
    lad19nm: string;
    imd_rank: number;
    imd_score: number;
  }>;
}

// API Functions
export async function searchAreas(query: string, limit: number = 20): Promise<Area[]> {
  const response = await api.post('/api/areas/search', { query, limit });
  return response.data;
}

export async function getAreaDetails(lsoaCode: string): Promise<AreaDetails> {
  const response = await api.get(`/api/areas/${lsoaCode}`);
  return response.data;
}

export async function getAnalytics(metric: string = 'imd_score', laCode?: string): Promise<AnalyticsData> {
  const params = new URLSearchParams();
  params.append('metric', metric);
  if (laCode) params.append('la_code', laCode);
  
  const response = await api.post(`/api/analytics?${params.toString()}`);
  return response.data;
}

export async function getCore20Summary(laCode?: string): Promise<Core20Summary> {
  const params = new URLSearchParams();
  if (laCode) params.append('la_code', laCode);
  
  const response = await api.get(`/api/core20/summary?${params.toString()}`);
  return response.data;
}

export async function getLocalAuthorities() {
  const response = await api.get('/api/las');
  return response.data;
}

export async function exportData(format: string = 'csv') {
  const response = await api.get(`/api/export/csv?format=${format}`);
  return response.data;
}