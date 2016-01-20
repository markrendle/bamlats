/// <reference path="module.ts" />

namespace ToDos {

    interface EditParams {
        id: string;
    }

    class EditController {
        public todo: ToDoItem;

        constructor($stateParams: EditParams, $http: angular.IHttpService) {

            $http.get<ToDoItem>('/api/todos/' + $stateParams.id)
                .then((response) => {
                    this.todo = response.data;
                });

        }

    }

}
