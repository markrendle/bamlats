describe('ListController', function() {

  beforeEach(module('todos.list'));

  describe('constructor', function() {

    var controller, httpBackend;

    beforeEach(inject(function ($controller, $httpBackend) {

      controller = $controller('ListController');
      httpBackend = $httpBackend;

    }));

    it('should GET /api/todos', function() {

      httpBackend.expectGET('/api/todos')
          .respond([
            { id: '42' }
          ]);

      httpBackend.flush();

      expect(controller.todoList).toBeDefined();
      expect(controller.todoList[0].id).toEqual('42');

    });

  });

});
