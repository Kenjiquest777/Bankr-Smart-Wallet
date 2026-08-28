// scripts/seedBasecatWallets.js
// Utility script to seed default tracked smart wallets

const defaultWallets = [
  {
    id: 'w_' + Date.now().toString(36) + '1',
    address: '0x2ca0ef05ec3383944f40c4ac2e9346c4fb441e31',
    label: 'Deployer / Alpha Core',
    chain: 'base',
    type: 'whale',
    twitter: 'Kenjiquest777',
    listId: '',
    addedAt: Date.now()
  }
];

let watch = (await appKV.get('watchlists')) || { wallets: [], lists: [], updatedAt: 0 };
if (!watch.wallets || !watch.wallets.length) {
  watch.wallets = defaultWallets;
  watch.updatedAt = Date.now();
  await appKV.set('watchlists', watch);
  return { ok: true, seeded: true, count: defaultWallets.length };
}

return { ok: true, seeded: false, count: watch.wallets.length, message: 'watchlists already populated' };
