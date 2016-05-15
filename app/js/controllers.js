(function() {
  'use strict';

  angular
    .module('mapshare')
    .controller('MainCtrl', MainCtrl);

  /* @ngInject */
  function MainCtrl(CountriesService) {

    this.countries = CountriesService.getCountries();
  }

})();
