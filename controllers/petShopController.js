class PetShop {
  constructor() {
    this.cats = [];
    this.expensive = [];
    this.fluffyOrWhite = [];
    this.cart = [];
    this.animals = [];
    this.PetShopModel = new PetShopModel(this.animals);
    this.PetShopView = new PetShopView();
    this.init();
  }

  init() {
    fetch('https://api.jsonbin.io/b/5cdc0be80e7bd93ffabe80e3', {
      method: 'GET',
      headers: {
        'secret-key':
          '$2a$10$mlpQded4G2YkJLS9U5/m.eDAMES2pDQgtY79Btaq/6FwrTowAnkYW'
      }
    })
      .then(response => response.json())
      .then(json => {
        this.animals = this.PetShopModel.createAnimals(json);
        this.getListOfAnimals(this.animals);
        this.createListsOfAnimals();
        this.initClicks();
      })
      .catch(error => console.error(error));
  }

  getListOfAnimals(animals) {
    this.cats = this.getCats(animals);
    this.expensive = this.getExpensiveAnimals(animals);
    this.fluffyOrWhite = this.getfluffyOrWhiteAnimals(animals);
  }

  createListsOfAnimals() {
    this.PetShopView.createCatsList(this.cats);
    this.PetShopView.createExpensiveList(this.expensive);
    this.PetShopView.createfluffyOrWhiteList(this.fluffyOrWhite);
    this.PetShopView.createCartList(this.cart);
  }

  addAnimalToCart(id) {
    let removeIndex = this.animals.map(animal => animal.id).indexOf(id);
    let removedAnimal = this.animals.splice(removeIndex, 1);

    this.cart.push(removedAnimal[0]);
    this.caclQuantity(this.cart);
    this.calcSum(this.cart);
    this.getListOfAnimals(this.animals);

    this.createListsOfAnimals();
    this.PetShopView.showConfirm();
  }

  delAnimalFromCart(id) {
    let removeIndex = this.cart.map(animal => animal.id).indexOf(id);
    let removedAnimal = this.cart.splice(removeIndex, 1);
    this.animals.push(removedAnimal[0]);
    this.caclQuantity(this.cart);
    this.calcSum(this.cart);
    this.getListOfAnimals(this.animals);
    this.createListsOfAnimals();
  }

  getCats(animals) {
    return animals.filter(animal => animal instanceof Cat);
  }

  getExpensiveAnimals(animals) {
    let average = this.getAveragePrice(animals);
    if (animals.length === 1) return animals;
    return animals.filter(animal => parseInt(animal.price) > average);
  }

  getAveragePrice(animals) {
    let prices = animals.map(animal => animal.price);
    if (prices.length === 0) return;
    else {
      return (
        prices.reduce((sum, curr) => parseInt(sum) + parseInt(curr)) /
        prices.length
      );
    }
  }

  getfluffyOrWhiteAnimals(animals) {
    return animals.filter(animal => animal.color === 'white' || animal.fluffy);
  }

  caclQuantity(cart) {
    let div = document.querySelector('.badge');
    div.textContent = cart.length;
  }

  calcSum(animals) {
    let div = document.querySelector('.cart_total > span');
    let cost = animals.map(animal => animal.price);
    if (cost.length === 0) div.textContent = 0;
    else {
      div.textContent = cost.reduce(
        (sum, curr) => parseInt(sum) + parseInt(curr)
      );
    }
  }

  //hanging listeners on elements
  initClicks() {
    let cart = document.querySelector('.nav_cart');
    cart.addEventListener('click', this.PetShopView.openCart);
    let closeCart = document.querySelector('.cart_close');
    closeCart.addEventListener('click', this.PetShopView.closeCart);
    let addForm = document.querySelector('.add_animal');
    addForm.addEventListener('click', this.PetShopView.openForm);
    let closeForm = document.querySelector('.form-close');
    closeForm.addEventListener('click', this.PetShopView.closeForm);
  }

  //adding animal to shop
  addAnimal() {
    this.addAnimalToShop(this.animals);
  }

  addAnimalToShop(animals) {
    let input = document.querySelectorAll('input');
    let select = document.querySelector('select').value;
    let name = input[0].value.trim();
    let price = input[1].value.trim();
    let color = input[2].value;
    let fluffy = input[3].checked;

    if (!name) {
      input[0].classList.add('is-invalid');
    } else if (!price || price <= 0) {
      input[0].classList.remove('is-invalid');
      input[1].classList.add('is-invalid');
    } else {
      this.PetShopModel.createNewAnimal(
        animals,
        select,
        name,
        price,
        color,
        fluffy
      );
      this.PetShopView.closeForm();
      this.PetShopView.clearForm();
      this.getListOfAnimals(this.animals);
      this.createListsOfAnimals();
    }
  }
}
