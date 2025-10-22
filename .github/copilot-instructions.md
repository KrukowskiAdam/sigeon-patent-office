# Sigeon - Patent Office Website CMS

## Project Overview
Multi-language Sanity CMS for a patent office website. Supports Polish (default), English, and German content with structured schemas for legal practice content management.

**Key Details:**
- Project ID: `pofl8c47`
- Dataset: `production` 
- Built with React 19.1 and Sanity v4.11.0
- Multi-language support: PL (default), EN, DE

## Content Architecture

### Document Types
- **`news`** - Multi-language news articles with categories (patents, trademarks, legal updates, etc.)
- **`page`** - Static pages (about, services, contact) with navigation control
- **`teamMember`** - Staff profiles with specializations and qualifications

### Internationalization System
- **`localizedString`** - Short text fields in multiple languages (Polish required)
- **`localizedText`** - Textarea fields with language variants
- **`localizedRichText`** - Rich content blocks per language
- Base language configuration in `schemaTypes/locale.ts`

### SEO & Metadata
- **`seoFields`** object includes meta titles, descriptions, Open Graph images
- Integrated into all document types for comprehensive SEO control
- No-index option for internal pages

## Development Workflow

### Essential Commands
```bash
cd studio-sigeon
npm run dev          # Start development server (localhost:3333)
npm run build        # Build for production  
npm run deploy       # Deploy studio to Sanity
npm run deploy-graphql # Deploy GraphQL API
```

### Content Management Patterns
- **Navigation Control**: Pages have `showInNavigation` and `navigationOrder` fields
- **Categorization**: News articles use predefined categories for patent office content
- **Team Management**: Specializations, languages, and display order for staff
- **SEO Integration**: All content types include structured SEO fields

### Schema Organization
- Object types (locale, SEO) must be listed first in `schemaTypes/index.ts`
- Document types follow object types in schema export
- All multilingual fields use `localized*` types from `locale.ts`

## Patent Office Specific Features

### Content Categories
- **Legal Services**: Patents, trademarks, industrial design, copyright
- **News Categories**: Patent news, trademark news, legal updates, company news
- **Team Specializations**: EU law, litigation, specific IP areas
- **Language Support**: Content and team language capabilities

### Business Logic
- Polish content required, other languages optional
- Featured articles for homepage promotion
- Team member display order and visibility control
- Page type classification for different service areas

## Development Notes
- Auto-reload enabled - schema changes refresh studio automatically
- TypeScript strict mode with proper locale type safety
- Prepared for frontend integration with structured, multi-language content