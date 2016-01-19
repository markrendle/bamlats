/// <reference path="module.ts" />

namespace ToDos {

    interface ToDoItem {
        id: string;
        text: string;
        due: string;
        created: string;
        done: string;
        tags: string[];
    }

    class ListController {
        public todoList: ToDoItem[];

        constructor($http: angular.IHttpService) {

            $http.get<ToDoItem[]>('/api/todos')
                .then((response) => {
                    this.todoList = response.data;
                });

        }

        public isOverdue(item: ToDoItem): boolean {
            if (!item.due) return false;
            let due = moment.utc(item.due, '');
            return due.isBefore(moment.utc());
        }

    }

    listModule.controller('ListController', ListController);

}
