// Factory Method
function PetFactory() {}

(function init() {
  PetFactory.animals = [];
  fetch('pets.json', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(json => {
      json.forEach(obj => {
        PetFactory.animals.push(PetFactory.create(obj));
      });
      renderCards(PetFactory.animals);
    })
    .catch(error => console.error(error));
})();

function renderCards(arr) {
  let cards = ``;

  arr.forEach(obj => {
    cards += `
      <div class="card text-dark bg-light border-secondary">
        <div class="card-header">${obj.name}</div>
        <img src="img/id${obj.id}.jpg" class="card-img-top" alt="${obj.name}" />
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
        <div class="card-footer">
          <small class="text-muted">${obj.type}</small>
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

function Animal(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.price = obj.price;
  this.quantity = obj.quantity;
  this.age = obj.age;
  this.type = obj.type;
  this.gender = obj.gender;
  this.weight = obj.weight;
  this.color = obj.color;
  this.lifespan = obj.lifespan;
  this.predator = obj.predator;
}

PetFactory.register = function(name, PetConstructor) {
  if (name instanceof Function) {
    PetConstructor = name;
    name = null;
  }
  if (!(PetConstructor instanceof Function)) {
    throw {
      name: 'Error',
      message: 'PetConstructor is not function'
    };
  }
  this[name || PetConstructor.name] = PetConstructor;
};
PetFactory.create = function(obj) {
  let PetConstructor = this[obj.type];

  if (!(PetConstructor instanceof Function)) {
    throw {
      name: `Error`,
      message: `constructor ${obj.type} undefined`
    };
  }

  return new PetConstructor(obj);
};
PetFactory.register('dog', function(obj) {
  Animal.apply(this, arguments);
  this.pedigree = obj.pedigree;
  this.group = obj.group;
});
PetFactory.register('cat', function(obj) {
  Animal.apply(this, arguments);
  this.fur = obj.fur;
  this.docked = obj.docked;
  this.munchkin = obj.munchkin;
  this.lopiness = obj.lopiness;
});
PetFactory.register('fish', function(obj) {
  Animal.apply(this, arguments);
  this.freshwater = obj.freshwater;
  this.level = obj.level;
});
PetFactory.register('bird', function(obj) {
  Animal.apply(this, arguments);
  this.fly = obj.fly;
  this.talkativeness = obj.talkativeness;
  this.melodiousness = obj.melodiousness;
});
