// Solution 1
function arrange1(str) {
  let result = [];

  str.split(" ").forEach(el => {
    result[+el.match(/\d/) - 1] = el;
  });

  return result.join(" ");
}
console.log(arrange1("5javascript 1I to3 l2ike l4earn"));

// Solution 2
function arrange2(str) {
  let result = str.split(" ").sort((a, b) => {
    +a.match(/\d/) - +b.match(/\d/);
  });

  return result.join(" ");
}
console.log(arrange1("5javascript 1I to3 l2ike l4earn"));
