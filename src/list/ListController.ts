/// <reference path="module.ts" />

namespace ToDos {

    class ListController {
        public todoList: ToDoItem[];

        constructor(private todoService: ToDoService,
                    errors: ErrorService,
                    private $modal: angular.ui.bootstrap.IModalService) {

            todoService.list()
                .then((list) => {
                    this.todoList = list;
                })
                .catch((error: ErrorInfo) => {
                    errors.push(error);
                });

        }

        public addNew() {
            this.$modal.open({
                controller: 'NewTodoController',
                controllerAs: 'newCtrl',
                templateUrl: 'editors/new.html'
            })
            .result
            .then((item: ToDoItem) => {

                let info = this.$modal.open({
                    template: '<div><i class="fa fa-spinner fa-spin fa-2x"></i> Saving...</div>'
                });

                this.todoService.add(item)
                    .then((item) => {
                        this.todoList.push(item);
                        info.dismiss();
                    });
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
