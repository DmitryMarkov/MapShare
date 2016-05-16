(function() {
  'use strict';

  angular
    .module('mapshare')
    .controller('MainCtrl', MainCtrl)
    .controller('MapsController', MapsController)
    .controller('MapDetailController', MapsController)
    .controller('WishlistController', WishlistController)
    .controller('StatsController', StatsController)
    .controller('AboutController', AboutController)
    .controller('FeedbackController', FeedbackController);

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


  /* @ngInject */
  function FeedbackController() {

    // todo
  }

  /* @ngInject */
  function AboutController(CONFIG, MESSAGES) {
    var vm = this;

    vm.about = MESSAGES.EN.about; // TODO: replace 'EN' with actual lang
    vm.version = CONFIG.APPVER;
  }

})();
