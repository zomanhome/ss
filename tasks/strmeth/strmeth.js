function _split(str, sign, limit) {
  if (str === '') return [''];
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');
  if (!sign) throw new Error('No divider');
  if (sign instanceof RegExp) {
    console.log('RegExp is not support');
    return [str];
  }
  if (typeof sign !== 'string') sign = String(sign);
  if (limit && !Number.isFinite(+limit)) return [];

  let result = [];
  let length = str.length;

  for (let i = 0; i < length; i++) {
    let position = str.indexOf(sign);

    if (position >= 0) {
      result.push(str.substr(0, position));
      str = str.substr(position + sign.length);
    } else {
      result.push(str);
      break;
    }
  }

  if (+limit >= 0) {
    result.length = limit;
  }

  return result;
}
console.log(_split('121212', 1, '2'));
console.log('121212'.split(1, '2'));
console.log(_split('1,23, 34,45,,,,1,', ',', 4));
console.log('1,23, 34,45,,,,1,'.split(',', 4));
console.log(_split(''));
console.log(_split('6546a5864', /\5/g));
console.log('6546a5864'.split(/\5/g));

function _repeat(str, number) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');
  if (number && !Number.isFinite(+number)) throw new Error('Not number');

  let result = '';
  number = Math.floor(+number);

  for (let i = 0; i < number; i++) {
    result += str;
  }

  return result;
}
console.log(_repeat('1', '3.6'));
console.log('1'.repeat('3.6'));

function _endsWith(str, sstr, pos) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');
  if (pos && !Number.isFinite(+pos)) return false;
  if (pos) str = str.substr(0, pos);

  let result = false;
  if (str.slice(-sstr.length) === sstr) result = true;

  return result;
}
console.log(_endsWith('Быть или не быть, вот в чём вопрос.', 'вопрос.'));
console.log('Быть или не быть, вот в чём вопрос.'.endsWith('вопрос.'));
console.log(_endsWith('Быть или не быть, вот в чём вопрос.', 'быть', 16));
console.log('Быть или не быть, вот в чём вопрос.'.endsWith('быть', 16));

function _includes(str, sstr, pos) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');
  if (typeof pos !== 'number') pos = 0;
  if (pos) str = str.slice(pos);

  let result = false;

  if (str.indexOf(sstr) !== -1) result = true;

  return result;
}
console.log(_includes('Быть или не быть вот в чём вопрос.', 'быть', 18));
console.log('Быть или не быть вот в чём вопрос.'.includes('быть', 18));

function _trim(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
console.log(_trim(' \uFEFF   или  \uFEFF '));
console.log(' \uFEFF   или  \uFEFF '.trim());

function _trimNoRegExp(str) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');

  let resultL = '';

  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ' || str[i] === ' ' || str[i] === '\uFEFF') {
      resultL = str.slice(i + 1);
    } else break;
  }

  if (resultL === '') {
    resultL = str;
  }

  for (let i = resultL.length - 1; i >= 0; i--) {
    if (resultL[i] === ' ' || resultL[i] === ' ' || resultL[i] === '\uFEFF') {
      result = resultL.slice(0, i);
    } else break;
  }

  return result;
}
console.log(_trimNoRegExp('     \uFEFF    или      \uFEFF  '));
console.log('     \uFEFF    или      \uFEFF  '.trim());

function _substr(str, start, length) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');
  if (
    (start && !Number.isFinite(+start)) ||
    (length && !Number.isFinite(+length))
  )
    return '';

  let result = '';

  if (!length || +length > str.length || +start + +length > str.length) {
    length = str.length;
  } else if (+start > 0) {
    length += +start;
  }

  if (start < 0) {
    if (str.length + +start < 0) {
      start = 0;
    } else {
      start = str.length + +start;
      length = str.length;
    }
  }

  for (let i = start; i < length; i++) {
    result += str[i];
  }

  if (start >= str.length) result = '';

  return result;
}
console.log(_substr('1234567890', '-80', '150'));
console.log('1234567890'.substr('-80', '150'));

function _indexOf(str, sstr, fromIndex) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');
  if (typeof fromIndex !== 'number' || fromIndex < 0) fromIndex = 0;

  let result = -1;

  if (sstr === '') {
    if (fromIndex < str.length) {
      result = fromIndex;
    } else {
      result = str.length;
    }
  }

  if (fromIndex >= 0 && fromIndex < str.length && sstr !== '') {
    for (let i = fromIndex; i < str.length; i++) {
      if (sstr === str.substr(i, sstr.length)) {
        result = i;
        break;
      }
    }
  }

  return result;
}
console.log(_indexOf('Синий кит кит кит и дельфин', 'кит', 2));
console.log('Синий кит кит кит и дельфин'.indexOf('кит', 2));

function _lastIndexOf(str, sstr, fromIndex) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');
  if (typeof fromIndex !== 'number' || fromIndex < 0) fromIndex = 0;

  let result = -1;

  if (sstr === '') {
    if (fromIndex < str.length) {
      result = fromIndex;
    } else {
      result = str.length;
    }
  }

  if (fromIndex >= 0 && fromIndex < str.length && sstr !== '') {
    str = str.substr(0, fromIndex + sstr.length);
    for (let i = 0; i <= str.length; i++) {
      if (sstr === str.substr(i, sstr.length)) {
        result = i;
      }
    }
  }

  return result;
}
console.log(_lastIndexOf('Синий кит кит кот', 'ки', 6));
console.log('Синий кит кит кот'.lastIndexOf('ки', 6));

function _toLowerCase(str) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');

  let result = '';

  for (let char of str) {
    if (
      (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) ||
      (char.charCodeAt() >= 1040 && char.charCodeAt() <= 1072)
    ) {
      result += String.fromCharCode(char.charCodeAt() + 32);
    } else if (char.charCodeAt() == 1025) {
      result += String.fromCharCode(1105);
    } else {
      result += char;
    }
  }

  return result;
}
console.log(_toLowerCase('HeLLo ЁЖик!'));
console.log('HeLLo ЁЖик!'.toLowerCase());

function _toUpperCase(str) {
  if (!str) throw new Error('No args');
  if (typeof str !== 'string') throw new Error('Not string');

  let result = '';

  for (let char of str) {
    if (
      (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) ||
      (char.charCodeAt() >= 1072 && char.charCodeAt() <= 1104)
    ) {
      result += String.fromCharCode(char.charCodeAt() - 32);
    } else if (char.charCodeAt() == 1105) {
      result += String.fromCharCode(1025);
    } else {
      result += char;
    }
  }

  return result;
}
console.log(_toUpperCase('HeLLo ёжИк!'));
console.log('HeLLo ёжИк!'.toUpperCase());
