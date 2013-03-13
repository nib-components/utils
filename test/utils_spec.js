describe('Utils', function(){

  var utils = component('utils');

  describe('Equal Arrays', function(){

    it('should compare two arrays', function(){
      var equal = utils.arraysEqual(['foo', 'bar'], ['foo', 'bar']);
      expect(equal).to.equal(true);
    });

    it('should match unsorted arrays', function(){
      var equal = utils.arraysEqual(['bar', 'foo'], ['foo', 'bar']);
      expect(equal).to.equal(true);
    });

  });

});