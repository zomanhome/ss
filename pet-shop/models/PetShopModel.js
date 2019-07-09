import { Dog, Cat, Fish, Bird } from './PetModels.js';

export default class PetShopModel {
  getData(controller) {
    if (localStorage.hasOwnProperty('cart')) {
      controller.cart = JSON.parse(localStorage.getItem('cart'));
    }
    if (localStorage.hasOwnProperty('pets')) {
      setTimeout(() => {
        controller.pets = JSON.parse(localStorage.getItem('pets'));
        controller.login();
      }, 0);
    } else {
      fetch('./models/pets.json')
        .then(response => response.json())
        .then(json => {
          controller.pets = this.createPets(json);
          controller.login();
        });
    }
  }

  createPets(data) {
    let pets = [];

    data.map(item => {
      switch (item.type) {
        case 'dog':
          pets.push(new Dog(item));
          break;
        case 'cat':
          pets.push(new Cat(item));
          break;
        case 'fish':
          pets.push(new Fish(item));
          break;
        case 'bird':
          pets.push(new Bird(item));
          break;
        default:
          console.log('class is not registered');
      }
    });

    return pets;
  }

  createData(pets, cart) {
    localStorage.setItem('pets', JSON.stringify(pets));
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  createHistory(person, pets, total) {
    person.total = total;
    person.pets = pets; // not used yet
    person.date = new Date().toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (localStorage.hasOwnProperty('history')) {
      let arr = JSON.parse(localStorage.getItem('history'));
      arr.unshift(person);
      localStorage.setItem('history', JSON.stringify(arr));
    } else {
      localStorage.setItem('history', JSON.stringify([person]));
    }
  }

  getHistory(last) {
    let history = JSON.parse(localStorage.getItem('history'));

    if (history === null) return [];
    if (last) return history[0];

    return history;
  }

  sendTelegramMessage(order) {
    const api = 'https://api.telegram.org/bot';
    const token = '829245155:AAEDPNIY03I5gr--J-x6DOcytSC32LI1gO4';
    const chatId = '462696304';
    let text = `${order.name} want to buy pets on ${order.total}. Contact: ${
      order.phone
    }, ${order.email}. Time: ${order.date} Message: ${order.msg}`;

    fetch(`${api}${token}/sendMessage?chat_id=${chatId}&text=${text}`);
  }
}
