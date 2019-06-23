// Factory Method
(function() {
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
        <h5 class="card-title">${obj.name} [${obj.type}]</h5>
        <p class="card-text">Quantity: ${obj.quantity}</p>
        <p class="card-text">Color: ${obj.color}</p>
        <p class="card-text">Group: ${obj.group}</p>
        <p class="card-text">Fur: ${obj.fur}</p>
        <p class="card-text">Level: ${obj.level}</p>
        <p class="card-text">Fly: ${obj.fly}</p>
        <p class="card-text">Predator: ${obj.predator}</p>
        <p class="card-text">Freshwater: ${obj.freshwater}</p>
        <p class="card-text">Talkativeness: ${obj.talkativeness}</p>
        <p class="card-text font-weight-bold">Price: ${obj.price}</p>
      </div>
    </div>`;
    });
    document.querySelector('.cards').innerHTML = cards;
    document.querySelectorAll('.card-text').forEach(p => {
      if (p.innerHTML.indexOf('undefined') !== -1) p.remove();
      if (p.innerHTML.indexOf('false') !== -1) p.remove();
      if (p.innerHTML.indexOf('true') !== -1)
        p.innerHTML = p.innerHTML.replace(/: true/, '');
    });
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
})();
