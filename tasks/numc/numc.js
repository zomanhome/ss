class NumC {
  static toData(num) {
    let nums = num.toString();

    nums = nums.replace(/\s*/g, '');
    nums = nums.replace(/[\s\.]/g, '');
    nums = nums.replace(/(&nbsp;)/g, '');
    nums = nums.replace(',', '.');

    return parseFloat(nums);
  }

  static toBuh(num, decimals, curr) {
    if (NumC.isNumeric(num)) {
      return NumC.convertToBuh(num, decimals, curr);
    } else {
      return num;
    }
  }

  static convertToBuh(num, decimals, curr) {
    let nums = String(num),
      counter = nums.length - (decimals + 1);

    decimals = decimals || 3;

    if (nums.indexOf(',') == -1 || counter < nums.indexOf(',')) {
      nums = num.toLocaleString('de-DE', { minimumFractionDigits: decimals });

      if (curr) {
        nums += ' ' + curr;
      }

      return nums;
    } else if (counter > nums.indexOf(',')) {
      nums = num.toLocaleString('de-DE', { maximumFractionDigits: decimals });

      if (curr) {
        nums += ' ' + curr;
      }

      return nums;
    }
  }

  static isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static toSymbol(curr) {
    switch (curr) {
      case 'UAH': {
        return '₴';
      }
      case 'EUR': {
        return '€';
      }
      case 'USD': {
        return '$';
      }
    }
    return curr;
  }

  static toCurrency(symb) {
    switch (symb) {
      case '₴': {
        return 'UAH';
      }
      case '€': {
        return 'EUR';
      }
      case '$': {
        return 'USD';
      }
    }
    return symb;
  }

  static calcSummFromRows(trs, summClassName) {
    let totalSumm = 0;

    for (let i = 0; i < trs.length; i++) {
      totalSumm += NumC.toData(trs[i].querySelector(summClassName).innerHTML);
    }

    return totalSumm;
  }

  static getFALDates(trs, dateClassName) {
    let dates = {},
      dtemp,
      y,
      m,
      d;

    dtemp = new Date(trs[0].querySelector(dateClassName).innerHTML);
    y = dtemp.getFullYear();
    m = dtemp.getMonth() + 1;
    d = dtemp.getDate();

    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;
    }

    dates['last'] = y + '-' + m + '-' + d;

    dtemp = new Date(
      trs[trs.length - 1].querySelector(dateClassName).innerHTML
    );
    y = dtemp.getFullYear();
    m = dtemp.getMonth() + 1;
    d = dtemp.getDate();

    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;
    }

    dates['first'] = y + '-' + m + '-' + d;

    return dates;
  }
}
