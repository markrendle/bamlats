namespace ToDos {

    const module = angular.module('todos.directives', []);

    module.directive('happyFace', () => {
        let d: angular.IDirective = {
            restrict: 'E',
            template: '<i class="fa fa-smile-o"></i>'
        };
        return d;
    });

    module.directive('classSwitch', () => {

        // SEAC
        function link(scope: angular.IScope, element: JQuery, attrs: any) {

            let expr = attrs.classSwitch;

            if (expr[0] !== '[') {
                expr = '[' + expr + ']';
            }

            let array = scope.$eval(expr);

            let done = false;
            for (let item of array) {
                if (typeof item === 'object') {
                    let klass = Object.keys(item)[0];

                    if (done) {
                        element.removeClass(klass);
                    } else {
                        let value = item[klass];
                        if (value) {
                            done = true;
                            element.addClass(klass);
                        } else {
                            element.removeClass(klass);
                        }
                    }
                } else {
                    // Assume item is a string at this point
                    if (done) {
                        element.removeClass(item);
                    } else {
                        element.addClass(item);
                    }
                }
            }

        }

        let cs: angular.IDirective = {
            restrict: 'EAC',
            link: link
        };

        return cs;

    });
}
