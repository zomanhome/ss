function findChairs(arr, chairs) {
  if (!Array.isArray(arr) || !arr.length || !Number.isFinite(chairs)) {
    return "Wrong arguments!";
  }

  if (!chairs) {
    return "Game On";
  }

  let result = [],
    need = chairs;

  for (let i = 0; i < arr.length; i++) {
    let free = arr[i][1] - arr[i][0].length;

    if (free >= need) {
      result.push(need);
      break;
    }

    if (free > 0) {
      result.push(free);
      need -= free;
    } else {
      result.push(0);
    }
  }

  if (result.reduce((a, b) => a + b, 0) < chairs) {
    result = "Not enough!";
  }

  return result;
}
console.log(findChairs([["XXX", 3], ["XXXXX", 6], ["XXXXXX", 9]], 4));
console.log(
  findChairs(
    [["XXX", 1], ["XXXXXX", 6], ["X", 2], ["XXXXXX", 8], ["X", 3], ["XXX", 1]],
    5
  )
);
console.log(findChairs([["XX", 2], ["XXXX", 6], ["XXXXX", 4]], 0));
console.log(findChairs([["XX", 2], ["XXXX", 6], ["XXXXX", 4]], 10));
console.log(findChairs([["XX", 2], ["XXXX", 6], ["XXXXX", 4]], "string"));
console.log(findChairs("string", 4));
