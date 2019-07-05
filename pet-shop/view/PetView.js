import PetShop from '../controllers/PetShopController.js';

export default class PetShopView {
  renderCards(data) {
    let shop = PetShop.instance;
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
          <div class="d-flex justify-content-between text-center">
            <p class="card-text mb-1">Age: ${obj.age}</p>
            <p class="card-text mb-1">Lifespan: ${obj.lifespan}</p>
          </div>
          <div class="d-flex justify-content-between text-center">
            <p class="card-text mb-1">Gender: ${obj.gender}</p>
            <p class="card-text mb-1">Weight: ${obj.weight}</p>
          </div>
          <div class="d-flex justify-content-between text-center">
            <p class="card-text mb-1">Color: ${obj.color}</p>
            <p class="card-text mb-1">Predator: ${obj.predator}</p>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between text-center">
          <div>
          <button type="button" class="btn btn-outline-dark btn-sm btn__down">-</button>
          <span class="badge badge__quantity">1</span>
          <button type="button" class="btn btn-outline-dark btn-sm btn__up">+</button>
          </div>
          <div>
          <button type="button" class="btn btn-outline-primary font-weight-bold btn__buy">Buy me</button>
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
      parentDiv.querySelector('.btn__buy').addEventListener('click', () => {
        shop.addPetToCart(obj.id, +quantity.innerHTML);
      });
      cards.appendChild(parentDiv);
    });
  }

  renderCart(data) {
    // Get Controller Methods
    let shop = PetShop.instance;

    let cartIcon = document.querySelector('.cart-icon');
    let cartModal = document.querySelector('.cart-modal');
    let sums = [];

    // Header
    let list = `
      <li class="list-group-item">
        <div class="row">
          <div class="col-3">Name</div>
          <div class="col-2 text-center">Photo</div>
          <div class="col-3 text-center">Quantity</div>
          <div class="col-2 text-center">Price($)</div>
          <div class="col-2 text-center">Sum($)</div>
        </div>
      </li>
      `;

    // Pets
    data.forEach(obj => {
      let sum = +obj.quantity * +obj.price;
      sums.push(sum);
      list += `
        <li class="list-group-item">
          <div class="row">
          <div class="col-3">${obj.name}</div>
          <div class="col-2 text-center">
            <img src="./img/id${obj.id}.jpg" class="w-100 rounded-top" alt="" />
          </div>
          <div class="col-3 text-center">
            <button type="button" name="${
              obj.id
            }" class="btn btn-outline-dark btn-sm cart_btn__down">-</button>
              <span class="badge cart_badge__quantity">${obj.quantity}</span>
            <button type="button" name="${
              obj.id
            }" class="btn btn-outline-dark btn-sm cart_btn__up">+</button>
          </div>

          <div class="col-2 text-center">${obj.price}</div>
          <div class="col-2 text-center">${sum}</div>
          </div>
        </li>
      `;
    });

    let total = String(sums.reduce((sum, current) => sum + current, 0)).replace(
      /(\d)(?=(\d\d\d)+([^\d]|$))/g,
      '$1 '
    );

    // Cart Icon Animation
    cartIcon.innerHTML = `$ ${total}`;
    cartIcon.classList.add('cart-icon-animation');
    cartIcon.addEventListener('transitionend', () => {
      cartIcon.classList.remove('cart-icon-animation');
    });

    // Footer
    cartModal.innerHTML = `
      <ul class="list-group">
        ${list}
      </ul>
      <li class="list-group-item">
        <div class="row">
          <div class="col-8 d-flex justify-content-between">
            <button type="button" class="btn btn__make_order btn-outline-primary font-weight-bold" data-toggle="modal" data-target="#make-order">MAKE ORDER</button>
            <button type="button" class="btn btn-outline-primary btn__cart_order-history font-weight-bold" data-toggle="modal" data-target="#make-history">HISTORY</button>
            <button type="button" class="btn btn-outline-primary btn__cart_order-history_clear font-weight-bold">CLEAR HISTORY</button>
            <button type="button" class="btn btn-outline-dark font-weight-bold btn__cart_clear-all">CLEAR LIST</button>
          </div>
          <div class="col-2 text-right font-weight-bold">Total:</div>
          <div class="col-2 text-center font-weight-bold">${total}</div>
        </div>
      </li>
    `;

    // Disable Make Order Button
    let btn__make_order = document.querySelector('.btn__make_order');
    data.length === 0
      ? (btn__make_order.disabled = true)
      : (btn__make_order.disabled = false);

    // Listeners
    document.querySelectorAll('.cart_btn__down').forEach(down => {
      down.addEventListener('click', event => {
        shop.deletePetFromCart(+event.target.name);
      });
    });
    document.querySelectorAll('.cart_btn__up').forEach(up => {
      up.addEventListener('click', event => {
        shop.addPetToCart(+event.target.name, 1, false);
      });
    });
    document
      .querySelector('.btn__cart_clear-all')
      .addEventListener('click', () => {
        shop.deleteAllFromCart();
        document.querySelector('.navbar-toggler').click();
      });
    // Clear HISTORY
    document
      .querySelector('.btn__cart_order-history_clear')
      .addEventListener('click', () => {
        localStorage.clear('history');
        this.renderHistoryModal(data);
      });

    // Modal for Order Form
    let orderModal = document.createElement('div');
    orderModal.setAttribute('id', 'make-order');
    orderModal.id = 'make-order';
    orderModal.classList.add('modal');
    orderModal.tabIndex = -1;
    orderModal.setAttribute('role', 'dialog');
    orderModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    orderModal.setAttribute('aria-hidden', true);
    orderModal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Order</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="order-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="order-name">
              </div>
              <div class="form-group">
                <label for="order-email" class="col-form-label">E-mail:</label>
                <input type="text" class="form-control" id="order-email">
              </div>
              <div class="form-group">
                <label for="order-phone" class="col-form-label">Phone:</label>
                <input type="text" class="form-control" id="order-phone">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn__buy_order">Buy</button>
          </div>
        </div>
      </div>
    `;
    document.querySelector('.container').appendChild(orderModal);

    // Modal for History
    this.renderHistoryModal(data);

    // Order Buy Form
    orderModal
      .querySelector('.btn__buy_order')
      .addEventListener('click', () => {
        // Simple Validation
        let validate = true;
        let values = orderModal.querySelectorAll('.form-group > input');
        let person = { name: values[0].value, phone: values[2].value };

        values.forEach(input => {
          if (input.value === '') {
            input.placeholder = 'Type info';
            input.classList.add('form-error');
            validate = false;
          } else {
            input.classList.remove('form-error');
          }
        });
        if (validate) {
          $('#make-order').modal('hide');
          shop.buyFromOrder(person);
        }
      });
  }

  renderHistoryModal() {
    // Get Controller Methods
    let shop = PetShop.instance;

    let history = '';
    shop.PetShopModel.getHistory().forEach(line => {
      history += `
        <li class="list-group-item">
        <div class="row">
          <div class="col-5">${line.date}</div>
          <div class="col-3 text-center">${line.name}</div>
          <div class="col-2 text-center">${line.phone}</div>
          <div class="col-2 text-center">${line.pets}</div>
        </div>
        </li>
      `;
    });
    history = `
      <ul class="list-group">
        <li class="list-group-item">
          <div class="row">
            <div class="col-5">Date</div>
            <div class="col-3 text-center">Name</div>
            <div class="col-2 text-center">Phone</div>
            <div class="col-2 text-center">Rows</div>
          </div>
        </li>
        ${history}
      </ul>`;
    let historyModal = document.createElement('div');
    historyModal.setAttribute('id', 'make-history');
    historyModal.id = 'make-history';
    historyModal.classList.add('modal');
    historyModal.tabIndex = -1;
    historyModal.setAttribute('role', 'dialog');
    historyModal.setAttribute('aria-labelledby', 'exampleModalLabel');
    historyModal.setAttribute('aria-hidden', true);
    historyModal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">History</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${history}
          </div>
          <div class="modal-footer">
            Have a nice day!
          </div>
        </div>
      </div>
    `;
    if (document.querySelector('#make-history')) {
      document.querySelector('#make-history').innerHTML =
        historyModal.innerHTML;
    } else {
      document.querySelector('.container').appendChild(historyModal);
    }
  }

  renderFilters() {
    let shop = PetShop.instance;
    let filters = document.querySelector('.filters');

    filters.innerHTML = `
      <div class="form-group">
        <div class="form-check">
          <div>
            <input type="checkbox" name="dog" class="form-check-input ml-0" checked>
            <label class="form-check-label p-1">Dogs</label>
          </div>
          <div>
            <input type="checkbox" name="cat" class="form-check-input ml-0" checked>
            <label class="form-check-label p-1">Cats</label>
          </div>
          <div>
            <input type="checkbox" name="fish" class="form-check-input ml-0" checked>
            <label class="form-check-label p-1">Fishes</label>
          </div>
          <div>
            <input type="checkbox" name="bird" class="form-check-input ml-0" checked>
            <label class="form-check-label p-1">Birds</label>
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
        shop.addFilter(petsActive);
      });
    });
  }

  renderCarousel(data) {
    let shop = PetShop.instance;
    let carousel = document.querySelector('.carousel');
    let list = '';
    let reverseDara = data.map(el => el).reverse();

    reverseDara.forEach((obj, index) => {
      let active = '';
      if (index === 0) active = ' active';

      list += `
        <div class="carousel-item${active}" data-interval="2000">
          <img src="./img/id${
            obj.id
          }.jpg" class="d-block w-100 rounded-top" alt="${obj.name}">
          <div class="carousel-caption bg-dark d-none d-md-block p-0">${
            obj.name
          }: $&nbsp;${obj.price}</div>
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
          shop.addFilter(id);
        }
      });

    setTimeout(() => {
      document.querySelector('.carousel-control-next').click();
    }, 2000);
  }
}
