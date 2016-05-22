(function() {
  'use strict';

  angular.module('mapshare')
    .factory('AuthorizeService', AuthorizeService)
    .factory('InitializeService', InitializeService)
    .factory('CountriesService', CountriesService)
    .factory('UsersService', UsersService)
    .factory('MapsService', MapsService)
    .factory('SampleHttpService', SampleHttpService);

  /**
   * @name AuthorizeService
   * @desc Retrieve users
   */

  /* @ngInject */
  function AuthorizeService($resource, CONFIG, $localStorage, $rootScope, $http) {
    var service = {
      initialize: initialize
    };

    return service;
    ////

    function initialize() {

      var user = {};

      // TODO: restore user session
      var userId = 1;

      //TODO: throw exseption if not found
      $http.get(CONFIG.BASEURL + 'users/' + userId)
       .then(function(res) {
          user = res.data;
          $rootScope.user = user;
        });
    }

  }

  /**
   * @name InitializeService
   * @desc Retrieve startup data
   */

  /* @ngInject */
  function InitializeService($resource, CONFIG, $localStorage, $rootScope, $http) {
    var service = {
      initialize: initialize
    };

    return service;
    ////

    function initialize() {

      var init = {};

      //TODO: make a check of imported value
      init.language = $localStorage.language || 'EN';

      //TODO: throw exseption if not found
      $http.get('lang/' + init.language + '.json')
        .then(function(res) {
          init.messages = res.data;
          $rootScope.init = init;
      });


    $rootScope.tabSelect = function (tab) {
      $rootScope.tab = tab;
    }

    $rootScope.isSelected = function (tab) {
      return ($rootScope.tab === tab);
    }
    }

  }

  /**
   * @name CountriesService
   * @desc Retrieve countries list
   */

  /* @ngInject */
  function CountriesService($resource, CONFIG, $rootScope) {

    return $resource(CONFIG.BASEURL + 'continents');

  }

  /**
   * @name UsersService
   * @desc Retrieve user info
   */

  /* @ngInject */
  function UsersService($resource, CONFIG, $rootScope) {

    return $resource(CONFIG.BASEURL + 'users/:id', null, {
      'update': {
          method: 'PUT'
      }
  });

  }

  /**
   * @name MapsService
   * @desc Retrieve map lists
   */

  /* @ngInject */
  function MapsService($resource, CONFIG, $rootScope) {

    return $resource(CONFIG.BASEURL + 'maps');

  }

  /* @ngInject */
  function CountriesServiceOld($resource, CONFIG, $http, $rootScope) {
    var service = {
      getCountries: getCountries
    };

    return service;
    ////

    function getCountries() {
      //var countries = ['Bulgaria','Albania','Estonia'];
      var earth = {};

      $http.get(CONFIG.BASEURL + $rootScope.init.language + '/1')
       .then(function(res) {
          earth = res.data;
          console.log(res.data.continents);
        });
      console.log(earth);
      return earth;
    }
  }

  /* @ngInject */
  function SampleHttpService($q, $http, $log, CONFIG) {
    var service = {
      getCustomer: getCustomer
    };

    return service;
    ////


    function getCustomer(id) {
      return $http.get(CONFIG.BASEURL + '/api/customer/' + id)
          .then(getCustomerComplete)
          .catch(getCustomerFailed);

      function getCustomerComplete(data, status, headers, config) {
          return data.data;
      }

      function getCustomerFailed(e) {
          var newMessage = 'XHR Failed for getCustomer'
          if (e.data && e.data.description) {
            newMessage = newMessage + '\n' + e.data.description;
          }
          e.data.description = newMessage;
          $log.error(newMessage);
          return $q.reject(e);
      }
    }
  }
})();
