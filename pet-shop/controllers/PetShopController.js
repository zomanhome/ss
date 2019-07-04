import PetShopModel from '../models/PetShopModel.js';
import PetShopView from '../view/PetView.js';

let singleton = Symbol();
let singletonEnforcer = Symbol();

export default class PetShop {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer)
      throw 'Instantiation failed: use Singleton.getInstance() instead of new.';
    this.pets = [];
    this.cart = [];
    this.PetShopModel = new PetShopModel(this.pets);
    this.PetShopView = new PetShopView();
    this.init();
  }

  static get instance() {
    if (!this[singleton]) this[singleton] = new PetShop(singletonEnforcer);
    return this[singleton];
  }

  static set instance(v) {
    throw "Can't change constant property!";
  }

  init() {
    fetch('./models/pets.json')
      .then(response => response.json())
      .then(json => {
        this.pets = this.PetShopModel.createPets(json);
        this.PetShopView.renderCards(this.pets);
        this.PetShopView.renderFilters();
        this.PetShopView.renderCarousel(this.pets);
      })
      .catch(error => console.error(error));
  }

  addPetToCart(id, quantity, from) {
    if (from === undefined) from = true;
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
      } else {
        this.pets[petIndex].quantity -= quantity;
        if (cartIndex === -1) {
          this.cart.push(Object.assign({}, this.pets[petIndex]));
          this.cart[this.cart.length - 1].quantity = quantity;
        } else {
          this.cart[cartIndex].quantity += +quantity;
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
      this.PetShopView.renderCart(this.cart, from);
      this.PetShopView.renderCarousel(this.pets);
    }
  }

  deletePetFromCart(id) {
    let petIndex = this.pets.map(pet => pet.id).indexOf(id);
    let cartIndex = this.cart.map(pet => pet.id).indexOf(id);

    if (this.cart[cartIndex].quantity === 1) {
      if (petIndex === -1) {
        this.pets.push(Object.assign({}, this.cart[cartIndex]));
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
    this.PetShopView.renderCarousel(this.pets);
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
    this.PetShopView.renderCart(this.cart, false);
    this.PetShopView.renderCards(this.pets);
    this.PetShopView.renderCarousel(this.pets);
    document
      .querySelector('.filters')
      .querySelectorAll('input[type=checkbox]')
      .forEach(el => (el.checked = true));
  }

  addFilter(petsActive) {
    let filtered = this.pets;
    if (typeof petsActive === 'number') {
      filtered = filtered.filter(pet => pet.id === petsActive);
    }
    if (typeof petsActive !== 'number') {
      filtered = this.pets.filter(pet => {
        if (petsActive.join(',').indexOf(pet.type) !== -1) {
          return pet;
        }
      });
    }
    this.PetShopView.renderCards(filtered);
  }
}
