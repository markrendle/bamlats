/// <reference path="module.ts" />

namespace ToDos {

    function wrapError<T>(promise: angular.IPromise<T>) {
        return promise.catch((response: angular.IHttpPromiseCallbackArg<{}>) => {
            switch (response.status) {
                case 401:
                    throw {message: 'Not logged in', level: 'danger'};
                case 404:
                    throw {message: 'Data was not found', level: 'danger'};
                default:
                    throw {message: 'A bad thing has happened', level: 'danger'};
            }
            return <T>null;
        });
    }

    export interface ToDoItem {
        id?: string;
        text: string;
        due: string;
        created: string;
        done?: string;
        tags?: string[];
    }

    export class ToDoService {

        constructor(private $http: angular.IHttpService) {

        }

        public list(): angular.IPromise<ToDoItem[]> {

            return wrapError(
                this.$http.get<ToDoItem[]>('/api/todos')
                    .then((response) => response.data)
            );
        }

        public add(item: ToDoItem) {

            item.id = item.id || Date.now().toString();

            return wrapError(
                this.$http.post<ToDoItem>('/api/todos', item)
                    .then(() => item)
            );

        }

        public markDone(item: ToDoItem) {

            item.done = moment.utc().toISOString();

            let url = '/api/todos/' + item.id;

            return wrapError(
                this.$http.put<ToDoItem>(url, item)
                    .then(() => item)
            );

        }

    }

    listModule.service('todoService', ToDoService);

}
