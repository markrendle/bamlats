namespace ToDos {

    export const listModule = angular.module('todos.list', ['ui.router']);

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
