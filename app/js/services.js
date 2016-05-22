(function() {
  'use strict';

  angular.module('mapshare')
    .factory('InitializeService', InitializeService)
    .factory('CountriesService', CountriesService)
    .factory('SampleHttpService', SampleHttpService);

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
      //$rootScope.header = 'Home';
    }

  }

  /**
   * @name countriesService
   * @desc Retrieve countries list
   */

  /* @ngInject */
  function CountriesService($resource, CONFIG, $rootScope) {

    return $resource(CONFIG.BASEURL + 'continents');

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
