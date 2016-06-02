// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ionic.service.core',
  'mapshare.controllers',
  'mapshare.services'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'countries-tab': {
        templateUrl: 'templates/home.html'
      }
    }
  })
  /*.state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })*/
  /*.state('tabs.countries', {
    url: "/countries",
    views: {
      'countries-tab': {
        templateUrl: "templates/countries.html",
        controller: 'CountriesController'
      }
    }
  })
  .state('tabs.maps', {
    url: "/maps",
    views: {
      'mainContent': {
        templateUrl: "templates/maps.html",
        controller: 'MapsController'
      }
    }
  })*/
  .state('app.countries', {
      url: '/countries',
      views: {
        'countries-tab': {
          templateUrl: 'templates/countries.html',
          controller: 'CountriesController',
          controllerAs: 'vm'
        }
      }
    })
    .state('app.maps', {
      url: '/maps',
      views: {
        'maps-tab': {
          templateUrl: 'templates/maps.html',
          controller: 'MapsController',
          controllerAs: 'vm'
        }
      }
    })

  .state('app.wishlist', {
    url: '/wishlist',
    views: {
      'wishlist-tab': {
        templateUrl: 'templates/wishlist.html',
        controller: 'WishlistController',
        controllerAs: 'vm'
      }
    }
  })

  .state('app.stats', {
    url: '/stats',
    views: {
      'stats-tab': {
        templateUrl: 'templates/stats.html',
        controller: 'StatsController',
        controllerAs: 'vm'
      }
    }
  })
   .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'countries-tab': {
        templateUrl: "templates/stats.html"
      }
    }
  })
  .state('app.feedback', {
    url: '/feedback',
    views: {
      'countries-tab': {
        templateUrl: 'templates/feedback.html',
        controller: 'StatsController',
        controllerAs: 'vm'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'countries-tab': {
        templateUrl: 'templates/about.html',
        controller: 'StatsController',
        controllerAs: 'vm'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'countries-tab': {
        templateUrl: 'templates/settings.html',
        controller: 'StatsController',
        controllerAs: 'vm'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/countries');
});
