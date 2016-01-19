describe("ListController", function () {

    beforeEach(module("todos.main"));

    var controller, httpBackend;

    beforeEach(function() {

        inject(function($controller, $httpBackend) {

            httpBackend = $httpBackend;
            controller = $controller("ListController");

        });

    });

    it("should GET /api/todos", function () {

        httpBackend.expectGET("/api/todos")
            .respond({id: "42"});

        httpBackend.flush();

    });

    it("should set a todos property", function () {

        httpBackend.expectGET("/api/todos")
            .respond([{id: "42"}]);

        httpBackend.flush();

        expect(controller.todos).toBeDefined();

    });

});
