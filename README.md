# Sigeon - Patent Office Website
cd /Users/adamkrukowski/Desktop/WEB/sigeon/frontend && npm run dev & cd /Users/adamkrukowski/Desktop/WEB/sigeon/studio-sigeon && npm run dev

Multi-language website for a patent office built with Next.js and Sanity CMS.

## 🚀 Tech Stack

- **Frontend**: Next.js 15.5.6 with TypeScript
- **CMS**: Sanity v4.11.0 with React 19.1
- **UI**: shadcn/ui components with Tailwind CSS v3
- **Languages**: Polish (default), English, Chinese, Korean, Japanese, Russian

## 📁 Project Structure

```
sigeon/
├── frontend/          # Next.js website
│   ├── src/
│   │   ├── app/      # App Router pages
│   │   ├── components/ # UI components
│   │   ├── lib/      # Utilities and API
│   │   └── types/    # TypeScript definitions
│   └── package.json
├── studio-sigeon/     # Sanity CMS
│   ├── schemaTypes/  # Content schemas
│   └── package.json
└── README.md
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd sigeon
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Sanity Studio
   cd ../studio-sigeon
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env.local in frontend folder
   cd ../frontend
   echo "NEXT_PUBLIC_SANITY_TOKEN=your_sanity_token" > .env.local
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Sanity Studio
   cd studio-sigeon
   npm run dev
   # Runs on http://localhost:3333
   
   # Terminal 2: Next.js Frontend  
   cd frontend
   npm run dev
   # Runs on http://localhost:3000
   ```

## 📝 Content Management

### Sanity Studio (CMS)
- **URL**: http://localhost:3333
- **Content Types**: News, Pages, Team Members
- **Multi-language**: All content supports PL/EN/DE translations

### Adding Content

1. **News Articles**
   - Go to Sanity Studio → News → Create
   - Fill title, excerpt, content (Polish required)
   - Check "Featured" to show on homepage
   - Publish

2. **Team Members** 
   - Go to Team Members → Create
   - Add name, position, bio, photo
   - Check "Show on Website" 
   - Set display order
   - Publish

## 🌐 Features

- ✅ Multi-language navigation with flag dropdowns
- ✅ Responsive design for all devices
- ✅ SEO optimized with meta tags
- ✅ Professional UI with shadcn/ui components
- ✅ Content management via Sanity CMS
- ✅ Real-time preview and editing

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel or your hosting provider
```

### Sanity Studio
```bash
cd studio-sigeon
npm run deploy
# Deploys to https://your-project.sanity.studio
```

## 📋 Configuration

### Sanity Configuration
- **Project ID**: pofl8c47
- **Dataset**: production  
- **API Version**: 2023-05-03

### Multi-language Setup
Languages are configured in `frontend/src/contexts/LanguageContext.tsx`:
- Polish (pl) - Default
- English (en)  
- German (de)
- Chinese (zh)
- Korean (ko)
- Japanese (ja)
- Russian (ru)

## 🔧 Development Commands

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Sanity Studio  
npm run dev          # Start studio development
npm run build        # Build studio
npm run deploy       # Deploy studio to Sanity
```

## 📞 Support

For questions about this project, contact the development team.

---

**Built with ❤️ for patent office professionals**