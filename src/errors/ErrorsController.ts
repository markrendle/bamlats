/// <reference path="module.ts" />

namespace ToDos {

    class ErrorsController {
        public list: ErrorInfo[] = [];

        constructor(errors: ErrorService, $timeout: angular.ITimeoutService) {

            errors.subscribe((error) => {
                this.list.push(error);
                $timeout(() => {
                    this.dismiss(error);
                }, 5000);
            });

        }

        public dismiss(error: ErrorInfo) {
            let i = this.list.indexOf(error);
            if (i >= 0) {
                this.list.splice(i, 1);
            }
        }

    }

    errorModule.controller('ErrorsController', ErrorsController);

}
