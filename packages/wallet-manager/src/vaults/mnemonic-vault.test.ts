import { Wallet } from '@fuel-ts/wallet';

import walletManagerSpec from '../wallet-manager-spec';

import { MnemonicVault } from './mnemonic-vault';

describe('MnemonicVault', () => {
  it('Get wallet instance', async () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
    });
    const wallet = new Wallet(walletManagerSpec.account_0.privateKey);

    vault.addAccount();

    expect(vault.getWallet(wallet.address).publicKey).toBe(walletManagerSpec.account_0.publicKey);
  });

  it('Check if accounts are been added correctly', async () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
    });

    await vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getAccounts()[0].publicKey).toBe(walletManagerSpec.account_0.publicKey);
    expect(vault.getAccounts()[1].publicKey).toBe(walletManagerSpec.account_1.publicKey);
  });

  it('Serialize and recreate vault state', async () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
    });
    // Add one account to check if it will reload correctly
    vault.addAccount();

    const state = vault.serialize();
    const vaultFromState = new MnemonicVault(state);

    expect(vaultFromState.getAccounts().length).toBe(2);
    expect(vaultFromState.getAccounts()[0].publicKey).toBe(walletManagerSpec.account_0.publicKey);
    expect(vaultFromState.getAccounts()[1].publicKey).toBe(walletManagerSpec.account_1.publicKey);
  });
});
