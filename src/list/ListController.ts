/// <reference path="module.ts" />

namespace ToDos {

    interface ToDoItem {
        id: string;
    }

    class ListController {
        public todoList: ToDoItem[];

        constructor($http: angular.IHttpService) {

            $http.get<ToDoItem[]>('/api/todos')
                .then((response) => {
                    this.todoList = response.data;
                });

        }

    }

    listModule.controller('ListController', ListController);

}
