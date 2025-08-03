# Modern AI Governance Matrix - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git
- Mapbox account (for interactive maps)
- Algolia account (optional, for search)
- Vercel/Netlify account (for deployment)

### Local Development

1. **Clone and Install**
```bash
git clone https://github.com/yourusername/ai-governance-matrix-modern.git
cd ai-governance-matrix-modern
npm install
```

2. **Environment Variables**
Create `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_API_KEY=your_algolia_search_key
MAILCHIMP_API_KEY=your_mailchimp_key
MAILCHIMP_LIST_ID=your_list_id
```

3. **Run Development Server**
```bash
npm run dev
# Open http://localhost:3000
```

## 📦 Project Structure

```
ai-governance-matrix/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── country/[id]/      # Dynamic country pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── comparison-matrix.tsx
│   ├── interactive-map.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── data.ts           # Data fetching
│   ├── export.ts         # Export utilities
│   └── utils.ts          # Helper functions
├── data/                  # JSON data files
│   └── governance-data.json
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   └── locales/          # i18n translations
└── next.config.js        # Next.js config
```

## 🌐 Deployment Options

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy with Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure environment variables
- Deploy!

3. **Custom Domain**
- Add domain in Vercel dashboard
- Update DNS records

### Netlify

1. **Build Command**
```bash
npm run build
```

2. **Publish Directory**
```
.next
```

3. **Environment Variables**
Set in Netlify dashboard

### Docker Deployment

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Incremental Static Regeneration (ISR)

Pages are revalidated every hour:
```typescript
export const revalidate = 3600 // 1 hour
```

### API Endpoints

- `/api/governance` - Main data API
- `/api/governance?format=csv` - CSV export
- `/api/governance?country=eu` - Filter by country
- `/api/governance?region=Europe` - Filter by region

### PWA Configuration

The app works offline after first visit:
- Caches static assets
- Stores JSON data locally
- Updates in background

### Search Integration

1. **Create Algolia Index**
- Upload governance data
- Configure searchable attributes
- Set up facets for filtering

2. **Update Search Component**
```typescript
// components/search-section.tsx
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
)
```

## 📊 Analytics & Monitoring

### Google Analytics 4

Add to `app/layout.tsx`:
```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Performance Monitoring

- Use Vercel Analytics
- Monitor Core Web Vitals
- Set up alerts for downtime

## 🌍 Internationalization

### Add New Language

1. **Create Translation Files**
```
public/locales/tr/common.json
public/locales/tr/governance.json
```
