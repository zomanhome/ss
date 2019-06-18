// Solution 1
function smoothie1(...ingredients) {
  let for_5 = ["Banana", "Orange", "Apple", "Lemon", "Grapes"];
  let for_7 = ["Avokado", "Strawberry", "Mango"];
  let sum = 0;
  const store = {};

  for_5.forEach(ingredient => {
    store[ingredient] = 5;
  });

  for_7.forEach(ingredient => {
    store[ingredient] = 7;
  });

  ingredients.forEach(ingredient => {
    if (store[ingredient]) {
      sum += store[ingredient];
    } else {
      sum += 9;
    }
  });

  return sum / ingredients.length;
}
console.log(smoothie1("No", "Avokado", "Apple"));

// Solution 2
function smoothie2(...ingredients) {
  let for_5 = ["Banana", "Orange", "Apple", "Lemon", "Grapes"];
  let for_7 = ["Avokado", "Strawberry", "Mango"];
  let sum = ingredients.reduce((acc, ingredient) => {
    if (for_5.includes(ingredient)) {
      return acc + 5;
    }
    if (for_7.includes(ingredient)) {
      return acc + 7;
    }
    return acc + 9;
  }, 0);

  return sum / ingredients.length;
}
console.log(smoothie2("No", "No", "Avokado", "Banana", "Apple", "Mango"));
