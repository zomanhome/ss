let input = document.querySelectorAll('input');
let output = document.querySelectorAll('#output');

runTask1 = () => {
  let height = input[0].value.trim();
  let width = input[1].value.trim();
  let symbol = input[2].value.trim();
  if (height === '') height = 12;
  if (width === '') width = 4;
  if (symbol === '') symbol = '*';
  output[0].innerHTML = jsElementaryTasks.task1(height, width, symbol);
};

runTask2 = () => {
  let firstSide = input[3].value.trim();
  let secondSide = input[4].value.trim();
  let thirdSide = input[5].value.trim();
  let fourthSide = input[6].value.trim();
  output[1].innerHTML = jsElementaryTasks.task2(
    { a: firstSide, b: secondSide },
    { c: thirdSide, d: fourthSide }
  );
};

runTask3 = () => {
  output[2].innerHTML = jsElementaryTasks.task3([
    { vertices: 'XYZ', x: 5, z: 1, y: 12.03 },
    { vertices: 'ABC', a: 10, b: 20, c: 22.36 },
    { vertices: 'DEF', d: 12, e: 14, f: 24.13 },
    { vertices: 'GHI', g: 5, h: 1, i: 12.03 },
    { vertices: 'JKL', j: 30, k: 20, l: 22.36 }
  ]);
};

runTask4 = () => {
  let inputValue = input[7].value.trim();
  output[3].innerHTML = jsElementaryTasks.task4(inputValue);
};

runTask5 = () => {
  let inputValue1 = input[8].value.trim();
  let inputValue2 = input[9].value.trim();
  output[4].innerHTML = jsElementaryTasks.task5({
    min: inputValue1,
    max: inputValue2
  });
};

runTask6 = () => {
  let rowLength = input[10].value.trim();
  let minSquare = input[11].value.trim();
  output[5].innerHTML = jsElementaryTasks.task6(rowLength, minSquare);
};

runTask7 = event => {
  let minValue = input[12].value.trim();
  let maxValue = input[13].value.trim();
  let lengthValue = input[14].value.trim();
  let context = {
    length: lengthValue,
    min: minValue,
    max: maxValue
  };
  output[6].innerHTML = jsElementaryTasks.task7(event, context);
};
