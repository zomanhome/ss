// 1
let str = 'Hello';
let iterator = str[Symbol.iterator]();
while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // Все буквы по очереди
}

// Делает то же, что и
for (var letter of str) console.log(letter);

// 2
console.log(18 - 015); // 5

// 3
