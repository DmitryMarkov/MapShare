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
    .controller('CountriesAddController', CountriesAddController)
    .controller('AboutController', AboutController)
    .controller('SettingsController', SettingsController)
    .controller('FeedbackController', FeedbackController);

  /* @ngInject */
  function MainCtrl($rootScope) {
    var vm = this;
    vm.countries = [];
    $rootScope.header = '';

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
      $state.transitionTo(
        $state.current,
        $state.$current.params,
        { reload: true, inherit: true, notify: true });
    }


  }

  /* @ngInject */
  function FooterController($scope) {
    var vm = this,
        language = $scope.init.language;
  }

  /* @ngInject */
  function CountriesController($rootScope, continents) {

    var vm = this;
    vm.continents = continents;

    $rootScope.header = $rootScope.init.messages.menu_countries;
  }

  /* @ngInject */
  function CountriesAddController($rootScope, continents) {

    $rootScope.header = $rootScope.init.messages.header_addcountries;

    var vm = this;
    vm.show = [];
    vm.continents = continents;
    vm.toggleContinent = toggleContinent;

    function toggleContinent(cid) {
      vm.show[cid] = !vm.show[cid];
      console.log(cid);
      console.log(vm.show[cid]);
    }

  }

  /* @ngInject */
  function MapsController($rootScope) {
    $rootScope.header = $rootScope.init.messages.menu_maps;
  }

  /* @ngInject */
  function WishlistController($rootScope) {
    $rootScope.header = $rootScope.init.messages.menu_wishlist;
  }

  /* @ngInject */
  function StatsController($rootScope) {
    // initialize charts
    $('.min-chart#chart-sales').easyPieChart({
        barColor: "#41cd9e",
        onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });

    $rootScope.header = $rootScope.init.messages.menu_stats;
  }


  /* @ngInject */
  function FeedbackController($rootScope) {
    $rootScope.header = $rootScope.init.messages.side_feedback;
  }

  /* @ngInject */
  function SettingsController($rootScope) {
    $rootScope.header = $rootScope.init.messages.side_settings;

  }

  /* @ngInject */
  function AboutController($rootScope, CONFIG) {
    var vm = this;

    $rootScope.header = $rootScope.init.messages.side_about;

    vm.version = CONFIG.APPVER;
  }

})();
