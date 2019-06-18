jsElementaryTasks.task3 = function(arr) {
  function checkArgsOfSortTriangles(arr) {
    let err = [];

    if (!Array.isArray(arr))
      return (obj = { status: 'error', reason: 'not an array' });
    arr.forEach(obj => {
      let { vertices } = obj;

      if (vertices.length < 3) err.push(`${vertices} is not correct`);
    });
    if (err.length !== 0) return (obj = { status: 'error', reason: err });

    return true;
  }

  function sortTriangles(arr) {
    let valid = checkArgsOfSortTriangles(arr);

    if (valid) {
      if (typeof valid !== 'object') {
        let result = [];

        arr.forEach(obj => {
          let { vertices } = obj;
          let a = obj[vertices[0].toLowerCase()];
          let b = obj[vertices[1].toLowerCase()];
          let c = obj[vertices[2].toLowerCase()];
          let p = (a + b + c) / 2;
          let s = Math.sqrt(p * (p - a) * (p - b) * (p - c));

          if (isNaN(s)) obj.s = -1;
          else obj.s = s;
        });

        arr.sort((a, b) => b.s - a.s);
        arr.forEach(obj => {
          let { vertices } = obj;
          if (obj.s !== -1) result.push(vertices);
          else result.push(`sides of '${vertices}' are wrong!`);
        });

        return result.join(', ');
      } else return `status: ${obj.status}, reason: ${obj.reason}`;
    }
  }
  return sortTriangles(arr);
};
