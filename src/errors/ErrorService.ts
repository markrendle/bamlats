/// <reference path="module.ts" />

namespace ToDos {

    export interface ErrorInfo {
        id?: string;
        message: string;
        level: string;
    }

    export type ErrorCallback = (e: ErrorInfo) => any;

    export class ErrorService {
        //private queue: ErrorInfo[] = [];
        private subscribers: ErrorCallback[] = [];

        public push(error: ErrorInfo) {
            //this.queue.push(error);
            for (let subscriber of this.subscribers) {
                subscriber(error);
            }
        }

        public subscribe(callback: ErrorCallback) {
            this.subscribers.push(callback);
        }
    }

    errorModule.service('errors', ErrorService);
}
