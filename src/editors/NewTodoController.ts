/// <reference path="module.ts" />

namespace ToDos {

    interface NewTodo {
        text?: string;
        dueInDays?: number;
    }

    class NewTodoController {
        public todo: NewTodo;

        constructor(private $modalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            this.todo = {};
        }
    }

    editorsModule.controller('NewTodoController', NewTodoController);

}
