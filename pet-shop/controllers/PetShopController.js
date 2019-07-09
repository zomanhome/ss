import PetShopModel from '../models/PetShopModel.js';
import PetShopView from '../view/PetView.js';

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class PetShop {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer)
      throw 'Instantiation failed: use PetShop.instance instead of new.';

    this.pets = [];
    this.cart = [];
    this.PetShopModel = new PetShopModel();
    this.PetShopView = new PetShopView();
    this.PetShopModel.getData(this);
  }

  static get instance() {
    if (!this[singleton]) this[singleton] = new PetShop(singletonEnforcer);
    return this[singleton];
  }

  static set instance(v) {
    throw "Can't change constant property!";
  }

  login() {
    this.PetShopView.renderLogin();
  }

  init() {
    this.PetShopView.renderCards(this.pets);
    this.PetShopView.renderFilters();
    this.PetShopView.renderCarousel(this.pets);
    this.PetShopView.renderCart(this.cart);
  }

  addPetToCart(id, quantity) {
    let petIndex = this.pets.map(pet => pet.id).indexOf(id);
    let cartIndex = this.cart.map(pet => pet.id).indexOf(id);

    if (petIndex !== -1) {
      if (this.pets[petIndex].quantity === quantity) {
        if (cartIndex === -1) {
          this.cart.push(Object.assign({}, this.pets[petIndex]));
          this.pets.splice(petIndex, 1);
        } else {
          this.cart[cartIndex].quantity += +quantity;
          this.pets.splice(petIndex, 1);
        }
        this.PetShopView.renderCarousel(this.pets);
      } else {
        this.pets[petIndex].quantity -= quantity;
        if (cartIndex === -1) {
          this.cart.push(Object.assign({}, this.pets[petIndex]));
          this.cart[this.cart.length - 1].quantity = quantity;
        } else {
          this.cart[cartIndex].quantity += +quantity;
        }
      }

      let searchPets = document.querySelector('.navbar input');
      if (searchPets.value !== '') {
        this.addSearch(searchPets.value);
      } else {
        let filterPets = document
          .querySelector('.filters')
          .querySelectorAll('input[type=checkbox]');
        let petsActive = [];
        filterPets.forEach(pet => {
          if (pet.checked) petsActive.push(pet.name);
        });
        this.addFilter(petsActive);
      }

      this.PetShopView.renderCart(this.cart);
      this.PetShopModel.createData(this.pets, this.cart);
    }
  }

  deletePetFromCart(id) {
    let petIndex = this.pets.map(pet => pet.id).indexOf(id);
    let cartIndex = this.cart.map(pet => pet.id).indexOf(id);

    if (this.cart[cartIndex].quantity === 1) {
      if (petIndex === -1) {
        this.pets.push(Object.assign({}, this.cart[cartIndex]));
        this.PetShopView.renderCarousel(this.pets);
        this.cart.splice(cartIndex, 1);
      } else {
        this.pets[petIndex].quantity += 1;
        this.cart.splice(cartIndex, 1);
      }
    } else {
      if (petIndex === -1) {
        this.pets.push(Object.assign({}, this.cart[cartIndex]));
        this.pets[this.pets.length - 1].quantity = 1;
        this.cart[cartIndex].quantity -= 1;
        this.PetShopView.renderCarousel(this.pets);
      } else {
        this.cart[cartIndex].quantity -= 1;
        this.pets[petIndex].quantity += 1;
      }
    }

    let filterPets = document
      .querySelector('.filters')
      .querySelectorAll('input[type=checkbox]');
    let petsActive = [];
    filterPets.forEach(pet => {
      if (pet.checked) petsActive.push(pet.name);
    });
    this.addFilter(petsActive);
    this.PetShopView.renderCart(this.cart, false);
    this.PetShopModel.createData(this.pets, this.cart);
  }

  deleteAllFromCart() {
    this.cart.forEach(pet => {
      let petIndex = this.pets.map(pet => pet.id).indexOf(pet.id);
      let cartIndex = this.cart.map(pet => pet.id).indexOf(pet.id);
      if (petIndex === -1) {
        this.pets.push(Object.assign({}, this.cart[cartIndex]));
      } else {
        this.pets[petIndex].quantity += this.cart[cartIndex].quantity;
      }
    });

    this.cart = [];
    this.PetShopView.renderCart(this.cart);
    this.PetShopView.renderCards(this.pets);
    this.PetShopView.renderCarousel(this.pets);
    this.PetShopView.renderCheckbox(['cat', 'dog', 'fish', 'bird']);
    this.PetShopModel.createData(this.pets, this.cart);
  }

  buyFromOrder(person, total) {
    this.PetShopModel.createHistory(person, this.cart, total);
    this.PetShopModel.sendTelegramMessage(this.PetShopModel.getHistory('last'));
    this.cart = [];
    this.PetShopView.renderCart(this.cart);
    this.PetShopView.renderHistoryModal();
    this.PetShopModel.createData(this.pets, this.cart);
    document.querySelector('.navbar-toggler').click();
  }

  addFilter(petsActive) {
    let filtered = this.pets,
      id;

    if (typeof petsActive === 'string') {
      if (petsActive === '') petsActive = ['cat', 'dog', 'fish', 'bird'];
    }
    if (typeof petsActive === 'number') {
      let petIndex = this.pets.map(pet => pet.id).indexOf(petsActive);
      id = petsActive;
      petsActive = [this.pets[petIndex].type];
    }
    filtered = this.pets.filter(pet => {
      if (petsActive.join(',').indexOf(pet.type) !== -1) {
        return pet;
      }
    });
    if (id !== undefined) {
      let petIndex = filtered.map(pet => pet.id).indexOf(id);
      let removed = filtered.splice(petIndex, 1);
      filtered.unshift(removed[0]);
    }
    this.PetShopView.renderCards(filtered);
    this.PetShopView.renderCheckbox(petsActive);
  }

  addSearch(str) {
    str = str.toLowerCase();
    let filtered = this.pets.filter(pet => {
      if (
        pet.name.toLowerCase().indexOf(str) !== -1 ||
        pet.type.toLowerCase().indexOf(str) !== -1
      ) {
        return pet;
      }
    });
    this.PetShopView.renderCheckbox([]);
    this.PetShopView.renderCards(filtered);
  }
}
