let jsElementaryTasks = {};

jsElementaryTasks.task1 = function(width, height, sign) {
  function checkArgsOfWriteChessboard(width, height, sign) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (!isNumeric(width) || !isNumeric(height))
      return (obj = { status: 'error', reason: 'not a number' });

    return true;
  }

  function writeChessboard(width = 12, height = 4, sign = '*') {
    width = Math.abs(parseInt(width));
    height = Math.abs(parseInt(height));
    let valid = checkArgsOfWriteChessboard(width, height, sign);

    if (valid) {
      if (typeof valid !== 'object') {
        sign = String(sign).trim()[0];
        if (!sign) sign = 'Œ';

        let result = '';

        for (let i = 1; i <= height; i++) {
          if (i % 2) {
            for (let i = 1; i <= width; i++) {
              i % 2 ? (result += sign) : (result += '&nbsp');
            }
          } else {
            for (let i = 1; i <= width; i++) {
              i % 2 ? (result += '&nbsp') : (result += sign);
            }
          }
          result += '<br>';
        }
        return result;
      } else return `status: ${obj.status}, reason: ${obj.reason}`;
    }
  }
  return writeChessboard(width, height, sign);
};
