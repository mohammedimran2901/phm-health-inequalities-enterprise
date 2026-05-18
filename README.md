# HealthMap AI Enterprise

## Enterprise-Grade Health Inequalities Analytics Platform

### Architecture
- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python 3.12
- **Visualizations**: D3.js + Recharts
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Database**: PostgreSQL (via Supabase)

### Project Structure
```
phm-health-inequalities-enterprise/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── package.json         # Node dependencies
    ├── next.config.js       # Next.js config
    └── src/
        ├── app/             # Next.js app directory
        ├── components/      # React components
        └── lib/             # Utilities, API clients
```

### What's Built

#### ✅ Backend (FastAPI)
- [x] REST API endpoints for:
  - Area search
  - Area details
  - Analytics (SII, RII, gap analysis)
  - Core20PLUS5 summary
  - Local authority listing
  - CSV export
- [x] AI insights generation
- [x] Pydantic models for type safety
- [x] CORS configuration
- [x] Auto-generated API docs at `/api/docs`

#### 🚧 Frontend (Next.js) - Foundation
- [x] Project structure
- [x] Package.json with all dependencies
- [x] Next.js config with API proxy
- [x] Basic layout structure

### To Complete

#### Frontend Components Needed:

1. **Design System** (NHS-inspired)
   - Color palette (NHS Blue #005EB8)
   - Typography system
   - Button components
   - Card components
   - Form inputs

2. **Pages**
   - `/` - Landing page with search
   - `/dashboard` - Main dashboard
   - `/analytics` - Detailed analytics
   - `/core20` - Core20PLUS5 tracker
   - `/pricing` - Pricing page
   - `/auth` - Login/signup

3. **Components**
   - `SearchBar` - Google-style search
   - `MetricCard` - KPI cards
   - `ChartContainer` - D3/Recharts wrapper
   - `InequalityChart` - Quintile visualization
   - `AIModal` - AI insights display
   - `PricingTable` - Freemium pricing
   - `Navigation` - Header/nav

4. **Hooks**
   - `useAuth` - Supabase auth
   - `useAnalytics` - Fetch analytics data
   - `useSearch` - Search functionality
   - `useSubscription` - Stripe subscription

5. **API Client**
   - Axios instance
   - Type-safe API methods
   - Error handling
   - Caching

### Installation & Setup

```bash
# Backend
cd backend
pip install -r requirements.txt
python main.py

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### Deployment

**Backend**: Railway, Render, or AWS
**Frontend**: Vercel
**Database**: Supabase

### API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Next Steps

1. Install frontend dependencies: `cd frontend && npm install`
2. Create remaining components
3. Set up Supabase project
4. Configure Stripe
5. Deploy to Vercel/Railway