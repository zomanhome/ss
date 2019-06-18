function nextVersion(str) {
  let result = str.split(".").reverse();

  for (let i = 0; i < result.length; i++) {
    if (Number(result[i]) !== 9) {
      result[i]++;
      break;
    }
    if (Number(result[i]) === 9 && i !== result.length - 1) {
      result[i] = 0;
    }
    if (Number(result[i]) === 9 && i == result.length - 1) {
      result[i] = 10;
    }
  }

  return result.reverse().join(".");
}
console.log(nextVersion("1.2.3"));
console.log(nextVersion("0.9.9"));
console.log(nextVersion("1"));
console.log(nextVersion("1.2.3.4.5.6.7.8"));
console.log(nextVersion("9.9"));
console.log(nextVersion("1.1.9.9"));
