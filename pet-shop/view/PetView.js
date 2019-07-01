import PetShop from '../controllers/PetShopController.js';

export default class PetShopView {
  renderCards(data) {
    let cards = document.querySelector('.cards');
    cards.innerHTML = '';

    data.forEach(obj => {
      let card = '';
      let parentDiv = document.createElement('div');
      parentDiv.classList.add(
        'card',
        'text-dark',
        'bg-light',
        'border-secondary'
      );
      let typeInfo = ``;

      switch (obj.type) {
        case 'dog':
          typeInfo = `
            <p class="card-text mb-1">Pedigree: ${obj.pedigree}</p>
            <p class="card-text mb-1">Group: ${obj.group}</p>
            `;
          break;
        case 'cat':
          typeInfo = `
            <p class="card-text mb-1">Fur: ${obj.fur}</p>
            <p class="card-text mb-1">Docked: ${obj.docked}</p>
            <p class="card-text mb-1">Munchkin: ${obj.munchkin}</p>
            <p class="card-text mb-1">Lopiness: ${obj.lopiness}</p>
          `;
          break;
        case 'fish':
          typeInfo = `
            <p class="card-text mb-1">Freshwater: ${obj.freshwater}</p>
            <p class="card-text mb-1">Level: ${obj.level}</p>
          `;
          break;
        case 'bird':
          typeInfo = `
            <p class="card-text mb-1">Fly: ${obj.fly}</p>
            <p class="card-text mb-1">Talkativeness: ${obj.talkativeness}</p>
            <p class="card-text mb-1">Melodiousness: ${obj.melodiousness}</p>
          `;
          break;
        default:
          console.log('wrong type');
          break;
      }
      card = `
        <div class="card-header">${obj.name} [<span class="badge">${
        obj.quantity
      }</span>]</div>
        <div class="type-info">
          <img src="./img/id${obj.id}.jpg" class="card-img-top" alt="" />
          <div>${typeInfo}</div>
        </div>
        <div class="card-body">
          <h5 class="card-title text-right">$ ${obj.price}</h5>
          <div class="card-text__2col">
            <p class="card-text mb-1">Age: ${obj.age}</p>
            <p class="card-text mb-1">Lifespan: ${obj.lifespan}</p>
          </div>
          <div class="card-text__2col">
            <p class="card-text mb-1">Gender: ${obj.gender}</p>
            <p class="card-text mb-1">Weight: ${obj.weight}</p>
          </div>
          <p class="card-text mb-1">Color: ${obj.color}</p>
          <p class="card-text mb-1">Predator: ${obj.predator}</p>
        </div>
        <div class="card-footer">
          <div>
          <button type="button" class="btn btn-outline-dark btn-sm btn__down">-</button>
          <span class="badge badge__quantity">1</span>
          <button type="button" class="btn btn-outline-dark btn-sm btn__up">+</button>
          </div>
          <div>
          <button type="button" class="btn btn-outline-dark btn__buy">Buy me</button>
          </div>
        </div>
        `;
      card = card.replace(/: true/g, ': yes').replace(/: false/g, ': no');
      parentDiv.innerHTML = card;
      let quantity = parentDiv.querySelector('.badge__quantity');
      parentDiv.querySelector('.btn__down').addEventListener('click', () => {
        if (+quantity.innerHTML !== 1)
          quantity.innerHTML = +quantity.innerHTML - 1;
      });
      parentDiv.querySelector('.btn__up').addEventListener('click', () => {
        if (+quantity.innerHTML < +obj.quantity)
          quantity.innerHTML = +quantity.innerHTML + 1;
      });
      let shop = PetShop.instance;
      parentDiv.querySelector('.btn__buy').addEventListener('click', () => {
        shop.addPetToCart(obj.id, +quantity.innerHTML);
      });
      cards.appendChild(parentDiv);
    });
  }

  renderCart(data) {
    let cart = document.querySelector('.cart');
    let list = '';
    cart.innerHTML = '';

    data.forEach(obj => {
      list += `
        <div>${obj.name}: ${obj.quantity}</div>
      `;
    });
    cart.innerHTML = `<div>Cart:</div>${list}`;
  }

  renderFilters() {
    let filters = document.querySelector('.filters');

    filters.innerHTML = `
    <div class="form-group">Filters:
      <div class="form-check">
        <div>
          <input type="checkbox" name="dog" class="form-check-input" checked>
          <label class="form-check-label">Dogs</label>
        </div>
        <div>
          <input type="checkbox" name="cat" class="form-check-input" checked>
          <label class="form-check-label">Cats</label>
        </div>
        <div>
          <input type="checkbox" name="fish" class="form-check-input" checked>
          <label class="form-check-label">Fishes</label>
        </div>
        <div>
          <input type="checkbox" name="bird" class="form-check-input" checked>
          <label class="form-check-label">Birds</label>
        </div>
      </div>
    </div>
    
    
    `;
    let filterPets = filters.querySelectorAll('input[type=checkbox]');

    filterPets.forEach(pet => {
      pet.addEventListener('click', () => {
        let petsActive = [];
        filterPets.forEach(pet => {
          if (pet.checked) petsActive.push(pet.name);
        });
        let shop = PetShop.instance;
        shop.addFilter(petsActive);
      });
    });
  }

  renderCarousel(data) {
    let carousel = document.querySelector('.carousel');
    let list = '';
    let reverseDara = data.map(el => el).reverse();

    reverseDara.forEach((obj, index) => {
      let active = '';
      if (index === 0) active = 'active';

      list += `
        <div class="carousel-item ${active}" data-interval="2000">
          <img src="./img/id${obj.id}.jpg" class="d-block w-100" alt="${
        obj.name
      }">
      </div>
      `;
    });

    carousel.innerHTML = `
      <div class="bd-example">
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            ${list}
          <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    `;
    document
      .querySelector('.carousel-inner')
      .addEventListener('click', event => {
        if (event.target.src) {
          let id = +event.target.src.match(/\d+(?=\.jpg)/g);
          let shop = PetShop.instance;
          shop.addFilter(id);
        }
      });
  }
}
/* 
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

// Dog
this.pedigree = pedigree;
this.group = group;

// Cat
this.fur = fur;
this.docked = docked;
this.munchkin = munchkin;
this.lopiness = lopiness;

// Fish
this.freshwater = freshwater;
this.level = level;

// Bird
this.fly = fly;
this.talkativeness = talkativeness;
this.melodiousness = melodiousness;
 */