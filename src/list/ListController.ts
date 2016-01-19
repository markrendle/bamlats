/// <reference path="module.ts" />

namespace ToDos {


    class ListController {
        public todoList: ToDoItem[];

        constructor(todoService: ToDoService, errors: ErrorService) {

            todoService.list()
                .then((list) => {
                    this.todoList = list;
                    errors.push({message: 'test', level: 'warning'});
                })
                .catch((error: ErrorInfo) => {
                    errors.push(error);
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
