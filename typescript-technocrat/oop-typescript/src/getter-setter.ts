{
  // ---> Getter And Setter <---
  //   parent class
  class BankAccount {
    public readonly id: number;
    public name: string;
    protected _balance: number;

    constructor(id: number, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
    }

    // ==> using setter
    set deposit(amount: number) {
      this._balance += amount;
    }

    //  ==> using getter
    get balance(): number {
      return this._balance;
    }
  }

  // child class

  class StudentAccount extends BankAccount {
    testPrivate() {
      return this._balance;
    }
  }

  const poorUserAccount = new BankAccount(111, "Mr Poor Man", 33);
  poorUserAccount.deposit = 50; // setter
  console.log(poorUserAccount.balance); // getter

  //
}
