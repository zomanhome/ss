// Observer

/* class EventObserver {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
  }
  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }
  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

const blogObserver = new EventObserver();
const textField = document.querySelector('.textField');
const countField = document.querySelector('.countField');
const getWordsCount = text => (text ? text.trim().split(/\s+/).length : 0);

textField.addEventListener('keyup', () => {
  blogObserver.broadcast(textField.value);
});
blogObserver.subscribe(text => {
  countField.innerHTML = getWordsCount(text);
}); */

/* Observable = function() {
  //без изменений
  this.observers = [];
};

Observable.prototype.deliver = function(data) {
  for (var i in this.observers) {
    this.observers[i].func.call(this.observers[i].context, data); //функция теперь вызывается в нужном контексте
  }
};

Function.prototype.subscribe = function(observable, context) {
  var ctx = context || this; //если контекст вызова не задан, то контекстом считается this «по-умолчанию», то есть текущая функция
  var observer = {
    //теперь наблюдатель будет сообщать, в каком контексте нужно вызвать функцию
    context: ctx,
    func: this
  };
  observable.observers.push(observer);
  return this;
};

myClass = function() {
  this.value = 0;
  this.onChange = new Observable();
};

myClass.prototype.change = function(new_value) {
  this.value = new_value;
  this.onChange.deliver(this.value);
};

Logger = function(logtype) {
  this.type = !!logtype ? logtype : 'alert';
};

Logger.prototype.write = function(value) {
  if (this.type == 'console') {
    console.log(value);
    return;
  }
  alert(value);
};

var c = new myClass();
var logger = new Logger('console');

logger.write.subscribe(c.onChange, logger);
c.change(10); */

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
