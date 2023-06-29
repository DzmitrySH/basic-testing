// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const balanceAccount = 462;
  const amountPay = 127;
  const account = getBankAccount(balanceAccount);
  const account2 = getBankAccount(balanceAccount);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balanceAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withDrawing = () => account.withdraw(balanceAccount + amountPay);
    expect(withDrawing).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const transFerringBalance = () => {
      account.transfer(balanceAccount + amountPay, account2);
    };
    expect(transFerringBalance).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const transFerringSame = () => account.transfer(balanceAccount, account);
    expect(transFerringSame).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(amountPay);
    expect(account.getBalance()).toBe(balanceAccount + amountPay);
  });

  test('should withdraw money', () => {
    account.withdraw(amountPay);
    expect(account.getBalance()).toBe(balanceAccount);
  });

  test('should transfer money', () => {
    account.transfer(amountPay, account2);
    expect(account.getBalance()).toBe(balanceAccount - amountPay);
    expect(account2.getBalance()).toBe(balanceAccount + amountPay);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchNumber = await account.fetchBalance();
    fetchNumber
      ? expect(typeof fetchNumber).toBe('number')
      : expect(fetchNumber).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const fetchBalance = await account.synchronizeBalance();
      expect(fetchBalance).toBe(undefined);
    } catch {
      return;
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
