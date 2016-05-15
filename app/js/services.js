(function() {
  'use strict';

  angular.module('mapshare')
    .constant("baseURL", "http://localhost:3000/")
    .constant("imageDIR", "images/")
    .service('CountriesService', countriesService);

  function countriesService($resource) {
    this.getCountries = function() {
      var countries = ['Bulgaria','Albania','Estonia'];
      return countries;
    }
  }
})();
