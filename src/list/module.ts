namespace ToDos {

    const requires = [
        'ui.router',
        'todos.filters'
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
