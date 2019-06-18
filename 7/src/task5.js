jsElementaryTasks.task5 = function(obj) {
  function checkArgsOfGetLuckyTickets(obj) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    let { min, max } = obj;

    if (min.length !== 6 || max.length !== 6)
      return (obj1 = { status: 'error', reason: 'incorrect length' });
    if (!isNumeric(+min) || !isNumeric(+max))
      return (obj1 = { status: 'error', reason: 'not a number' });
    if (+min > +max) return (obj1 = { status: 'error', reason: 'min > max' });

    return true;
  }

  function getLuckyTickets(obj) {
    let valid = checkArgsOfGetLuckyTickets(obj);

    if (valid) {
      if (typeof valid !== 'object') {
        let result = { winner: 'draw', simple: 0, complex: 0 };
        let { min, max } = obj;

        min = +min;
        max = +max;
        while (min <= max) {
          let leftSum = [...String(Math.floor(min / 1000))].reduce(
            (acc, n) => acc + +n,
            0
          );
          let rightSum = [...String(min % 1000)].reduce(
            (acc, n) => acc + +n,
            0
          );

          if (leftSum === rightSum) result.simple++;

          let left = [];
          let right = [];
          for (let num of String(min)) {
            num = +num;
            if (num % 2 === 0) left.push(num);
            else right.push(num);
          }
          leftSum = left.reduce((acc, n) => acc + +n, 0);
          rightSum = right.reduce((acc, n) => acc + +n, 0);

          if (leftSum === rightSum) result.complex++;

          min++;
        }

        if (result.simple > result.complex) result.winner = 'simple';
        if (result.simple < result.complex) result.winner = 'complex';

        return `winner: ${result.winner}, simple: ${result.simple}, complex: ${
          result.complex
        }`;
      } else return `status: ${obj1.status}, reason: ${obj1.reason}`;
    }
  }
  return getLuckyTickets(obj);
};
