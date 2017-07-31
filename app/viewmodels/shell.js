define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Home', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'Cadastre-se', moduleId: 'viewmodels/sign_up', nav: false },
                { route: 'Login', moduleId: 'viewmodels/sign_in', nav: false },
                { route: 'Profile', moduleId: 'viewmodels/profile', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});