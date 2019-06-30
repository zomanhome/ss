import { Dog, Cat, Fish, Bird } from './PetModels.js';

export default class PetShopModel {
  createPets(data) {
    let pets = [];

    data.map(item => {
      switch (item.type) {
        case 'dog':
          pets.push(
            new Dog(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.pedigree,
              item.group
            )
          );
          break;
        case 'cat':
          pets.push(
            new Cat(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.fur,
              item.docked,
              item.munchkin,
              item.lopiness
            )
          );
          break;
        case 'fish':
          pets.push(
            new Fish(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.freshwater,
              item.level
            )
          );
          break;
        case 'bird':
          pets.push(
            new Bird(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.age,
              item.type,
              item.gender,
              item.weight,
              item.color,
              item.lifespan,
              item.predator,
              item.fly,
              item.talkativeness,
              item.melodiousness
            )
          );
          break;
        default:
          console.log('class is not registered');
      }
    });

    return pets;
  }
}
