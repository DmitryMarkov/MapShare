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
    vm.visited = $rootScope.user.visited;

    $rootScope.header = $rootScope.init.messages.menu_countries;
    $rootScope.tabSelect(1);


    vm.checkCountry = checkCountry;

    function checkCountry(cid) {

      if(vm.visited.indexOf(cid) != -1) {
        return true;
      }
    }

  }

  /* @ngInject */
  function CountriesAddController($rootScope, continents, UsersService) {

    $rootScope.header = $rootScope.init.messages.header_addcountries;
    $rootScope.tabSelect(1);

    var vm = this;
    vm.show = [];
    vm.countries = {};
    vm.visited = [];
    vm.wishlist = $rootScope.user.wishlist;
    vm.isWishlisted = {};

    var values = vm.visited = $rootScope.user.visited;
    angular.forEach(values, function(value, key) {
      this[value] = value;
    }, vm.countries);

    angular.forEach(vm.wishlist, function(value, key) {
      this[value] = value;
    }, vm.isWishlisted);

    vm.continents = continents;
    vm.toggleContinent = toggleContinent;
    vm.addCountries = addCountries;
    vm.addWishlist = addWishlist;

    function toggleContinent(cid) {
      vm.show[cid] = !vm.show[cid];
    }

    function addCountries(cid) {
      var countryIndex = vm.visited.indexOf(cid);
      if (countryIndex == -1) {
        vm.visited.push(cid);
        if (vm.wishlist.indexOf(cid) != -1) {
          vm.wishlist.splice(vm.wishlist.indexOf(cid), 1);
          vm.isWishlisted[cid] = undefined;
          console.log(vm.wishlist);
        }
      }
      else {
        var index = countryIndex;
        vm.visited.splice(index, 1);
      }
      console.log(vm.visited);
      $rootScope.user.visited = vm.visited;

      UsersService.update({id: $rootScope.user.id}, $rootScope.user);
    }

    function addWishlist(cid) {
      var wishlistIndex = vm.wishlist.indexOf(cid);

      if (wishlistIndex == -1) {
        vm.wishlist.push(cid);
        vm.isWishlisted[cid] = cid;
      }
      else {
        var index = wishlistIndex;
        vm.wishlist.splice(index, 1);
        vm.isWishlisted[cid] = undefined;
      }
      console.log(vm.isWishlisted);


      $rootScope.user.wishlist = vm.wishlist;
      UsersService.update({id: $rootScope.user.id}, $rootScope.user);
    }

  }

  /* @ngInject */
  function AddStyleController($rootScope, $state) {

    $rootScope.header = $rootScope.init.messages.header_addstyles;
    $rootScope.tabSelect(1);

    var vm = this;
    $rootScope.init.theme = $rootScope.init.theme || 0;

    vm.setTheme = setTheme;
    //vm.countries = $rootScope.user.visited;
    //vm.wishlist = $rootScope.user.wishlist;

    // TODO: save visited to DB

    var visitedLength =  $rootScope.user.visited.length;
    var visited =  $rootScope.user.visited;
    var visitedData = [];

    var wishlistLength = $rootScope.user.wishlist.length;
    var wishlist = $rootScope.user.wishlist;
    var wishlistData = [];

    for(var i = 0; i < visitedLength; ++i) {
      visitedData[i] = {
        "code": visited[i]
      }
    }

    for(var i = 0; i < wishlistLength; ++i) {
      wishlistData[i] = {
        "code": wishlist[i]
      }
    }

    function setTheme(theme) {
      $rootScope.init.theme = theme;
      if (theme == 2) Highcharts.setOptions(Highcharts.theme2);
      else if (theme == 3) Highcharts.setOptions(Highcharts.theme3);
      else Highcharts.setOptions(Highcharts.theme1);
      $state.go($state.current, {}, { reload: true, inherit: true, notify: true });
    }

    Highcharts.theme1 = {
      colors: ["#1c85ee", "#41CD9e", "#DF5353"],
      plotOptions: {
        map: {
          nullColor: "#f8f8f8"
        }
      },
      chart: {
        plotBackgroundImage: undefined
      }
    };

    Highcharts.theme2 = {
      colors: ["#db0505", "#55BF3B", "#DF5353"],
      plotOptions: {
        map: {
          nullColor: "#eeee05"
        }
      },
      chart: {
        plotBackgroundImage: undefined
      }
    };

    Highcharts.theme3 = {
      colors: ['#41CD9e', '#50B432', '#ED561B'],
      plotOptions: {
        map: {
          nullColor: "#e5dbc8"
        }
      },
      chart: {
        plotBackgroundImage: 'images/wave-pattern.jpg'
      }
    };

    // Apply the theme
    if (!$rootScope.init.theme) {
      Highcharts.setOptions(Highcharts.theme1);
      $rootScope.init.theme = 1;
    }

    $('#container').highcharts('Map', {

      title : {
          text : ''
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: false
      },

      mapNavigation: {
        enabled: false,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
      },

      exporting: {
        enabled: false
      },

      plotOptions: {
        map: {
          joinBy: ['iso-a2', 'code'],
          dataLabels: {
            enabled: false
          },
          mapData: Highcharts.maps['custom/world-robinson'],
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b>: {series.name}'
          }
        }
      },

      series : [{
        name: $rootScope.init.messages.countries_visited,
        data: visitedData
        }
      ]
    });

  }

  /* @ngInject */
  function FinishController($rootScope, $scope, UsersService) {

    $rootScope.header = $rootScope.init.messages.header_finish;
    $rootScope.tabSelect(1);

    if ($rootScope.init.theme) {

      // object to save
      var map = {};

      // generates random ID (10 characters)
      var result = '';
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = 10; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];

      map.id = result;
      map.date = new Date().toISOString();
      map.countries = $rootScope.user.visited;
      map.wishlist = $rootScope.user.wishlist;
      map.styleId = $rootScope.init.theme;

      //TODO: save PNG map to server and paste link to map object

      $rootScope.user.maps.push(map);

      UsersService.update({id: $rootScope.user.id}, $rootScope.user);

      if ($rootScope.init.theme == 2)
        Highcharts.setOptions(Highcharts.theme2);
      else if ($rootScope.init.theme == 3)
        Highcharts.setOptions(Highcharts.theme3);
      else
        Highcharts.setOptions(Highcharts.theme1);
    }

    $('.show-popover').popover({
      html: true,
      title: '',
      template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-content"></div></div>',
      content: 'http://mapshare.me/#/maps/' + map.id,
      trigger: 'click'
    })

    $scope.$on("$locationChangeStart", function() {
      $('.show-popover').popover('hide');
    });

    var vm = this;

    vm.saveMap = saveMap;
    vm.copyLink = copyLink;

    function saveMap() {
      var chart = $('#container').highcharts();
      chart.exportChart();
    }

    // TODO: copy to clipboard
    function copyLink(url) {
      console.log(url);
    }

    console.log($rootScope.init.theme);
    console.log(Highcharts.theme1);

    var visitedLength =  $rootScope.user.visited.length;
    var visited =  $rootScope.user.visited;
    var visitedData = [];

    for(var i = 0; i < visitedLength; ++i) {
      visitedData[i] = {
        "code": visited[i]
      }
    }

    $('#container').highcharts('Map', {

      title : {
          text : ''
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: false
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
      },

      exporting: {
        enabled: false
      },

      plotOptions: {
        map: {
          joinBy: ['iso-a2', 'code'],
          dataLabels: {
            enabled: false
          },
          mapData: Highcharts.maps['custom/world-robinson'],
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b>: {series.name}'
          }

        }
      },

      series : [{
        name: $rootScope.init.messages.countries_visited,
        data: visitedData
        }
      ]
    });

  }

  /* @ngInject */
  function MapsController($rootScope) {

    $rootScope.header = $rootScope.init.messages.menu_maps;
    $rootScope.tabSelect(2);

    var vm = this;

  }

  /* @ngInject */
  function MapDetailsController($rootScope, $stateParams) {
    $rootScope.header = $rootScope.init.messages.menu_maps;
    $rootScope.tabSelect(2);

    // TODO: change OG in header (meta)
    // http://www.michaelbromley.co.uk/blog/171/enable-rich-social-sharing-in-your-angularjs-app
    // or https://github.com/tinusn/ui-router-metatags

    var vm = this;
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

    var visitedLength = vm.map.countries.length;
    var visited = vm.map.countries;
    var visitedData = [];
    var theme = vm.map.styleId;

    // TODO: get rid of duplicate theme setting
    Highcharts.theme1 = {
      colors: ["#1c85ee", "#41CD9e", "#DF5353"],
      plotOptions: {
        map: {
          nullColor: "#f8f8f8"
        }
      },
      chart: {
        plotBackgroundImage: undefined
      }
    };

    Highcharts.theme2 = {
      colors: ["#db0505", "#55BF3B", "#DF5353"],
      plotOptions: {
        map: {
          nullColor: "#eeee05"
        }
      },
      chart: {
        plotBackgroundImage: undefined
      }
    };

    Highcharts.theme3 = {
      colors: ['#41CD9e', '#50B432', '#ED561B'],
      plotOptions: {
        map: {
          nullColor: "#e5dbc8"
        }
      },
      chart: {
        plotBackgroundImage: 'images/wave-pattern.jpg'
      }
    };

    if (theme == 2) Highcharts.setOptions(Highcharts.theme2);
    else if (theme == 3) Highcharts.setOptions(Highcharts.theme3);
    else Highcharts.setOptions(Highcharts.theme1);

    for(var i = 0; i < visitedLength; ++i) {
      visitedData[i] = {
        "code": visited[i]
      }
    }

    $('#container').highcharts('Map', {

      title : {
          text : ''
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: false
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
      },

      exporting: {
        enabled: true
      },

      plotOptions: {
        map: {
          joinBy: ['iso-a2', 'code'],
          dataLabels: {
            enabled: false
          },
          mapData: Highcharts.maps['custom/world-robinson'],
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b>: {series.name}'
          }

        }
      },

      series : [{
        name: $rootScope.init.messages.countries_visited,
        data: visitedData
        }
      ]
    });
  }

  /* @ngInject */
  function WishlistController($rootScope, continents, UsersService) {
    $rootScope.header = $rootScope.init.messages.menu_wishlist;
    $rootScope.tabSelect(3);

    var vm = this;
    vm.wishlist = $rootScope.user.wishlist;
    vm.visited = $rootScope.user.visited;
    vm.continents = continents;
    vm.wish = [];

    console.log(vm.wishlist);

    vm.doVisited = doVisited;
    vm.justDelete = justDelete;
    vm.checkCountry = checkCountry;

    function doVisited(visited) {
      vm.visited.push(visited);
      vm.wishlist.splice(vm.wishlist.indexOf(visited),1);


      $rootScope.user.wishlist = vm.wishlist;
      $rootScope.user.visited = vm.visited;
      UsersService.update({id: $rootScope.user.id}, $rootScope.user);

      vm.wish[visited] = true;
      toastr.info('Marked as visited', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

    }

    function justDelete(deleted) {

      vm.wishlist.splice(vm.wishlist.indexOf(deleted),1);
      $rootScope.user.wishlist = vm.wishlist;
      UsersService.update({id: $rootScope.user.id}, $rootScope.user);

      vm.wish[deleted] = true;
      toastr.info('Wish was deleted', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

    }

    function checkCountry(cid) {
      if(vm.wishlist.indexOf(cid) != -1) {
        return true;
      }
    }
  }

  /* @ngInject */
  function StatsController($rootScope, $scope) {
    $rootScope.header = $rootScope.init.messages.menu_stats;
    $rootScope.tabSelect(4);

    var vm = this;
    // TODO fetch real data
    var visitedTotal = $rootScope.user.visited.length;
    var visitedEurope = 1;
    var visitedAmerica = 3;
    var totalCountries = 13;
    var totalEurope = 2;
    var totalAmerica = 4;
    var totalUsers = 1;



    vm.worldPercent = Math.round((100 / totalCountries) * visitedTotal);
    vm.europePercent = Math.round((100 / totalEurope) * visitedEurope);
    vm.americaPercent = Math.round((100 / totalAmerica) * visitedAmerica);
    vm.usersPercent = 100;
    //$scope.percent2 = 100;

    //$scope.percent = 65;
    $scope.options = {
      animate:{
        duration:1000,
        enabled:true
      },
      barColor:'#41cd9e',
      scaleColor:false,
      lineWidth:4,
      lineCap:'circle'
    };


  }


  /* @ngInject */
  function FeedbackController($rootScope, UsersService) {

    $rootScope.header = $rootScope.init.messages.side_feedback;
    $rootScope.tabSelect(0);

    var name = $rootScope.user.name || '';
    var email = $rootScope.user.email || '';

    var vm = this;
    vm.submitted = false;

    vm.feedbackData = {
      name: name,
      email: email,
      textarea: ''
    };

    vm.doFeedback = doFeedback;

    function doFeedback() {
      console.log(vm.feedbackData.textarea);

      $rootScope.user.feedback.push(vm.feedbackData);
      // save data
      UsersService.update({id: $rootScope.user.id}, $rootScope.user);
      // TODO: check if no error
      toastr.info('Feedback sent', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

      vm.submitted = true;
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
  function SettingsController($rootScope,
                               $state,
                               $localStorage,
                               InitializeService,
                               UsersService) {
    $rootScope.header = $rootScope.init.messages.side_settings;
    $rootScope.tabSelect(0);

    var name = $rootScope.user.name || '';
    var country = $rootScope.user.home_country || '';
    var language = $rootScope.init.language;

    var vm = this;
    vm.settingsData = {
      name: name,
      country: country,
      language: language
    }

    vm.setLanguage = setLanguage;
    vm.doSettings = doSettings;

    function setLanguage(lang) {
      $rootScope.init.language = lang;
      $rootScope.user.language = lang;
      $localStorage.language = lang;
      InitializeService.initialize(lang);

      $state.go($state.current, {}, {reload: true});
      /*$state.transitionTo(
        $state.current,
        $state.$current.params,
        { reload: true, inherit: true, notify: true });*/
    }

    function doSettings() {
      console.log(vm.settingsData.language);
      $rootScope.user.name = vm.settingsData.name;
      // TODO: impement in next version
      //$rootScope.user.home_country = vm.settingsData.country;
      $rootScope.user.language = vm.settingsData.language;
      // save data
      UsersService.update({id: $rootScope.user.id}, $rootScope.user);
      // TODO: check if no error

      toastr.info('Settings saved', '', {positionClass: 'toast-bottom-center', timeOut: 1500});

      $state.go($state.current, {}, {reload: true});
    }
  }

  /* @ngInject */
  function AboutController($rootScope, CONFIG) {

    var vm = this;
    vm.version = CONFIG.APPVER;

    $rootScope.header = $rootScope.init.messages.side_about;
    $rootScope.tabSelect(0);

  }

})();
