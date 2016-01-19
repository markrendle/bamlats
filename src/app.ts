namespace ToDos {

    const deps = [
        'ui.router',
        'todos.list'
    ];

    const app = angular.module('todos', deps);

    class RootController {

    }

    app.controller('RootController', RootController);

    app.config(($stateProvider: angular.ui.IStateProvider) => {

        $stateProvider.state({
            name: 'root',
            url: '/',
            controller: 'RootController',
            controllerAs: 'root',
            templateUrl: '/root/root.html'
        });

    });

    app.config(($urlRouterProvider: angular.ui.IUrlRouterProvider) => {

        $urlRouterProvider.otherwise('/');

    });

}
