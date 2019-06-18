function mixNacci(arr) {
  let result = [];
  let pattern = arr[0];
  let repeat = arr[1];

  let order = [];
  for (let i = 0; i < repeat; i++) {
    order = [...order, ...pattern];
    if (order.length > repeat) {
      order.length = repeat;
      break;
    }
  }

  let pel = n => {
    let result = [0, 1];
    for (let i = 2; i < n; i++) {
      result.push(2 * result[i - 1] + result[i - 2]);
    }
    return result;
  };
  let pels = pel(order.filter(el => el === 'pel').length);

  let fib = n => {
    let result = [0, 1];
    for (let i = 2; i < n; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
    return result;
  };
  let fibs = fib(order.filter(el => el === 'fib').length);

  for (nacci of order) {
    if (nacci === 'fib') {
      result.push(fibs[0]);
      fibs.shift();
    }
    if (nacci === 'pel') {
      result.push(pels[0]);
      pels.shift();
    }
  }
  return result;
}
console.log(mixNacci([['fib', 'pel', 'pel'], 10]));
