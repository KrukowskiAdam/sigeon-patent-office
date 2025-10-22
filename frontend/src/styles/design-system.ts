// Typography utility classes for consistent styling
// Professional legal website design system

export const typography = {
  // Headings - elegant and readable
  h1: 'text-4xl md:text-5xl font-semibold text-gray-800 leading-tight tracking-tight',
  h2: 'text-3xl md:text-4xl font-semibold text-gray-800 leading-tight',
  h3: 'text-2xl md:text-3xl font-medium text-gray-800 leading-snug',
  h4: 'text-xl md:text-2xl font-medium text-gray-700 leading-snug',

  // Hero styles
  hero: 'text-4xl md:text-6xl font-semibold leading-tight tracking-tight',
  heroSubtitle: 'text-xl md:text-2xl font-normal leading-relaxed opacity-90',

  // Body text
  body: 'text-base leading-relaxed text-gray-600',
  bodyLarge: 'text-lg leading-relaxed text-gray-600',

  // Navigation
  nav: 'text-sm font-medium',
  logo: 'text-xl font-semibold tracking-tight',

  // Legal content specific
  legal: 'text-base leading-7 text-gray-700',
} as const

export const colors = {
  // Brand gradients
  primaryGradient: 'bg-gradient-to-r from-[#0abaee] to-[#0891b2]',
  darkGradient: 'bg-gradient-to-r from-[#0891b2] to-[#065f7a]',
  lightGradient: 'bg-gradient-to-r from-[#38bdf8] to-[#0abaee]',
  grayGradient: 'bg-gradient-to-r from-gray-500 to-gray-700',

  // Text colors
  heading: 'text-gray-800',
  body: 'text-gray-600',
  muted: 'text-gray-500',
  brand: 'text-[#0891b2]',
  brandLight: 'bg-[#0abaee]/10 text-[#0891b2]',
} as const