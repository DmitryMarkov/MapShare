(function() {
  'use strict';

  angular
    .module('mapshare')
    .controller('MainCtrl', MainCtrl)
    .controller('HeaderController', HeaderController)
    .controller('FooterController', FooterController)
    .controller('CountriesController', CountriesController)
    .controller('MapsController', MapsController)
    .controller('MapDetailsController', MapDetailsController)
    .controller('WishlistController', WishlistController)
    .controller('StatsController', StatsController)
    .controller('CountriesAddController', CountriesAddController)
    .controller('AddStyleController', AddStyleController)
    .controller('FinishController', FinishController)
    .controller('AboutController', AboutController)
    .controller('LoginController', LoginController)
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

    //sideNav('hide');


    var vm = this;
    vm.setLang = setLang;
    vm.logout = logout;

    function setLang(lang) {
      $scope.init.language = lang;
      $localStorage.language = lang;
      InitializeService.initialize();
      $state.transitionTo(
        $state.current,
        $state.$current.params,
        { reload: true, inherit: true, notify: true });
    }

    function logout() {
      console.log('logged out');
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
    angular.forEach(values, function(value, key) {
      this[value] = value;
    }, vm.countries);

    vm.continents = continents;
    vm.toggleContinent = toggleContinent;
    vm.addCountries = addCountries;
    vm.chooseStyle = chooseStyle;

    function toggleContinent(cid) {
      vm.show[cid] = !vm.show[cid];
    }

    function addCountries(cid) {
      if (vm.visited.indexOf(cid) == -1) {
        vm.visited.push(cid);
      } else {
        var index = vm.visited.indexOf(cid); // TODO: remove double iSearch
        vm.visited.splice(index, 1);
      }

      $rootScope.user.visited = vm.visited;

      //vm.visited.push(cid);
      // console.log(cid);
      //console.log(vm.countries);
      console.log(vm.visited);
      //console.log($rootScope.user.visited);
    }

    // TODO delete, test-only
    function chooseStyle(visited) {
      console.log($rootScope.user.visited);
    }

  }

  /* @ngInject */
  function AddStyleController($rootScope) {

    var vm = this;
    //vm.continents = continents;
    $rootScope.header = "Choose style";
    //$rootScope.header = $rootScope.init.messages.menu_countries;
    $rootScope.tabSelect(1);

    //console.log($rootScope.user.visited);
  }

  /* @ngInject */
  function FinishController($rootScope) {

    var vm = this;
    //vm.continents = continents;
    $rootScope.header = "Share the map";

    //$rootScope.header = $rootScope.init.messages.menu_countries;
    $rootScope.tabSelect(1);

    //console.log($rootScope.user.visited);
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
  function MapDetailsController($rootScope, $stateParams, continents) {
    $rootScope.header = $rootScope.init.messages.menu_maps;
    $rootScope.tabSelect(2);

    var vm = this;
    vm.continents = continents;
    // TODO: make variables local
    vm.id = $stateParams.id;
    vm.map = null;
    vm.maps = $rootScope.user.maps;
    vm.mapsLength = $rootScope.user.maps.length;

    for(var i = 0; i < vm.mapsLength; ++i) {
      if(vm.maps[i].id == vm.id) {
        vm.map = vm.maps[i];
        break;
      }
    }

    //console.log(vm.map.countries);

    var visitedLength = vm.map.countries.length;
    var visited = vm.map.countries;
    var data = [];

    for(var i = 0; i < visitedLength; ++i) {
      data[i] = {
        "hc-key": visited[i].toLowerCase(),
        "value" : 1
      }
    }

    //console.log(data);

    /* sample data format

    var data = [
        {
            "hc-key": "fo",
            "value": 0
        }
    ]*/

    $('#container').highcharts('Map', {

        title : {
            text : 'Visited countries'
        },

        subtitle : {
            text : 'User: test@test.com'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0,
            max: 1
        },

        series : [{
            data : data,
            mapData: Highcharts.maps['custom/world-robinson-lowres'],
            joinBy: 'hc-key',
            name: 'Visited',
            states: {
                hover: {
                    color: '#41CD9e'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            }
        }]
    });






    //vm.user = user;

    //console.log(user);
  }

  /* @ngInject */
  function WishlistController($rootScope, currentUser) {
    $rootScope.header = $rootScope.init.messages.menu_wishlist;
    $rootScope.tabSelect(3);

    var vm = this;
    vm.wishlist = $rootScope.user.wishlist;
    vm.wishlist = $rootScope.user.visited;

    vm.doVisited = doVisited;
    vm.justDelete = justDelete;

    function doVisited(visited) {
      console.log('wish was released');
      vm.visited.push(visited);
      vm.wishlist.splice(vm.wishlist.indexOf(visited),1);

      //...
      $rootScope.user.wishlist = vm.wishlist;
      $rootScope.user.visited = vm.visited;
      currentUser.put($rootScope.user);

    }

    function justDelete(deleted) {
      console.log('wish was deleted');
      vm.wishlist.splice(vm.wishlist.indexOf(deleted),1);

    }
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

    var vm = this;
    vm.feedbackData = {
      email: '',
      password: '',
      textarea: ''
    };

    vm.doFeedback = doFeedback;

    function doFeedback() {
      console.log('do feedback');
    }
  }

  /* @ngInject */
  function LoginController($rootScope) {
    $rootScope.header = $rootScope.init.messages.side_login;
    $rootScope.tabSelect(0);

    var vm = this;
    vm.loginData = {
      email: '',
      password: ''
    };
    vm.rememberMe = true;

    vm.doLogin = doLogin;
    vm.openRegister = openRegister;

    function doLogin() {
      console.log('do login');
    }

    function openRegister() {
      console.log('open register');
    }

  }

  /* @ngInject */
  function SettingsController($rootScope) {
    $rootScope.header = $rootScope.init.messages.side_settings;
    $rootScope.tabSelect(0);

    var vm = this;
    vm.settingsData = {
      name: '',
      country: '',
      language: true
    }

    vm.setLanguage = setLanguage;

    function setLanguage(lang) {
      console.log(lang);
    }

    //$('.mdb-select').material_select();

  }

  /* @ngInject */
  function AboutController($rootScope, CONFIG) {
    var vm = this;

    $rootScope.header = $rootScope.init.messages.side_about;
    $rootScope.tabSelect(0);

    vm.version = CONFIG.APPVER;
  }

})();
