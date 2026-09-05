# Härlige Benkes Pizza Around the Clock

En färgstark och responsiv React-prototyp för det framtida food-truck-konceptet **Härlige Benkes Pizza**.

## Kom igång

Du behöver Node.js 18 eller senare.

```bash
npm install
npm run dev
```

Öppna adressen som Vite visar, normalt [http://localhost:5173](http://localhost:5173).

## Backoffice-prototyp

Det mobilanpassade, operativa backoffice-läget öppnas med query-parametern
`?h=backoffice`, exempelvis:

- lokalt: `http://localhost:5173/?h=backoffice`
- GitHub Pages: `https://joben-dot.github.io/harlige-benkes/?h=backoffice`

Backoffice använder gemensamma pizzaobjekt för bibliotek, dagens meny, QR-kundvy
och köksvy. Alla ändringar är avsiktligt tillfälliga och finns bara i sidans
React-state tills en riktig leverantör för databas, autentisering, betalning,
positionering, media och streaming kopplas in.

## Bygg och förhandsgranska

```bash
npm run build
npm run preview
```

Produktionsbygget hamnar i `dist/` och använder bas-sökvägen `/harlige-benkes/` för GitHub Pages. `npm run build` verifierar också att JavaScript och CSS i `dist/` kommer direkt från `src/` och att ingen separat vendored App-mall finns.

## Projektstruktur

- `src/App.jsx` – sidans sektioner, komponenter och redigerbar dummydata.
- `src/styles.css` – all responsiv styling och illustrationer.
- `src/main.jsx` – React-startpunkt.

`src/App.jsx` och `src/styles.css` är de enda innehålls- respektive stilkällorna. Den lokala, offline-anpassade Vite-builden kopierar dem byte för byte till körbara `.js`/`.css`-filer i `dist/`; lägg därför inte applikationskod under `vendor/`. Källfilerna innehåller runtime-redo JavaScript med Reacts JSX-runtime så att bygget inte behöver en andra, förkompilerad App-kopia.

Betalningar, formulär, livestatus och länkar till sociala medier är tydligt märkta prototyper och kopplas till riktiga tjänster i en senare version.
