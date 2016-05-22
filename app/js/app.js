(function () {
  'use strict';

  angular
    .module('mapshare', [
      'ui.router',
      'ngStorage',
      'ngResource',
      'ngSanitize',
      'ngAnimate'
    ])
    .run(initFn)
    .config(routeConfig);

  /* @ngInject */
  function initFn(InitializeService, AuthorizeService) {

    AuthorizeService.initialize();
    // maybbe put user in scope?
    InitializeService.initialize();

  }

  /* @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      // route for the home page
      .state('app', {
        url: '/',
        views: {
          'header': {
            templateUrl : 'templates/_header.html',
            controller  : 'HeaderController',
            controllerAs: 'vm'
          },
          'content': {
            templateUrl : 'templates/home.html',
            controller  : 'MainCtrl',
            resolve : {}
          },
          'footer': {
            templateUrl : 'templates/_footer.html',
            controller  : 'FooterController',
            controllerAs: 'vm'
          }
        }
      })
      // route for countries
      .state('app.countries', {
        url: 'countries',
        views: {
          'content@': {
            templateUrl : 'templates/countries.tmpl.html',
            controller  : 'CountriesController',
            controllerAs: 'vm',
            resolve: {
              continents: ['CountriesService', function(CountriesService) {
                return CountriesService.query();
              }]
            }
          }
        }
      })
      // route for maps
      .state('app.maps', {
        url: 'maps',
        views: {
          'content@': {
            templateUrl : 'templates/maps.tmpl.html',
            controller  : 'MapsController',
            controllerAs: 'vm',
            resolve: {
              continents: ['CountriesService', function(CountriesService) {
                return CountriesService.query();
              }]
            }
          }
        }
      })
      // route for selected map
      .state('app.mapdetails', {
        url: 'maps/:id',
        views: {
          'content@': {
            //templateUrl : 'views/mapdetails.html',
            template: '<p>This is map\'s detail page</p>',
            controller  : 'MapDetailController'
          }
        }
      })
      // route for wishlist
      .state('app.wishlist', {
        url: 'wishlist',
        views: {
          'content@': {
            templateUrl : 'templates/wishlist.tmpl.html',
            controller  : 'WishlistController',
            controllerAs: 'vm'
          }
        }
      })
      // route for stats
      .state('app.stats', {
        url: 'stats',
        views: {
          'content@': {
            templateUrl : 'templates/stats.tmpl.html',
            controller  : 'StatsController',
            controllerAs: 'vm'
          }
        }
      })
      // route for logout
      .state('app.logout', {
        url: 'logout',
        views: {
          'content@': {
            //templateUrl : 'views/stats.html',
            template: '<p>You have been logged off.</p>'
          }
        }
      })
      // route for settings
      .state('app.settings', {
        url: 'settings',
        views: {
          'content@': {
            templateUrl : 'templates/settings.tmpl.html',
            controller  : 'SettingsController',
            controllerAs: 'vm'
          }
        }
      })
      // route for feedback
      .state('app.feedback', {
        url: 'feedback',
        views: {
          'content@': {
            templateUrl : 'templates/feedback.html',
            controller  : 'FeedbackController',
            controllerAs: 'vm'
          }
        }
      })
      // route for about page
      .state('app.about', {
        url: 'about',
        views: {
          'content@': {
            templateUrl : 'templates/about.html',
            controller  : 'AboutController',
            controllerAs: 'vm'
          }
        }
      })
      // route for add countries
      .state('app.addcountries', {
        url: 'addcountries',
        views: {
          'content@': {
            templateUrl : 'templates/countries-add.tmpl.html',
            controller  : 'CountriesAddController',
            controllerAs: 'vm',
            resolve: {
              continents: ['CountriesService', function(CountriesService) {
                return CountriesService.query();
              }]
            }
          }
        }
      });

    $urlRouterProvider
      .otherwise('/'); // todo: 404 page
  }
})();





