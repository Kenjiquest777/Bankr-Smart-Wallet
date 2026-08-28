// scripts/refreshSignals.js
// Background scanner for whale & KOL token accumulation across Base, Solana, and Robinhood Chain

const watchlists = (await appKV.get('watchlists')) || { wallets: [], lists: [] };
const trackedWallets = watchlists.wallets || [];
const targetChains = ['base', 'solana', 'robinhood'];

log('Starting refreshSignals scan', { trackedCount: trackedWallets.length, targetChains });

const prompt = `Perform a comprehensive multi-chain smart money scan across Base, Solana, and Robinhood Chain for recent whale buys and high-signal KOL wallets.
Tracked custom wallets: ${JSON.stringify(trackedWallets.map(w => ({ address: w.address, chain: w.chain, label: w.label })))}.
Prioritize scanning these tracked wallets first.
Evaluate buy size ($ USD), entry market cap, token CA, chain, time ago, bundled-buy flags, and dump risk percentage.
Return a structured JSON array of signals under the key "signals", matching the schema with fields:
walletAddress, walletName, twitter, walletType ('whale'|'kol'), tokenSymbol, tokenName, tokenCA, chain ('base'|'solana'|'robinhood'), boughtAt, buySizeUsd, mcapAtBuy, bundled, bundleNote, reaction, signalStrength ('very_strong'|'strong'|'moderate'|'weak'), action ('BUY'|'WATCH'|'AVOID'), dumpRiskPct, riskExplanation.
Save the complete payload to appKV key "signals_snapshot" via write_app_kv. Reply only "done".`;

try {
  await bankr.askAgent(prompt);
  return { ok: true, scannedAt: Date.now(), trackedCount: trackedWallets.length };
} catch (e) {
  log('askAgent scan error', { error: String(e) });
  return { ok: false, error: String(e) };
}
