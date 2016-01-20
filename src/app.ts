namespace ToDos {

    const deps = [
        'ui.router',
        'todos.list',
        'todos.filters',
        'todos.errors'
    ];

    const app = angular.module('todos', deps);

    class RootController {

    }

    app.controller('RootController', RootController);

    app.config(($stateProvider: angular.ui.IStateProvider) => {

        $stateProvider.state({
            name: 'root',
            url: '/',
            views: {
                '': {
                    controller: 'RootController',
                    controllerAs: 'root',
                    templateUrl: '/root/root.html'
                },
                'errors': {
                    controller: 'ErrorsController',
                    controllerAs: 'errors',
                    templateUrl: '/errors/errors.html'
                }
            }
        });

    });

    app.config(($urlRouterProvider: angular.ui.IUrlRouterProvider) => {

        $urlRouterProvider.otherwise('/');

    });

    app.config((localeProvider: LocaleProvider) => {

        localeProvider.override = 'en-GB';

    });

    app.config(($httpProvider: angular.IHttpProvider) => {
        const apiRegex = /^\/api\//;

        $httpProvider.interceptors.push(($q: angular.IQService) => ({
            request: (config: angular.IRequestConfig) => {
                if (apiRegex.test(config.url)) {
                    //config.headers["Authorization"] = "Bearer " + localStorage['apiToken'];
                    config.headers["Authorization"] = "SecretSquirrel";
                }

                // HAS TO RETURN THE CONFIG OUT AGAIN
                return config;
            },
            responseError: (response: angular.IHttpPromiseCallbackArg) => {
                if (response.status === 401) {
                    window.location.replace('https://id.cloudlens.io');
                }
                return $q.reject(response);
            }
        }));
    });

}
