(function() {
  'use strict';

  angular
    .module('mapshare')
    .controller('MainCtrl', MainCtrl)
    .controller('HeaderController', HeaderController)
    .controller('FooterController', FooterController)
    .controller('CountriesController', CountriesController)
    .controller('MapsController', MapsController)
    .controller('MapDetailController', MapsController)
    .controller('WishlistController', WishlistController)
    .controller('StatsController', StatsController)
    .controller('AboutController', AboutController)
    .controller('SettingsController', SettingsController)
    .controller('FeedbackController', FeedbackController);

  /* @ngInject */
  function MainCtrl() {
    var vm = this;
    vm.countries = [];

    activate();

    function activate() {


      return null;
    }
  }

  /* @ngInject */
  function HeaderController($scope, $state, $localStorage, InitializeService) {

    // Initialize collapse button
    $(".button-collapse").sideNav({
        menuWidth: 240, // Default is 240
        closeOnClick: true // Closes side-nav on <a> clicks
      });

    var vm = this;
    vm.setLang = setLang;

    function setLang(lang) {
      $scope.init.language = lang;
      $localStorage.language = lang;
      InitializeService.initialize();
      $state.transitionTo($state.current, $state.$current.params, { reload: true, inherit: true, notify: true });
    }


  }

  /* @ngInject */
  function FooterController($scope) {
    var vm = this,
        language = $scope.init.language;
  }

  /* @ngInject */
  function CountriesController($scope, continents) {

    var vm = this;
    vm.continents = continents;
    $scope.cnt = continents;
    console.log(continents);
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
    // initialize charts
    $('.min-chart#chart-sales').easyPieChart({
        barColor: "#41cd9e",
        onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });

    // todo
  }


  /* @ngInject */
  function FeedbackController() {

    // todo
  }

  /* @ngInject */
  function SettingsController() {

    // todo
  }

  /* @ngInject */
  function AboutController($scope, CONFIG) {
    var vm = this,
        language = $scope.init.language;

    vm.version = CONFIG.APPVER;
  }

})();
