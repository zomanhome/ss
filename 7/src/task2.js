jsElementaryTasks.task2 = function(envelope1, envelope2) {
  function checkArgsOfCanInsert(envelope1, envelope2) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (typeof envelope1 !== 'object' || typeof envelope2 !== 'object')
      return (obj = { status: 'error', reason: 'not an object' });

    let { a, b } = envelope1;
    let { c, d } = envelope2;
    if (!isNumeric(a) || !isNumeric(b) || !isNumeric(c) || !isNumeric(d))
      return (obj = {
        status: 'error',
        reason: 'not a positive number or absent'
      });

    return true;
  }

  function canInsert(envelope1, envelope2) {
    let valid = checkArgsOfCanInsert(envelope1, envelope2);

    if (valid) {
      if (typeof valid !== 'object') {
        let result = 0;
        let { a, b } = envelope1;
        let { c, d } = envelope2;

        if (a < b) a += b - (b = a);
        if (c < d) [c, d] = [d, c];
        if (a < c && b < d) {
          result = 2;
        } else if (a < c && b >= d) {
          if (getWidth(c, d, b) < a) result = 1;
        }
        if (a > c && b > d) {
          result = 1;
        } else if (a > c && b <= d) {
          if (getWidth(a, b, d) < c) result = 2;
        }

        function getWidth(a, b, c) {
          let h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
          let alfa = Math.sin(c / h);
          let x1 = h * Math.cos(alfa);
          let gamma = Math.sin(b / h);
          let betta = alfa - gamma;
          let x2 = b * Math.tan(betta);
          return x1 + 2 * x2;
        }

        return result;
      } else return `status: ${obj.status}, reason: ${obj.reason}`;
    }
  }
  return canInsert(envelope1, envelope2);
};
