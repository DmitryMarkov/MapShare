(function() {
  'use strict';

  angular.module('mapshare')
    .factory('CountriesService', CountriesService);

  /**
   * @name countriesService
   * @desc Retrieve countries list
   */

  /* @ngInject */
  function CountriesService($resource, CONFIG) {
    var service = {
      getCountries: getCountries
    };

    return service;
    ////

    function getCountries() {
      var countries = ['Bulgaria','Albania','Estonia'];
      return countries;
    }

  }
})();
