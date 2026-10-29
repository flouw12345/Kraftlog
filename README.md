# nSuns Kraftlog – Offline-App fürs iPhone

Web-App (PWA), die nach einmaliger Installation komplett offline läuft.
Alle Daten liegen lokal auf dem iPhone (IndexedDB). Ein Export ist als JSON-Backup oder CSV möglich.

## Installation über GitHub Pages (kostenlos, geht auch am iPhone)

1. Auf github.com ein neues **öffentliches** Repository anlegen, z. B. `kraftlog`.
2. „Add file → Upload files“ wählen und alle Dateien aus diesem Ordner hochladen:
   `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`.
3. Unter Settings → Pages die Quelle „Deploy from a branch“ einstellen, mit Branch `main` und Ordner `/ (root)`.
4. Nach ca. 1 Minute ist die App erreichbar unter `https://flouw12345.github.io/Kraftlog/`.
5. Die Adresse **in Safari** öffnen und über Teilen → **Zum Home-Bildschirm** hinzufügen.
6. Die App einmal vom Home-Bildschirm aus starten (mit Internet). Ab dann funktioniert sie offline.

Alternativ geht jeder andere HTTPS-Webserver (z. B. ein Container auf dem Homeserver mit Reverse Proxy und TLS).
Service Worker funktionieren nur über HTTPS, deshalb reicht ein reiner HTTP-Server nicht.

## Wichtig zu den Daten

- Die Daten gehören zur Home-Bildschirm-App. In Safari (ohne Home-Icon) sieht man einen getrennten, leeren Speicher.
- Beim Löschen der App vom Home-Bildschirm werden auch die Daten gelöscht. Vorher im Setup ein **Backup exportieren**.
- Ein Backup über Setup → „Backup exportieren (JSON)“ lässt sich mit „In Dateien sichern“ in iCloud Drive ablegen.
  Über „Backup importieren“ stellst du es wieder her, auch auf einem neuen iPhone.
- **Wöchentliches iCloud-Backup:** Ist das letzte Backup älter als 7 Tage, zeigt die App oben einen Hinweis „iCloud-Backup fällig“.
  „Jetzt sichern“ öffnet das Teilen-Menü → „In Dateien sichern“ → iCloud Drive (z. B. Ordner `Kraftlog`). Danach ist für eine Woche Ruhe,
  „Morgen“ verschiebt den Hinweis um einen Tag. Ein- und ausschalten unter Setup → Daten.
  Vollautomatisch im Hintergrund geht es nicht: iOS erlaubt Web-Apps keinen direkten Zugriff auf iCloud Drive, ein Tipp ist immer nötig.
- Die CSV (Semikolon-getrennt, deutsches Zahlenformat) öffnet direkt in Numbers oder Excel.

## Updates

Ersetze `index.html` im Repository. Zusätzlich in `sw.js` die Zeile `const CACHE = "kraftlog-v1"` hochzählen (v2, v3, …).
Beim nächsten Start mit Internet lädt die App die neue Version. Deine Daten bleiben erhalten.

## Puls aus Zepp / Apple Health

Eine Web-App kann Apple Health nicht direkt lesen. Der Weg führt über einen Kurzbefehl, der die Herzfrequenz des Tages
in die Zwischenablage kopiert (Anleitung in der App unter Verlauf → Workout → „Kurzbefehl einrichten“).
Den Inhalt fügst du dann in der App ein. Das funktioniert auch offline, weil Health-Daten lokal auf dem iPhone liegen.
