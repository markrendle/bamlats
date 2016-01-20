/// <reference path="module.ts" />

namespace ToDos {


    class ListController {
        public todoList: ToDoItem[];

        constructor(todoService: ToDoService,
                    errors: ErrorService,
                    $modal: angular.ui.bootstrap.IModalService) {

            todoService.list()
                .then((list) => {
                    this.todoList = list;
                })
                .catch((error: ErrorInfo) => {
                    errors.push(error);
                });

        }

        public addNew() {

        }

        public isOverdue(item: ToDoItem): boolean {
            if (!item.due) return false;
            let due = moment.utc(item.due, '');
            return due.isBefore(moment.utc());
        }

    }

    listModule.controller('ListController', ListController);

}
