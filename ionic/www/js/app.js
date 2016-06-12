// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ionic.service.core',
  'ngResource',
  'ngStorage',
  'easypiechart',
  'mapshare.controllers',
  'mapshare.services'
])
.constant("CONFIG", {

  "APPNAME"   : "MapShare",
  "APPVER"    : "0.1.0",
  "BASEURL"   : "http://localhost:3030/",
  "IMAGEDIR"  : "images/",
  "DOCDIR"    : "docs/"
})

.run(function($ionicPlatform, $rootScope, AuthorizeService, InitializeService) {


  AuthorizeService.initialize();

  InitializeService.initialize();

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

    if($rootScope.user) {
      if($rootScope.user.visited.length) {
        $state.go("app.countries", {}, {})
      }
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
    controller: 'AppCtrl',
    controllerAs: 'vm'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'countries-tab': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.countries', {
      url: '/countries',
      views: {
        'countries-tab': {
          templateUrl: 'templates/countries.html',
          controller: 'CountriesController',
          controllerAs: 'vm',
          resolve: {
            continents: ['CountriesService', function(CountriesService) {
              return CountriesService.query();
            }]
          }
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

  .state('app.mapdetails', {
    url: 'maps/:id',
    views: {
      'maps-tab': {
        templateUrl : 'templates/map-details.html',
        controller  : 'MapDetailsController',
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
        controllerAs: 'vm',
        resolve: {
          continents: ['CountriesService', function(CountriesService) {
            return CountriesService.query();
          }]
        }
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

  // route for add countries
  .state('app.addcountries', {
    url: 'addcountries',
    views: {
      'countries-tab': {
        templateUrl : 'templates/add-countries.html',
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
    //cache: false,
    url: 'addstyle',
    views: {
      'countries-tab': {
        templateUrl : 'templates/add-style.html',
        controller  : 'AddStyleController',
        controllerAs: 'vm'
      }
    }
  })
  // route for finish
  .state('app.finishmap', {
    url: 'finishmap',
    views: {
      'countries-tab': {
        templateUrl : 'templates/finish-map.html',
        controller  : 'FinishController',
        controllerAs: 'vm'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/countries');
});
