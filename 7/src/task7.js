jsElementaryTasks.task7 = function(event, obj) {
  function checkArgsOfGetFiboByLength(obj) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    let { length } = obj;

    if (length && !isNumeric(length))
      return (obj1 = { status: 'error', reason: 'not a number' });
    if (length <= 0)
      return (obj1 = { status: 'error', reason: 'negative length or zero' });

    return true;
  }

  function checkArgsOfGetFiboByRange(obj) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    let { min, max } = obj;

    if (!isNumeric(min) || !isNumeric(max))
      return (obj1 = { status: 'error', reason: 'not a number' });
    min = +min;
    max = +max;
    if (min > max) return (obj1 = { status: 'error', reason: 'min > max' });

    return true;
  }

  function getFiboByLength(obj) {
    let valid = checkArgsOfGetFiboByLength(obj);

    if (valid) {
      if (typeof valid !== 'object') {
        let result = [];
        let row = [0, 1];

        let { length } = obj;
        length = +length;

        if (length === 1) result = [0, 1];
        for (let i = 2; ; i++) {
          let next = row[i - 2] + row[i - 1];
          row.push(next);
          if (String(next).length === length) result.push(next);
          if (String(next).length > length) break;
        }

        return result;
      } else return `status: ${obj1.status}, reason: ${obj1.reason}`;
    }
  }
  function getFiboByRange(obj) {
    let valid = checkArgsOfGetFiboByRange(obj);

    if (valid) {
      if (typeof valid !== 'object') {
        let result = [];
        let row = [0, 1];

        let { min, max } = obj;
        min = +min;
        max = +max;
        if (min || min === 0) {
          let rowMax = Math.max(...[Math.abs(min), Math.abs(max)]);
          for (let i = 2; ; i++) {
            let next = row[i - 2] + row[i - 1];
            if (next > rowMax) break;
            row.push(next);
          }
          if (min >= 0 && max >= 0)
            result = row.filter(el => el >= min && el <= max);
          if (min < 0 && max >= 0)
            result = row
              .filter(el => el <= Math.abs(min))
              .reverse()
              .map(el => (el *= -1))
              .concat(row.filter(el => el <= max && el !== 0));
          if (min < 0 && max < 0) {
            result = row
              .filter(el => el >= Math.abs(max) && el <= Math.abs(min))
              .reverse()
              .map(el => (el *= -1));
          }
        }

        return result;
      } else return `status: ${obj1.status}, reason: ${obj1.reason}`;
    }
  }

  function getAnswerChoise(event) {
    if (event.target.getAttribute('data') === '2') return getFiboByLength(obj);
    else return getFiboByRange(obj);
  }
  return getAnswerChoise(event);
};
