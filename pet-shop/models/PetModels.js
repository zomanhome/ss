class Pet {
  constructor(
    id,
    name,
    price,
    quantity,
    age,
    type,
    gender,
    weight,
    color,
    lifespan,
    predator
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.age = age;
    this.type = type;
    this.gender = gender;
    this.weight = weight;
    this.color = color;
    this.lifespan = lifespan;
    this.predator = predator;
  }
}

export class Dog extends Pet {
  constructor(
    id,
    name,
    price,
    quantity,
    age,
    type,
    gender,
    weight,
    color,
    lifespan,
    predator,
    pedigree,
    group
  ) {
    super(
      id,
      name,
      price,
      quantity,
      age,
      type,
      gender,
      weight,
      color,
      lifespan,
      predator
    );
    this.pedigree = pedigree;
    this.group = group;
  }
}

export class Cat extends Pet {
  constructor(
    id,
    name,
    price,
    quantity,
    age,
    type,
    gender,
    weight,
    color,
    lifespan,
    predator,
    fur,
    docked,
    munchkin,
    lopiness
  ) {
    super(
      id,
      name,
      price,
      quantity,
      age,
      type,
      gender,
      weight,
      color,
      lifespan,
      predator
    );
    this.fur = fur;
    this.docked = docked;
    this.munchkin = munchkin;
    this.lopiness = lopiness;
  }
}

export class Fish extends Pet {
  constructor(
    id,
    name,
    price,
    quantity,
    age,
    type,
    gender,
    weight,
    color,
    lifespan,
    predator,
    freshwater,
    level
  ) {
    super(
      id,
      name,
      price,
      quantity,
      age,
      type,
      gender,
      weight,
      color,
      lifespan,
      predator
    );
    this.freshwater = freshwater;
    this.level = level;
  }
}

export class Bird extends Pet {
  constructor(
    id,
    name,
    price,
    quantity,
    age,
    type,
    gender,
    weight,
    color,
    lifespan,
    predator,
    fly,
    talkativeness,
    melodiousness
  ) {
    super(
      id,
      name,
      price,
      quantity,
      age,
      type,
      gender,
      weight,
      color,
      lifespan,
      predator
    );
    this.fly = fly;
    this.talkativeness = talkativeness;
    this.melodiousness = melodiousness;
  }
}
