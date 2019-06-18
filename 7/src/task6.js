jsElementaryTasks.task6 = function(len, m) {
  function checkArgsOfGetRow(len, m) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (!isNumeric(len) || !isNumeric(m))
      return (obj = { status: 'error', reason: 'not a number' });
    if (m < 0) return (obj = { status: 'error', reason: 'negative length' });

    return true;
  }

  function getRow(len, m) {
    let valid = checkArgsOfGetRow(len, m);

    if (valid) {
      if (typeof valid !== 'object') {
        let result = [];
        let maxNumber = Math.ceil(Math.sqrt(m));

        for (let i = 0; i < len; i++) result.push(maxNumber + i);

        return result.join(',');
      } else return `status: ${obj.status}, reason: ${obj.reason}`;
    }
  }
  return getRow(len, m);
};
