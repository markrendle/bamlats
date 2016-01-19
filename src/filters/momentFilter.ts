namespace ToDos {

    const filterModule = angular.module('todos.filters', []);

    export class LocaleProvider {
        public override: string;

        public $get() {
            return () => this.override || navigator.language || 'en-GB';
        }
    }

    export type LocaleService = () => string;

    filterModule.provider('locale', LocaleProvider);

    filterModule.filter('moment', (locale: LocaleService) => {

        //console.log(locale());

        return function momentFilter(input, format) {

            if (format === 'short') {
                if (locale() === 'en-US') {
                    format = 'MM/DD/YYYY';
                } else {
                    format = 'DD/MM/YYYY';
                }
                return moment.utc(input, '').format(format);
            } else {
                return moment.utc(input, '').format('dd MMMM yyyy');
            }

        }

    });

}
