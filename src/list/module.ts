namespace ToDos {

    const requires = [
        'ui.router',
        'ui.bootstrap',
        'todos.filters',
        'todos.errors',
        'todos.editors'
    ];

    export const listModule = angular.module('todos.list', requires);

    listModule.config(($stateProvider: angular.ui.IStateProvider) => {

        $stateProvider.state({

            name: 'root.todos',
            url: 'list',
            controller: 'ListController',
            controllerAs: 'listCtrl',
            templateUrl: 'list/list.html'

        });

    });

}
