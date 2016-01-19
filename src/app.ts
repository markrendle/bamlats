namespace ToDos {

    const deps = [
        "ui.router",
        "todos.root",
        "todos.main",
        "messages"
    ];

    const app = angular.module("todos", deps);

    app.config(($stateProvider: angular.ui.IStateProvider,
                $urlRouterProvider: angular.ui.IUrlRouterProvider,
                $httpProvider: angular.IHttpProvider,
                messageHubProvider: MessageHubProvider) => {

        const apiRegex = /^\/api\//;

        $httpProvider.interceptors.push((messageHub) => ({
            request: (config: angular.IRequestConfig) => {
                if (apiRegex.test(config.url)) {
                    //config.headers["Authorization"] = "Bearer " + localStorage['apiToken'];
                    config.headers["Authorization"] = "SecretSquirrel";
                }

                // HAS TO RETURN THE CONFIG OUT AGAIN
                return config;
            }
        }));

        messageHubProvider.autoDismiss = 1000;

        $stateProvider.state({
            name: "root",
            url: "/",
            views: {
                "": {
                    controller: "RootController",
                    controllerAs: "root",
                    templateUrl: "root/root.html"
                },
                "messages": {
                    controller: "MessagesController",
                    controllerAs: "ctrl",
                    templateUrl: "messages/messages.html"
                }
            }
        });

        $urlRouterProvider.otherwise("/");

    });

}