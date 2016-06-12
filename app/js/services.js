(function() {
  'use strict';

  angular.module('mapshare')
    .factory('AuthorizeService', AuthorizeService)
    .factory('InitializeService', InitializeService)
    .factory('CountriesService', CountriesService)
    .factory('UsersService', UsersService);

  /**
   * @name AuthorizeService
   * @desc Retrieve users
   */

  /* @ngInject */
  function AuthorizeService($resource, CONFIG, $localStorage, $rootScope, $http) {
    //var TOKEN_KEY = 'Token';


    var service = {
      initialize: initialize,
      login: login,
      logout: logout,
      register: register
    };

    return service;
    ////

    function initialize() {

     // var user = {};
      var auth = $localStorage.auth || {};

      $rootScope.isAuthenticated = false;
      //if (auth.token != undefined) {
      if (auth.userId != undefined) {
        $rootScope.isAuthenticated = true;
        $http.defaults.headers.common['x-access-token'] = auth.token;
        console.log(auth);
      }
      else {
        //auth.userId = 1; // for test purposes only
        $rootScope.isAuthenticated = false;

        // generates random ID (10 characters)
        var result = '';
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 28; i > 0; --i)
          result += chars[Math.round(Math.random() * (chars.length - 1))];

        auth.userId = result;
        $localStorage.auth = auth;

        console.log(auth);
      }

      //var userId = 1;

      //TODO: throw exeption if not found
      if ($rootScope.isAuthenticated) {
        $http.get(CONFIG.BASEURL + 'users/' + auth.userId)
         .then(function(response) {

            $rootScope.user = response.data;

            if($rootScope.user.language)
              $localStorage.language = $rootScope.user.language;
          },
          function(response) {

            console.log("Something went wrong");
            console.log(response.data);
          });
        }
      else {

        // TODO: make localStorage saving if not authentificated and user service too
        var user = {};

        user.id = auth.userId;
        user.visited = [];
        user.wishlist = [];
        user.settings = [];
        user.maps = [];




        $http.post(CONFIG.BASEURL + 'users/', user)
          .then(function(response) {
            console.log("User created");
            $rootScope.user = response.data;

            if($rootScope.user.language)
              $localStorage.language = $rootScope.user.language;
            else {
              $localStorage.language = 'EN';
            }
          },
          function(response) {
            console.log("Something went wrong");
            console.log(response.data);
          });
      }
    }

    function login(loginData) {
      $resource(CONFIG.BASEURL + 'auth/login')
      .save(loginData,
        function(response){
          $localStorage.auth = {
            username:loginData.username,
            userId: loginData._id,
            token: response.token
          };
          $rootScope.isAuthenticated = true;
          $rootScope.userId = loginData._id;
          $rootScope.$broadcast('login:Successful');
      },
        function(response){
          $rootScope.isAuthenticated = false;
          $rootScope.errMessage = $rootScope.init.messages.error + response.data.err.message;
          // TODO: use toastr
      });
    }

    function logout() {
      $resource(CONFIG.BASEURL + 'auth/logout')
        .get(function(response) {});
      $rootScope.isAuthenticated = false;
      delete $localStorage.auth;
      $rootScope.userId = undefined;
      $rootScope.user = undefined;
      $http.defaults.headers.common['x-access-token'] = undefined;
    }

    function register(registerData) {
      $resource(CONFIG.BASEURL + 'auth/login')
      .save(registerData,
        function(response){
          service.login({
            username:registerData.username,
            password:registerData.password});
          $rootScope.$broadcast('registration:Successful');
      },
        function(response){
          $rootScope.errMessage = $rootScope.init.messages.error + response.data.err.message;
          // TODO: use toastr
      });
    }

  }

  /**
   * @name InitializeService
   * @desc Retrieve startup data
   */

  /* @ngInject */
  function InitializeService($resource, CONFIG, $localStorage, $rootScope, $http) {
    var service = {
      initialize: initialize
    };

    return service;
    ////

    function initialize(lang) {

      var init = {};
      var lang = lang || $localStorage.language || 'EN';

      //TODO: make a check of imported value
      init.language = lang;

      //TODO: throw exception if not found
      $http.get('lang/' + init.language + '.json')
        .then(function(res) {
          init.messages = res.data;
          $rootScope.init = init;
      });

      $rootScope.tabSelect = function (tab) {
        $rootScope.tab = tab;
      }

      $rootScope.isSelected = function (tab) {
        return ($rootScope.tab === tab);
      }
    }

  }

  /**
   * @name CountriesService
   * @desc Retrieve countries list
   */

  /* @ngInject */
  function CountriesService($resource, CONFIG, $rootScope) {

    return $resource(CONFIG.BASEURL + 'continents');

  }

  /**
   * @name UsersService
   * @desc Retrieve user info
   */

  /* @ngInject */
  function UsersService($resource, CONFIG, $rootScope) {

    return $resource(CONFIG.BASEURL + 'users/:id', {id:"@id"}, {
      'update': {
        method: 'PUT'
      }
    });
  }
})();
