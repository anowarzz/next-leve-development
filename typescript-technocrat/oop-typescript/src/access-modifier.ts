{
  // access - modifier
  class BankAccount {
    public readonly id: number;
    public name: string;
    protected _balance: number;

    constructor(id: number, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
    }

    public addDeposit(amount: number): number {
      return (this._balance += amount);
    }

    public getBalance(): number {
      return this._balance;
    }
  }

  class StudentAccount extends BankAccount {
    testPrivate() {
      return this._balance;
    }
  }

  const poorUserAccount = new BankAccount(111, "Mr Poor Man", 33);

  poorUserAccount.addDeposit(222);
  const myBalance = poorUserAccount.getBalance();
  console.log(myBalance);

  //
}
