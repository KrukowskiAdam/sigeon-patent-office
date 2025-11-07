# Instrukcje konfiguracji formularza kontaktowego - SIGEON

## 🎯 Cel
Skonfigurować wysyłanie email z formularza kontaktowego na stronie używając konta `ip@sigeon.pl`

## 🔐 Bezpieczeństwo
**WAŻNE**: Tylko Ty będziesz znał swoje hasło email. Developer nie będzie miał dostępu do Twoich danych logowania.

## 📋 Kroki do wykonania

### Krok 1: Zdobądź ustawienia SMTP
Skontaktuj się z dostawcą hostingu (gdzie masz domenę sigeon.pl) i zapytaj o:
- **SMTP Host** (np. mail.sigeon.pl, smtp.sigeon.pl)  
- **SMTP Port** (zwykle 587 lub 465)
- **Typ bezpieczeństwa** (TLS dla portu 587, SSL dla portu 465)

**Przykładowe ustawienia dla popularnych dostawców:**
- **OVH**: ssl0.ovh.net, port 587, TLS
- **nazwa.pl**: mail.nazwa.pl, port 587, TLS  
- **home.pl**: mail.home.pl, port 587, TLS
- **Sprawdź w panelu hostingu**: sekcja "Email" lub "Poczta"

### Krok 2: Wejdź do CMS
1. Otwórz: https://studio-sigeon.sanity.studio/
2. Zaloguj się swoim kontem
3. W menu z lewej strony kliknij **"Email Settings"**

### Krok 3: Skonfiguruj ustawienia
Wypełnij formularz:

**Configuration Name:** `Email Configuration - IP Sigeon`

**SMTP Host:** `[wpisz dane od dostawcy hostingu]`
- Przykład: `mail.sigeon.pl` lub `smtp.sigeon.pl`

**SMTP Port:** `587` (lub jak podał dostawca)

**Use SSL/TLS:** `false` dla portu 587, `true` dla portu 465

**SMTP Username:** `ip@sigeon.pl`

**SMTP Password:** `[Twoje hasło do konta ip@sigeon.pl]`

**Sender Name:** `Formularz kontaktowy - Sigeon`

**Active Configuration:** `true` ✅

### Krok 4: Zapisz i przetestuj
1. Kliknij **"Publish"**
2. Wejdź na stronę sigeon.pl
3. Wypełnij formularz kontaktowy i wyślij testową wiadomość
4. Sprawdź czy email dotarł na `ip@sigeon.pl`

## 🆘 Pomoc techniczna

### Jeśli formularz nie działa:
1. **Sprawdź ustawienia SMTP** - skontaktuj się z dostawcą hostingu
2. **Sprawdź hasło** - upewnij się, że to rzeczywiste hasło do `ip@sigeon.pl`  
3. **Sprawdź port** - spróbuj 465 z SSL=true jeśli 587 nie działa

### Najczęstsze problemy:
- **"Authentication failed"** = złe hasło lub username
- **"Connection refused"** = zły host lub port
- **"SSL/TLS error"** = niewłaściwe ustawienia bezpieczeństwa

### Kontakt z developerem:
Jeśli nadal są problemy, napisz do developera:
- ❌ **NIE podawaj** hasła email
- ✅ **Podaj** jakie ustawienia SMTP otrzymałeś od hostingu  
- ✅ **Podaj** jaki błąd widzisz w formularzu

## ✅ Po udanej konfiguracji
Formularz będzie działał na:
- **Strona główna** (sekcja kontakt)
- **Strona /contact** 
- **Wszystkie przyszłe formularze** na stronie

Emails będą wysyłane z adresu `ip@sigeon.pl` i odpowiedzi będą przychodziły na ten sam adres.