let current = new Date();
let divs = document.querySelectorAll('.numbers > .days > div');
let months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

for (let div of divs) div.onclick = divOnClick;
setClock();
document.querySelector('.date').innerHTML = current.toLocaleString('ru', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
fillDays(current);
addEventListener('keydown', goArrows);

function fillDays(date) {
  let now = date.getDate();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  if (firstDay === 0) firstDay = 7;
  let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let currentDay;

  document.querySelector('.current').innerHTML = getMYYYY(
    date.toLocaleString('ru', {
      year: 'numeric',
      month: 'long'
    })
  );

  if (
    getMYYYY(
      date.toLocaleString('ru', {
        year: 'numeric',
        month: 'long'
      })
    ) ===
    getMYYYY(
      current.toLocaleString('ru', {
        year: 'numeric',
        month: 'long'
      })
    )
  ) {
    currentDay = current.getDate();
  }

  let twoActive = false;
  for (let [index, div] of divs.entries()) {
    let day = index + 2 - firstDay;

    if (day <= 0 || day > lastDate) div.classList.add('gray');
    if (day === now && day !== currentDay) {
      div.classList.add('otherActive');
    }
    if (day === currentDay) {
      div.classList.add('nowActive');
    }
    div.innerHTML = new Date(
      date.getFullYear(),
      date.getMonth(),
      day
    ).getDate();
  }
  for (let div of divs) {
    if (div.classList.contains('otherActive')) twoActive = true;
  }

  if (twoActive) {
    for (let div of divs) {
      if (div.classList.contains('nowActive')) {
        div.classList.remove('nowActive');
        div.classList.add('nowNotActive');
        break;
      }
    }
  }
}

function goMonth(e) {
  let current = document.querySelector('.current').innerHTML;
  let year = current.slice(-5);
  let direction = -1;
  let newDate;

  for (let i = 0; i < months.length; i++) {
    if (current.indexOf(months[i]) !== -1) {
      newDate = new Date(`${i + 1}/01/${year}`);
      break;
    }
  }
  if (e === '&gt;&gt;') direction = 1;
  newDate = new Date(newDate.getFullYear(), newDate.getMonth() + direction, 1);
  if (
    getMYYYY(
      newDate.toLocaleString('ru', {
        year: 'numeric',
        month: 'long'
      })
    ) ===
    getMYYYY(
      new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'long'
      })
    )
  )
    newDate = new Date();
  removeClasses();
  fillDays(newDate);
}

function removeClasses() {
  for (let div of divs) div.classList = '';
}

function getMYYYY(date) {
  return (date = date[0].toUpperCase() + date.slice(1, -2));
}

function setClock() {
  document.querySelector('.time').innerHTML = new Date().toLocaleString('ru', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  setTimeout(setClock, 500);
}

function divOnClick(e) {
  if (e.target.classList.contains('otherActive')) return false;
  if (
    e.target.classList.contains('nowActive') ||
    e.target.classList.contains('nowNotActive')
  ) {
    for (let div of divs) div.classList.remove('otherActive');
    e.target.classList.remove('nowNotActive');
    e.target.classList.add('nowActive');
    return false;
  }
  for (let div of divs) {
    if (div.classList.contains('otherActive'))
      div.classList.remove('otherActive');
    if (div.classList.contains('nowActive')) {
      div.classList.remove('nowActive');
      div.classList.add('nowNotActive');
    }
  }
  e.target.classList.add('otherActive');
}

function goDay(e) {
  let curIndex = getCurIndex();
  let direction = -1;

  if (e === '&gt;') direction = 1;
  if (curIndex === 0 && direction === -1) {
    let current = document.querySelector('.current').innerHTML;
    let year = current.slice(-5);
    let date = +divs[curIndex].innerHTML;
    let newDate;

    for (let i = 0; i < months.length; i++) {
      if (current.indexOf(months[i]) !== -1) {
        if (i === 0) {
          i = 12;
          year = String(+year - 1);
        }
        if (divs[curIndex].classList.contains('gray')) {
          newDate = new Date(`${i}/${date - 1}/${year}`);
        } else {
          newDate = new Date(`${i}/${date}/${year}`);
          newDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
        }
        break;
      }
    }
    removeClasses();
    fillDays(newDate);

    return false;
  }
  if (curIndex === 41 && direction === 1) {
    let current = document.querySelector('.current').innerHTML;
    let year = current.slice(-5);
    let date = +divs[curIndex].innerHTML;
    let newDate;

    for (let i = 0; i < months.length; i++) {
      if (current.indexOf(months[i]) !== -1) {
        if (i === 11) {
          i = -1;
          year = String(+year + 1);
        }
        newDate = new Date(`${i + 2}/${date + 1}/${year}`);
        break;
      }
    }
    removeClasses();
    fillDays(newDate);

    return false;
  }
  if (divs[curIndex].classList.contains('nowActive')) {
    divs[curIndex].classList.remove('nowActive');
    divs[curIndex].classList.add('nowNotActive');
    divs[curIndex + direction].classList.add('otherActive');
  }
  if (divs[curIndex + direction].classList.contains('nowNotActive')) {
    divs[curIndex].classList.remove('otherActive');
    divs[curIndex + direction].classList.remove('nowNotActive');
    divs[curIndex + direction].classList.add('nowActive');
  }
  if (divs[curIndex].classList.contains('otherActive')) {
    divs[curIndex].classList.remove('otherActive');
    divs[curIndex + direction].classList.add('otherActive');
  }
}

function getCurIndex() {
  let curIndex;

  for (let [index, div] of divs.entries()) {
    if (div.classList.contains('otherActive')) {
      curIndex = index;
      break;
    }
  }
  if (!curIndex) {
    for (let [index, div] of divs.entries()) {
      if (div.classList.contains('nowActive')) {
        curIndex = index;
        break;
      }
    }
  }

  return curIndex;
}

function goArrows(e) {
  switch (e.keyCode) {
    case 37: // влево
      goDay('&lt;');
      break;
    case 39: // вправо
      goDay('&gt;');
      break;
    case 38: // вверх
      goMonth('&lt;&lt;');
      break;
    case 40: // вниз
      goMonth('&gt;&gt;');
      break;
  }
}
