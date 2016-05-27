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
    $rootScope.tabSelect(0);

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
    var vm = this;

    //vm.tab;
    //vm.select = select;
    //vm.isSelected = isSelected;
  }

  /* @ngInject */
  function CountriesController($rootScope, continents) {

    var vm = this;
    vm.continents = continents;

    $rootScope.header = $rootScope.init.messages.menu_countries;
    $rootScope.tabSelect(1);
  }

  /* @ngInject */
  function CountriesAddController($rootScope, continents) {

    $rootScope.header = $rootScope.init.messages.header_addcountries;
    $rootScope.tabSelect(1);

    var vm = this;
    vm.show = [];
    vm.countries = {};
    vm.visited = [];


    var values = vm.visited = $rootScope.user.visited;
    //var log = {};
    angular.forEach(values, function(value, key) {
      this[value] = value;
    }, vm.countries);
    //console.log(vm.countries);
      //console.log(vm.visited);

    vm.continents = continents;
    vm.toggleContinent = toggleContinent;
    vm.addCountries = addCountries;

    function toggleContinent(cid) {
      vm.show[cid] = !vm.show[cid];
    }

    function addCountries(cid) {
      if (vm.visited.indexOf(cid) == -1) {
        vm.visited.push(cid);
      } else {
        var index = vm.visited.indexOf(cid);
        vm.visited.splice(index, 1);
      }

      //vm.visited.push(cid);
     // console.log(cid);
      //console.log(vm.countries);
      //console.log(vm.visited);
      //console.log($rootScope.user.visited);
    }

  }

  /* @ngInject */
  function MapsController($rootScope, continents) {
    $rootScope.header = $rootScope.init.messages.menu_maps;
    $rootScope.tabSelect(2);

    var vm = this;
    vm.continents = continents;
    //vm.user = user;

    //console.log(user);
  }

  /* @ngInject */
  function WishlistController($rootScope) {
    $rootScope.header = $rootScope.init.messages.menu_wishlist;
    $rootScope.tabSelect(3);
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
    $rootScope.tabSelect(4);
  }


  /* @ngInject */
  function FeedbackController($rootScope) {
    $rootScope.header = $rootScope.init.messages.side_feedback;
    $rootScope.tabSelect(0);
  }

  /* @ngInject */
  function SettingsController($rootScope) {
    $rootScope.header = $rootScope.init.messages.side_settings;
    $rootScope.tabSelect(0);

  }

  /* @ngInject */
  function AboutController($rootScope, CONFIG) {
    var vm = this;

    $rootScope.header = $rootScope.init.messages.side_about;
    $rootScope.tabSelect(0);

    vm.version = CONFIG.APPVER;
  }

})();
