// scripts/enrichPrices.js
// Enriches active signals with real-time price & liquidity data via DexScreener

const tokens = (args && args.tokens) || [];
if (!tokens.length) {
  return { ok: true, prices: {} };
}

const prices = {};
try {
  // Batch query DexScreener for tokens
  const tokenList = tokens.slice(0, 30).join(',');
  const data = await http.fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenList}`);
  
  if (data && Array.isArray(data.pairs)) {
    data.pairs.forEach(pair => {
      const baseAddr = (pair.baseToken && pair.baseToken.address || '').toLowerCase();
      if (baseAddr && !prices[baseAddr]) {
        prices[baseAddr] = {
          priceUsd: parseFloat(pair.priceUsd) || 0,
          mcap: pair.marketCap || pair.fdv || 0,
          ch1: pair.priceChange && typeof pair.priceChange.h1 === 'number' ? pair.priceChange.h1 : null,
          ch24: pair.priceChange && typeof pair.priceChange.h24 === 'number' ? pair.priceChange.h24 : null,
          url: pair.url || ''
        };
      }
    });
  }
  return { ok: true, prices };
} catch (e) {
  log('enrichPrices error', { error: String(e) });
  return { ok: false, error: String(e), prices: {} };
}
