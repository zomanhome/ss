// Decorator
function doSomething(name) {
  console.log('Hello, ' + name);
}
function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  };
}
const wrapped = loggingDecorator(doSomething);
wrapped('123');

/* class Coffee {
  cost() {
    return 5;
  }
}
const sugar = coffee => {
  const cost = coffee.cost();
  coffee.cost = () => cost + 1;
};
const coffee = new Coffee();

sugar(coffee);
console.log(coffee.cost()); */

/* (function() {
  function PetFactory() {}
  PetFactory.animals = [];
  getData('db.json', createAnimals);

  function createAnimals(data) {
    data.forEach(obj => {
      PetFactory.animals.push(PetFactory.create(obj));
    });
    createCards(PetFactory.animals);
  }

  function createCards(arr) {
    let cards = '';

    arr.forEach(obj => {
      cards += `<div class="card text-white bg-info mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${obj.name}</h5>
        <p class="card-text">${obj.type}</p>
      </div>
    </div>`;
    });
    document.querySelector('.cards').innerHTML = cards;
  }

  function getData(path, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', path, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        console.log(
          'ошибка: ' + (this.status ? this.statusText : 'запрос не удался')
        );
        return;
      }
      callback(JSON.parse(this.responseText));
    };
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
    var PetConstructor = this[obj.type];
    if (!(PetConstructor instanceof Function)) {
      throw {
        name: 'Error',
        message: 'constructor "' + obj.type + '" undefined'
      };
    }
    return new PetConstructor(obj);
  };

  PetFactory.register('dog', function(obj) {
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
    this.pedigree = obj.pedigree;
    this.group = obj.group;
  });
  PetFactory.register('cat', function(obj) {
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
    this.fur = obj.fur;
    this.docked = obj.docked;
    this.munchkin = obj.munchkin;
    this.lopiness = obj.lopiness;
  });
  PetFactory.register('fish', function(obj) {
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
    this.freshwater = obj.freshwater;
    this.level = obj.level;
  });
  PetFactory.register('bird', function(obj) {
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
    this.fly = obj.fly;
    this.talkativeness = obj.talkativeness;
    this.melodiousness = obj.melodiousness;
  });
})(); */
