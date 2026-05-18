"""
HealthMap AI Enterprise - FastAPI Backend
Professional API for health inequalities analysis
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import pandas as pd
import numpy as np
from datetime import datetime
import os
import sys

# Add original src to path for analytics
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'phm-health-inequalities', 'src'))

from analytics.core20plus5 import Core20PLUS5Analyzer
from analytics.inequality_metrics import (
    calculate_slope_index_inequality,
    calculate_gap_analysis,
    calculate_quintile_progression
)
from data_acquisition.imd_fetcher import IMDFetcher

app = FastAPI(
    title="HealthMap AI Enterprise API",
    description="Professional health inequalities analysis API for NHS ICS and trusts",
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Data cache
_imd_data = None

def get_imd_data():
    """Lazy load IMD data."""
    global _imd_data
    if _imd_data is None:
        fetcher = IMDFetcher()
        _imd_data = fetcher.get_combined_imd_data()
    return _imd_data

# ============================================================================
# Pydantic Models
# ============================================================================

class AreaSearchRequest(BaseModel):
    query: str
    limit: int = 20

class AreaResponse(BaseModel):
    lsoa_code: str
    lsoa_name: str
    la_name: str
    imd_rank: int
    imd_score: float
    imd_quintile: int

class MetricSummary(BaseModel):
    metric: str
    mean: float
    median: float
    std: float
    min: float
    max: float

class InequalityMetrics(BaseModel):
    sii: float
    rii: float
    absolute_gap: float
    relative_gap_percent: float

class AIInsight(BaseModel):
    type: str
    message: str
    severity: str  # "info", "warning", "critical"

class AnalyticsResponse(BaseModel):
    metric: str
    summary: MetricSummary
    inequality: InequalityMetrics
    quintile_data: List[Dict[str, Any]]
    insights: List[AIInsight]

class Core20Summary(BaseModel):
    total_lsoas: int
    core20_count: int
    core20_percentage: float
    avg_imd_score: float
    priority_areas: List[Dict[str, Any]]

# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    return {
        "name": "HealthMap AI Enterprise API",
        "version": "2.0.0",
        "status": "operational",
        "endpoints": {
            "docs": "/api/docs",
            "areas": "/api/areas",
            "analytics": "/api/analytics",
            "core20": "/api/core20"
        }
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "data_loaded": _imd_data is not None
    }

@app.post("/api/areas/search", response_model=List[AreaResponse])
async def search_areas(request: AreaSearchRequest):
    """Search for areas by name."""
    df = get_imd_data()
    
    mask = (
        df['lsoa11nm'].str.contains(request.query, case=False, na=False) |
        df['lad19nm'].str.contains(request.query, case=False, na=False)
    )
    results = df[mask].head(request.limit)
    
    return [
        AreaResponse(
            lsoa_code=row['lsoa11cd'],
            lsoa_name=row['lsoa11nm'],
            la_name=row['lad19nm'],
            imd_rank=int(row['imd_rank']),
            imd_score=float(row['imd_score']),
            imd_quintile=int(row['imd_quintile'])
        )
        for _, row in results.iterrows()
    ]

@app.get("/api/areas/{lsoa_code}")
async def get_area_details(lsoa_code: str):
    """Get detailed information for a specific area."""
    df = get_imd_data()
    area = df[df['lsoa11cd'] == lsoa_code]
    
    if area.empty:
        raise HTTPException(status_code=404, detail="Area not found")
    
    row = area.iloc[0]
    return {
        "lsoa_code": row['lsoa11cd'],
        "lsoa_name": row['lsoa11nm'],
        "la_code": row['lad19cd'],
        "la_name": row['lad19nm'],
        "imd_rank": int(row['imd_rank']),
        "imd_score": float(row['imd_score']),
        "imd_quintile": int(row['imd_quintile']),
        "domain_scores": {
            "income": float(row['income_score']),
            "employment": float(row['employment_score']),
            "education": float(row['education_score']),
            "health": float(row['health_score']),
            "crime": float(row['crime_score']),
            "housing": float(row['housing_score']),
            "environment": float(row['environment_score'])
        }
    }

@app.post("/api/analytics", response_model=AnalyticsResponse)
async def get_analytics(metric: str = "imd_score", la_code: Optional[str] = None):
    """Get inequality analytics for a metric."""
    df = get_imd_data()
    
    # Filter by LA if specified
    if la_code:
        df = df[df['lad19cd'] == la_code]
    
    if df.empty:
        raise HTTPException(status_code=404, detail="No data found")
    
    # Calculate metrics
    sii = calculate_slope_index_inequality(df, metric)
    gap = calculate_gap_analysis(df, metric)
    quintile = calculate_quintile_progression(df, metric)
    
    # Generate AI insights
    insights = []
    core20_pct = (df['imd_quintile'] == 1).mean() * 100
    
    if core20_pct > 25:
        insights.append(AIInsight(
            type="deprivation",
            message=f"High deprivation concentration: {core20_pct:.1f}% in Core 20%",
            severity="critical"
        ))
    
    if gap['relative_gap_percent'] > 50:
        insights.append(AIInsight(
            type="inequality",
            message=f"Significant inequality gap: {gap['relative_gap_percent']:.1f}%",
            severity="warning"
        ))
    
    return AnalyticsResponse(
        metric=metric,
        summary=MetricSummary(
            metric=metric,
            mean=float(df[metric].mean()),
            median=float(df[metric].median()),
            std=float(df[metric].std()),
            min=float(df[metric].min()),
            max=float(df[metric].max())
        ),
        inequality=InequalityMetrics(
            sii=float(sii['sii']),
            rii=float(sii['rii']) if sii['rii'] else 0,
            absolute_gap=float(gap['absolute_gap']),
            relative_gap_percent=float(gap['relative_gap_percent']) if gap['relative_gap_percent'] else 0
        ),
        quintile_data=quintile.to_dict('records'),
        insights=insights
    )

@app.get("/api/core20/summary", response_model=Core20Summary)
async def get_core20_summary(la_code: Optional[str] = None):
    """Get Core20PLUS5 summary."""
    df = get_imd_data()
    
    if la_code:
        df = df[df['lad19cd'] == la_code]
    
    analyzer = Core20PLUS5Analyzer(df)
    core20 = analyzer.get_core20_areas()
    
    # Priority areas (top 10 most deprived)
    priority = core20.nsmallest(10, 'imd_rank')[['lsoa11nm', 'lad19nm', 'imd_rank', 'imd_score']]
    
    return Core20Summary(
        total_lsoas=len(df),
        core20_count=len(core20),
        core20_percentage=len(core20) / len(df) * 100,
        avg_imd_score=float(core20['imd_score'].mean()),
        priority_areas=priority.to_dict('records')
    )

@app.get("/api/las")
async def get_local_authorities():
    """Get list of all local authorities."""
    df = get_imd_data()
    las = df.groupby(['lad19cd', 'lad19nm']).size().reset_index(name='lsoa_count')
    return las.to_dict('records')

@app.get("/api/export/csv")
async def export_csv(format: str = "csv"):
    """Export data as CSV."""
    df = get_imd_data()
    
    if format == "csv":
        return {
            "data": df.to_csv(index=False),
            "filename": f"health_inequalities_{datetime.now().strftime('%Y%m%d')}.csv",
            "content_type": "text/csv"
        }
    
    raise HTTPException(status_code=400, detail="Unsupported format")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)