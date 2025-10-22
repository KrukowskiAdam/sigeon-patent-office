# Avenir Next Font Setup Instructions

## Struktura plików fontów
Skopiuj pliki fontów do: `/public/fonts/`

### Wymagane pliki:
```
public/fonts/
├── AvenirNext-UltraLight.woff2
├── AvenirNext-UltraLight.woff
├── AvenirNext-Regular.woff2  
├── AvenirNext-Regular.woff
├── AvenirNext-Medium.woff2
├── AvenirNext-Medium.woff
├── AvenirNext-DemiBold.woff2
├── AvenirNext-DemiBold.woff
├── AvenirNext-Bold.woff2
├── AvenirNext-Bold.woff
├── AvenirNext-Heavy.woff2
└── AvenirNext-Heavy.woff
```

## Konwersja fontów (jeśli masz TTF/OTF)
Możesz użyć narzędzi online:
- https://cloudconvert.com/ttf-to-woff2
- https://convertio.co/ttf-woff2/

Lub lokalnie z fonttools:
```bash
pip install fonttools[woff]
fonttools ttLib.woff2 compress font.ttf
```

## Optymalizacja
- WOFF2 ma lepszą kompresję (~30% mniejsze pliki)
- WOFF jako fallback dla starszych przeglądarek
- `font-display: swap` dla lepszej wydajności ładowania