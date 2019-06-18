jsElementaryTasks.task4 = function(num) {
  function checkArgsOfGetPalindrome(num) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (!isNumeric(num))
      return (obj = { status: 'error', reason: 'not a number' });
    if (num < 11) return (obj = { status: 'error', reason: 'number is < 11' });

    return true;
  }

  function getPalindrome(num) {
    let valid = checkArgsOfGetPalindrome(num);

    if (valid) {
      if (typeof valid !== 'object') {
        let result = 0;

        num = String(num);
        let mirrow = num
          .split('')
          .reverse()
          .join('');

        for (let i = 0; i < num.length - 1; i++) {
          for (let j = 2; j <= num.length; j++) {
            let str = num.substr(i, j);
            if (mirrow.indexOf(str) !== -1) {
              let mirrow = str
                .split('')
                .reverse()
                .join('');
              if (str === mirrow && +str > result) result = +str;
            }
          }
        }

        return result;
      } else return `status: ${obj.status}, reason: ${obj.reason}`;
    }
  }
  return getPalindrome(num);
};
