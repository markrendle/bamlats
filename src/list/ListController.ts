/// <reference path="module.ts" />

namespace ToDos {

    class ListController {
        public todoList: ToDoItem[];

        constructor(private todoService: ToDoService,
                    errors: ErrorService,
                    private $state: angular.ui.IStateService,
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

        public markDone(item: ToDoItem) {

            this.todoService.markDone(item)
                .then((savedItem) => {

                    if (savedItem !== item) {
                        let index = this.todoList.indexOf(item);
                        this.todoList.splice(index, 1, savedItem);
                    }

                });

        }

        public isOverdue(item: ToDoItem): boolean {
            if (!item.due) return false;
            let due = moment.utc(item.due, '');
            return due.isBefore(moment.utc());
        }

        public isDone(item: ToDoItem) {
            return !!item.done;
        }

        public get inEditState() {
            return this.$state.is('root.todos.edit');
        }

    }

    listModule.controller('ListController', ListController);

}
