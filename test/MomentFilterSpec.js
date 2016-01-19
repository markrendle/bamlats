describe('MomentFilter', function () {

  var target;

  describe('in Great Britain', function() {

    beforeEach(module('todos.filters', function (localeProvider) {
      localeProvider.override = 'en-GB';
    }));

    beforeEach(inject(function($filter) {
      target = $filter('moment');
    }));

    it('should format as DD/MM/YYYY', function() {

      var d = '2016-01-19T00:00:00Z';
      expect(target(d, 'short')).toEqual('19/01/2016');

    });
  });

  describe('in the Colonies', function () {

    beforeEach(module('todos.filters', function (localeProvider) {
      localeProvider.override = 'en-US';
    }));

    beforeEach(inject(function($filter) {
      target = $filter('moment');
    }));

    it('should format as MM/DD/YYYY', function() {

      var d = '2016-01-19T00:00:00Z';
      expect(target(d, 'short')).toEqual('01/19/2016');

    });
  });

});
