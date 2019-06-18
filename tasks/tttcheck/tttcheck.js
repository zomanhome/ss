/* function ckeckBoard(arr) {
  let result = 0;

  arr.forEach(line => {
    line.forEach(el => {
      if (!el) result = -1;
    });
  });

  arr.forEach(line => {
    if (line.every(el => el === 1)) {
      result = 1;
    }
    if (line.every(el => el === 2)) {
      result = 2;
    }
  });

  for (i = 0; i < 3; i++) {
    if (arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i]) {
      result = arr[0][i];
    }
    if (arr[0][i] === arr[1][i + 1] && arr[1][i + 1] === arr[2][i + 2]) {
      result = arr[0][i];
    }
    if (arr[0][i] === arr[1][i - 1] && arr[1][i - 1] === arr[2][i - 2]) {
      result = arr[0][i];
    }
  }

  return result;
} */

function ckeckLine(arr) {
  let result = 0;

  if (arr.every(el => el === 1)) {
    result = 1;
  }
  if (arr.every(el => el === 2)) {
    result = 2;
  }

  return result;
}

function checkBoard(arr) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].some(el => el === 0)) {
      result = -1;
      break;
    }
  }

  let lDiag = [],
    rDiag = [];

  for (let i = 0; i < arr.length; i++) {
    let test = ckeckLine(arr[i]);
    if (test) {
      result = test;
      break;
    }

    lDiag.push(arr[i][i]);
    rDiag.push(arr[arr.length - 1 - i][i]);

    let ver = [];
    for (let j = 0; j < arr.length; j++) {
      ver.push(arr[j][i]);
    }
    test = ckeckLine(ver);
    if (test) {
      result = test;
      break;
    }
  }

  let test = ckeckLine(lDiag);
  if (test) {
    result = test;
  }

  test = ckeckLine(rDiag);
  if (test) {
    result = test;
  }

  return result;
}
console.log(checkBoard([[1, 2, 2], [2, 2, 1], [2, 1, 1]]));
console.log(checkBoard([[1, 2, 1], [1, 2, 2], [2, 0, 1]]));
console.log(checkBoard([[1, 2, 1], [1, 1, 2], [2, 0, 1]]));
console.log(checkBoard([[2, 2, 2], [1, 1, 2], [2, 0, 1]]));
console.log(checkBoard([[1, 2, 1], [1, 2, 2], [2, 1, 1]]));
