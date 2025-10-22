// Global color palette for the patent office website
// Based on client's requested color #0abaee

export const colors = {
  // Primary brand colors  
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8', // Light version
    500: '#0abaee', // Main brand color
    600: '#0891b2', // Dark version
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  
  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151', // Main text color
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic colors
  text: {
    primary: '#374151',   // Instead of pure black
    secondary: '#6b7280',
    muted: '#9ca3af',
    inverse: '#ffffff',
  },

  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    accent: '#f0f9ff',
  }
}

// Tailwind class helpers for consistency
export const textColors = {
  primary: 'text-gray-700',
  secondary: 'text-gray-600', 
  muted: 'text-gray-500',
  heading: 'text-gray-800',
  inverse: 'text-white',
}

export const backgroundColors = {
  primary: 'bg-gradient-to-r from-[#0abaee] to-[#0891b2]',
  dark: 'bg-gradient-to-r from-[#0891b2] to-[#0e7490]',
  light: 'bg-gradient-to-r from-[#38bdf8] to-[#0abaee]',
  gray: 'bg-gradient-to-r from-gray-500 to-gray-700',
  white: 'bg-white',
}