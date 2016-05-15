(function() {
  'use strict';

  angular
    .module('mapshare')
    .controller('MainCtrl', MainCtrl);

  /* @ngInject */
  function MainCtrl($scope, CountriesService) {

    this.countries = CountriesService.getCountries();
  }

})();
