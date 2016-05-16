(function() {
  'use strict';

  angular
    .module('mapshare')
    .controller('MainCtrl', MainCtrl)
    .controller('MapsController', MapsController)
    .controller('MapDetailController', MapsController)
    .controller('WishlistController', WishlistController)
    .controller('StatsController', StatsController);

  /* @ngInject */
  function MainCtrl(CountriesService) {

    this.countries = CountriesService.getCountries();
  }

  /* @ngInject */
  function MapsController() {

    // todo
  }

  /* @ngInject */
  function WishlistController() {

    // todo
  }

  /* @ngInject */
  function StatsController() {

    // todo
  }

})();
