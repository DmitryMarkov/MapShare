(function () {
  'use strict';

  angular
    .module('mapshare', [
      'ui.router',
      'ngResource'
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider

        // route for the home page
        .state('app', {
          url: '/',
          views: {
            'header': {
              templateUrl : 'views/header.html'
            },
            'content': {
              templateUrl : 'views/home.html',
              controller  : 'MainCrtl',
              resolve : {}
            },
            'footer': {
              templateUrl : 'views/footer.html'
            }
          }

        })
        // route for the page
        .state('app.page', {
          url: 'page',
          views: {
            'content@': {
              templateUrl : 'views/services.html',
              controller  : 'PageController'
            }
          }
        })
        // route for the current page
        .state('app.pages', {
          url: 'page/:id',
          views: {
            'content@': {
              templateUrl : 'views/services.html',
              controller  : 'PageController'
            }
          }
        });

      $urlRouterProvider.otherwise('/');
    });
})();





