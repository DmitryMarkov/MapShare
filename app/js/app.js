(function () {
  'use strict';

  angular
    .module('mapshare', [
      'ui.router',
      'ngResource'
    ])
    .config(routeConfig);

  /* @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      // route for the home page
      .state('app', {
        url: '/',
        views: {
          'header': {
            templateUrl : 'templates/_header.html'
          },
          'content': {
            templateUrl : 'templates/home.html',
            controller  : 'MainCtrl',
            resolve : {}
          },
          'footer': {
            templateUrl : 'templates/_footer.html'
          }
        }
      })
      // route for maps
      .state('app.maps', {
        url: 'maps',
        views: {
          'content@': {
            //templateUrl : 'views/maps.html',
            template: '<p>This is maps page</p>',
            controller  : 'MapsController'
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
            //templateUrl : 'views/wishlist.html',
            template: '<p>This is wishlist</p>',
            controller  : 'WishlistController'
          }
        }
      })
      // route for stats
      .state('app.stats', {
        url: 'stats',
        views: {
          'content@': {
            //templateUrl : 'views/stats.html',
            template: '<p>This is stats</p>',
            controller  : 'StatsController'
          }
        }
      })
      // route for logout
      .state('app.logout', {
        url: 'logout',
        views: {
          'content@': {
            //templateUrl : 'views/stats.html',
            template: '<p>You have been logged off.</p>',
            controller  : 'StatsController'
          }
        }
      })
      // route for settings
      .state('app.settings', {
        url: 'settings',
        views: {
          'content@': {
            //templateUrl : 'views/stats.html',
            template: '<p>This is settings</p>',
            controller  : 'StatsController'
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
            //templateUrl : 'views/stats.html',
            template: '<p>Add countries</p>',
            controller  : 'StatsController'
          }
        }
      });

    $urlRouterProvider
      .otherwise('/'); // todo: 404 page
  }
})();





