(function () {
  'use strict';

  angular
    .module('mapshare', [
      'ui.router',
      'ngStorage',
      'ngResource',
      'ngSanitize',
      'ngAnimate',
      'easypiechart'
    ])
    .run(initFn)
    .config(routeConfig);

  /* @ngInject */
  function initFn(AuthorizeService, InitializeService) {

    AuthorizeService.initialize();

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
            controller  : 'MainCtrl'
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
            controllerAs: 'vm'
          }
        }
      })
      // route for selected map
      .state('app.mapdetails', {
        url: 'maps/:id',
        views: {
          'content@': {
            templateUrl : 'templates/map-details.tmpl.html',
            controller  : 'MapDetailsController',
            controllerAs: 'vm'
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
            controllerAs: 'vm',
            resolve: {
              continents: ['CountriesService', function(CountriesService) {
                return CountriesService.query();
              }]
            }
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
      .state('app.login', {
        url: 'login',
        views: {
          'content@': {
            templateUrl : 'templates/login.tmpl.html',
            controller  : 'LoginController',
            controllerAs: 'vm'
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
      })
      // route for choose style
      .state('app.addstyle', {
        url: 'addstyle',
        views: {
          'content@': {
            templateUrl : 'templates/add-style.tmpl.html',
            controller  : 'AddStyleController',
            controllerAs: 'vm'
          }
        }
      })
      // route for finish
      .state('app.finishmap', {
        url: 'finishmap',
        views: {
          'content@': {
            templateUrl : 'templates/finish-map.tmpl.html',
            controller  : 'FinishController',
            controllerAs: 'vm'
          }
        }
      });

    $urlRouterProvider
      .otherwise('/'); // todo: 404 page
  }
})();





