/// <reference path="module.ts" />

namespace ToDos {

    export interface ToDoItem {
        id: string;
        text: string;
        due: string;
        created: string;
        done: string;
        tags: string[];
    }

    export class ToDoService {

        constructor(private $http: angular.IHttpService) {

        }

        public list(): angular.IPromise<ToDoItem[]> {

            return this.$http.get<ToDoItem[]>('/api/todos')
                .then((response) => response.data)
                .catch((response: angular.IHttpPromiseCallbackArg<{}>) => {
                    switch (response.status) {
                        case 401:
                            throw {message: 'Not logged in', level: 'danger'};
                        case 404:
                            throw {message: 'Data was not found', level: 'danger'};
                        default:
                            throw {message: 'A bad thing has happened', level: 'danger'};
                    }
                    return <ToDoItem[]>null;
                });
        }

    }

    listModule.service('todoService', ToDoService);

}
