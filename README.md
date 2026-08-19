# Bankr Smart Wallet Tracker

Smart wallet tracking and alpha intelligence system for Base Chain, Solana, and Robinhood Chain with automated scans, manual watchlist management, and Telegram DM alert routing.

## Target Chains
- **Base Chain** (e.g. sample token `$BASECAT`: `0xb2000000000000000000004c27f6523082f41d01`)
- **Robinhood Chain**
- **Solana**

## Core Features

### 1. Smart Money & KOL Discovery
- Automated multi-chain signal detection for early smart-money buyers, high-win-rate DEX traders, and KOL wallets.
- Identifies buy size ($ USD), entry market cap, token contract address, time elapsed, bundled-buy flags, and CT community reaction.
- Comprehensive risk assessment with a dump-risk % score and actionable recommendations (`BUY`, `WATCH`, `AVOID`).
- High-conviction signals surfaced in a dedicated priority strip.

### 2. Manual Wallet Tracking & Custom Lists
- **Manual Wallet Addition**: Add any EVM, Solana, or Robinhood wallet address directly to your tracker.
- **Metadata Tagging**: Assign custom labels, categorize by wallet type (`whale`, `kol`), link Twitter/@X handles, and assign to specific lists.
- **Custom List Management**: Create, view, and delete custom lists to segment wallets by strategy, alpha caller, or portfolio theme.
- **Feed Filtering**: Instantly toggle feed views between `All Wallets`, `Tracked Only`, or filter by individual custom lists.
- **Priority Background Scans**: Tracked wallets are placed at the top of the queue and scanned first on every automated refresh cycle.

### 3. Real-Time Alerts & Automation
- Scheduled background scanning script (`refreshSignals`) running periodically to capture on-chain transactions.
- Live price enrichment via DexScreener API (`enrichPrices`).
- Real-time notification routing directly to Telegram DM.

## Data Schemas & AppKV Keys

### `watchlists`
```json
{
  "wallets": [
    {
      "id": "w_1234567890",
      "address": "0x...",
      "label": "Alpha Whale 1",
      "chain": "base",
      "type": "whale",
      "twitter": "alphatrader",
      "listId": "l_1234567890",
      "addedAt": 1723875600000
    }
  ],
  "lists": [
    {
      "id": "l_1234567890",
      "name": "Base High-Winrate",
      "createdAt": 1723875600000
    }
  ],
  "updatedAt": 1723875600000
}
```

### `signals_snapshot`
Stores the latest scan results, signal strength ratings (`very_strong`, `strong`, `moderate`, `weak`), buy sizes, and dump risk evaluations.
