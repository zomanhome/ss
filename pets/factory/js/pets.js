class PetShop {
  constructor() {
    this.pets = [];
    this.PetShopModel = new PetShopModel(this.pets);
    this.PetShopView = new PetShopView();
    this.init();
  }

  init() {
    fetch('pets.json')
      .then(response => response.json())
      .then(json => {
        this.pets = this.PetShopModel.createPets(json);
        this.PetShopView.renderCards(this.pets);
      })
      .catch(error => console.error(error));
  }
}

class PetShopModel {
  createPets(data) {
    let pets = [];

    data.map(item => {
      switch (item.type) {
        case 'dog':
          pets.push(
            new Dog(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.pedigree,
              item.group
            )
          );
          break;
        case 'cat':
          pets.push(
            new Cat(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.fur,
              item.docked,
              item.munchkin,
              item.lopiness
            )
          );
          break;
        case 'fish':
          pets.push(
            new Fish(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.freshwater,
              item.level
            )
          );
          break;
        case 'bird':
          pets.push(
            new Bird(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.fly,
              item.talkativeness,
              item.melodiousness
            )
          );
          break;
        default:
          console.log('class is not registered');
      }
    });

    return pets;
  }
}

class PetShopView {
  renderCards(data) {
    let cards = ``;

    data.forEach(obj => {
      cards += `
        <div class="card text-dark bg-light border-secondary">
          <div class="card-header">${obj.name}</div>
          <img src="img/id${obj.id}.jpg" class="card-img-top" alt="${
        obj.name
      }" />
          <div class="card-body">
            <h5 class="card-title text-right">$ ${obj.price}</h5>
            <p class="card-text mb-1">Quantity: ${obj.quantity}</p>
            <p class="card-text mb-1">Color: ${obj.color}</p>
            <p class="card-text mb-1">Group: ${obj.group}</p>
            <p class="card-text mb-1">Fur: ${obj.fur}</p>
            <p class="card-text mb-1">Level: ${obj.level}</p>
            <p class="card-text mb-1">Fly: ${obj.fly}</p>
            <p class="card-text mb-1">Predator: ${obj.predator}</p>
            <p class="card-text mb-1">Freshwater: ${obj.freshwater}</p>
            <p class="card-text mb-1">Talkativeness: ${obj.talkativeness}</p>
          </div>
          <div class="card-footer text-right">
            <button type="button" class="btn btn-outline-dark">Buy me</button>
          </div>
        </div>
      `;
    });
    cards = `<div class="cards">${cards}</div>`;
    document.querySelector('.container').innerHTML = cards;
    document.querySelectorAll('.card-text').forEach(p => {
      if (p.innerHTML.indexOf('undefined') !== -1) p.remove();
      if (p.innerHTML.indexOf('false') !== -1) p.remove();
      if (p.innerHTML.indexOf('true') !== -1)
        p.innerHTML = p.innerHTML.replace(/: true/, '');
    });
  }
}

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

class Dog extends Pet {
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

class Cat extends Pet {
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

class Fish extends Pet {
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

class Bird extends Pet {
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

let shop = new PetShop();
