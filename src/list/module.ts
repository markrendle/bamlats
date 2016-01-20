namespace ToDos {

    const requires = [
        'ui.router',
        'ui.bootstrap',
        'todos.filters',
        'todos.errors',
        'todos.editors',
        'todos.directives'
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

        $stateProvider.state({
            name: 'root.todos.edit',
            url: '/{id}',
            controller: 'EditController',
            controllerAs: 'editCtrl',
            templateUrl: 'editors/edit.html'
        });

    });

}
