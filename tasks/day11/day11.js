function binaryCombos(n) {
  let result = [];
  for (y = 0; y < Math.pow(2, n); y++) {
    let combo = [];
    for (x = 0; x < n; x++) {
      if ((y >> x) & 1) combo.push('+');
      else combo.push('-');
    }
    result.push(combo);
  }
  return result;
}
console.log(binaryCombos(5));

// Task 1
function getSolution(arr, sum) {
  let result = false;
  if (!Array.isArray(arr) || !Number.isFinite(sum)) return result;
  if (arr.length < 2 || arr.length > 22) return result;
  if (!arr.every(elem => elem >= 0 && elem <= 20)) return result;

  for (let i = 0; i < Math.pow(2, arr.length - 1); i++) {
    let variant = [];
    for (let j = 0; j < arr.length - 1; j++) {
      if ((i >> j) & 1) {
        variant.push('+');
      } else {
        variant.push('-');
      }
    }
    let expression = [];
    for (k = 0; k < arr.length; k++) {
      expression.push(arr[k]);
      if (k !== arr.length - 1) expression.push(variant[k]);
    }
    expression = eval(expression.join(''));
    if (expression === sum) {
      return true;
    }
  }

  return result;
}
console.log(getSolution([1, 3, 4, 6, 8], -2));
console.log(getSolution([15, 2, 3], 10));
console.log(getSolution([1, 5, 3, 2, 5], -2));

// Task 2
function countdown(msec) {
  if (!Number.isFinite(msec)) return 'Not Number';

  let result = '+';

  if (msec < 0) {
    result = '-';
    msec = Math.abs(msec);
  }

  let seconds = Math.floor((msec / 1000) % 60);
  let minutes = Math.floor((msec / (1000 * 60)) % 60);
  let hours = Math.floor(msec / (1000 * 60 * 60));

  if (seconds < 10) seconds = '0' + seconds;
  if (minutes < 10) minutes = '0' + minutes;
  if (hours < 10) hours = '0' + hours;

  return `${result}${hours}:${minutes}:${seconds}`;
}
console.log(countdown(-154800000));
console.log(countdown(0));
console.log(countdown(61000));
console.log(countdown(360000000));

// Task 3
function dateFilter(date, str) {
  if (typeof date === 'string') date = Date.parse(date);
  if (Number.isFinite(date)) date = new Date(date);
  if (!date instanceof Date || isNaN(date)) return 'Wrong date';

  let yyyy = date.getUTCFullYear();
  let yy = String(yyyy).slice(2);
  let M = date.getUTCMonth() + 1;
  let MM =
    String(date.getUTCMonth()).length === 1
      ? '0' + (date.getUTCMonth() + 1)
      : date.getUTCMonth() + 1;
  let d = date.getUTCDate();
  let dd =
    String(date.getUTCDate()).length === 1
      ? '0' + date.getUTCDate()
      : date.getUTCDate();
  let HH =
    String(date.getUTCHours()).length === 1
      ? '0' + date.getUTCHours()
      : date.getUTCHours();
  let H = date.getUTCHours();
  let mm =
    String(date.getUTCMinutes()).length === 1
      ? '0' + date.getUTCMinutes()
      : date.getUTCMinutes();
  let m = date.getUTCMinutes();
  let ss =
    String(date.getUTCSeconds()).length === 1
      ? '0' + date.getUTCSeconds()
      : date.getUTCSeconds();
  let s = date.getUTCSeconds();

  let result = str;
  let reps = [
    [/yyyy/g, yyyy],
    [/yy/g, yy],
    [/MM/g, MM],
    [/M/g, M],
    [/dd/g, dd],
    [/d/g, d],
    [/HH/g, HH],
    [/H/g, H],
    [/mm/g, mm],
    [/m/g, m],
    [/ss/g, ss],
    [/s/g, s]
  ];

  reps.forEach(rep => (result = result.replace(rep[0], rep[1])));

  /*let result = str
    .replace(/yyyy/g, yyyy)
    .replace(/yy/g, yy)
    .replace(/MM/g, MM)
    .replace(/M/g, M)
    .replace(/dd/g, dd)
    .replace(/d/g, d)
    .replace(/HH/g, HH)
    .replace(/H/g, H)
    .replace(/mm/g, mm)
    .replace(/m/g, m)
    .replace(/ss/g, ss)
    .replace(/s/g, s);*/

  return result;
}
console.log(dateFilter(new Date(0), 'HH:mm'));
console.log(dateFilter(new Date(0), 'dd/MM/yyyy'));
console.log(dateFilter(new Date(0), 'd/M/yy H%m'));
