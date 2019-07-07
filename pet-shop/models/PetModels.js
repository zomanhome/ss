class Pet {
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.quantity = item.quantity;
    this.age = item.age;
    this.type = item.type;
    this.gender = item.gender;
    this.weight = item.weight;
    this.color = item.color;
    this.lifespan = item.lifespan;
    this.predator = item.predator;
  }
}

export class Dog extends Pet {
  constructor(item) {
    super(item);
    this.pedigree = item.pedigree;
    this.group = item.group;
  }
}

export class Cat extends Pet {
  constructor(item) {
    super(item);
    this.fur = item.fur;
    this.docked = item.docked;
    this.munchkin = item.munchkin;
    this.lopiness = item.lopiness;
  }
}

export class Fish extends Pet {
  constructor(item) {
    super(item);
    this.freshwater = item.freshwater;
    this.level = item.level;
  }
}

export class Bird extends Pet {
  constructor(item) {
    super(item);
    this.fly = item.fly;
    this.talkativeness = item.talkativeness;
    this.melodiousness = item.melodiousness;
  }
}
