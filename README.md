# Jays Central

A data-driven Toronto Blue Jays dashboard, powered by the public MLB Stats API.

**[Live Demo](https://kcgbarbosa.dev)** · **[View Code](https://github.com/kcgbarbosa/torontobluejays-dashboard)**

![Dashboard Preview](<!-- add screenshot here -->)

---

## Stack

React 19 + TypeScript | React Router v7 | Vite | Tailwind CSS v4 | Framer Motion | Vitest

---

## Features

- Featured card shows the current or next game (depending on game status) with pre-game (probable pitchers), live (linescore + outs), and final (game decisions) states
- Live polling when a game is in progress
- Season schedule filterable by remaining, completed, spring training, and postseason games
- Roster table with per-player biography and sortable statistic data
- Statistic leaders from the active roster
- American League standings

---

## How the API data is handled

The MLB Stats API provides deeply nested JSON data. Team responses, pitcher references, and game decisions all have inconsistent shapes depending on the game state. To organize the data, the raw responses are typed as DTOs in src/types/dto/mlb.dto.ts. These are then mapped by src/utils/dtoToModelMappers.ts, where the data is flattened, updated, and field-handled before being returned as clean domain models. These domain models leave me with much cleaner data to work with, which is also easily updatable if needed down the line.

---

## Local Setup

```bash
# 1. Clone and install
git clone https://github.com/kcgbarbosa/torontobluejays-dashboard.git
cd torontobluejays-dashboard
npm install

# 2. Create .env
VITE_MLB_BASE_URL=https://statsapi.mlb.com/api/v1
VITE_MLB_MEDIA_BASE_URL=https://www.mlbstatic.com/team-logos
VITE_BLUEJAYS_TEAMID=141

# 3. Run
npm run dev
```

---

## Connect

**Kevin-Christian Giraldo-Barbosa**
[LinkedIn](https://www.linkedin.com/in/kcgbarbosa/) · [Email](mailto:kcgbarbosa@gmail.com)
