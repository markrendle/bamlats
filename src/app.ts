namespace ToDos {

    const deps = [
        'ui.router',
        'todos.list',
        'todos.filters',
        'todos.errors'
    ];

    const app = angular.module('todos', deps);

    class RootController {

    }

    app.controller('RootController', RootController);

    app.config(($stateProvider: angular.ui.IStateProvider) => {

        $stateProvider.state({
            name: 'root',
            url: '/',
            views: {
                '': {
                    controller: 'RootController',
                    controllerAs: 'root',
                    templateUrl: '/root/root.html'
                },
                'errors': {
                    controller: 'ErrorsController',
                    controllerAs: 'errors',
                    templateUrl: '/errors/errors.html'
                }
            }
        });

    });

    app.config(($urlRouterProvider: angular.ui.IUrlRouterProvider) => {

        $urlRouterProvider.otherwise('/');

    });

    app.config((localeProvider: LocaleProvider) => {

        localeProvider.override = 'en-GB';

    });

}
