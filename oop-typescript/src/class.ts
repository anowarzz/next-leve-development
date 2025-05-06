{
  // oop -- class

  class Animal {
    // constructor using parameter properties
    constructor(
      public name: string,
      public species: string,
      public sound: string
    ) {}

    makeSound() {
      console.log(`${this.name} says ${this.sound}`);
    }
  }

  const dog = new Animal("German Shepherd", "Dog", "Barking high");
  const cat = new Animal("Persian Cat", "Cat", "Meowing softly");

  cat.makeSound();
  //
}
