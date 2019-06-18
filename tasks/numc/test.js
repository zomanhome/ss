describe('NumC', function() {
  describe('NumC.toData', function() {
    it('return Number from argument', function() {
      assert.equal(NumC.toData('.... 5 . . ..,23'), 5.23);
    });
    it('return Number from argument', function() {
      assert.equal(NumC.toData('100,500'), 100.5);
    });
    it('return Number from argument', function() {
      assert.equal(NumC.toData('1sss1ddfg00500'), 1);
    });
    it('return Number from argument', function() {
      assert.equal(NumC.toData('1,234'), 1.234);
    });
  });
  describe('NumC.convertToBuh', function() {
    it('convert Number to separated by dot Number, round after decimals, add Currency', function() {
      assert.equal(
        NumC.convertToBuh(100200.36568, 1, 'EUR'),
        '100.200,366 EUR'
      );
    });
    it('convert Number to separated by dot Number, round after decimals, add Currency', function() {
      assert.equal(
        NumC.convertToBuh(20100200.36568, 4, 'EUR'),
        '20.100.200,3657 EUR'
      );
    });
    it('convert Number to separated by dot Number, round after decimals, add Currency', function() {
      assert.equal(NumC.convertToBuh(234.4563765, 2, 'UAH'), '234,456 UAH');
    });
  });
});
