(function() {
  'use strict';

  angular.module('mapshare')
    .factory('AuthorizeService', AuthorizeService)
    .factory('InitializeService', InitializeService)
    .factory('CountriesService', CountriesService)
    .factory('UsersService', UsersService)
    .factory('MapsService', MapsService)
    .factory('SampleHttpService', SampleHttpService);

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

      if (auth.token != undefined) {
        $rootScope.isAuthenticated = true;
        $http.defaults.headers.common['x-access-token'] = auth.token;
        console.log(auth);
      }
      else {
        auth.userId = 1; // for test purposes only
        //$rootScope.isAuthenticated = true; //for test only

        console.log(auth);
      }

      //var userId = 1;

      //TODO: throw exeption if not found
      $http.get(CONFIG.BASEURL + 'users/' + auth.userId)
       .then(function(response) {
          $rootScope.user = response.data;
        });
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

    function initialize() {

      var init = {};

      //TODO: make a check of imported value
      init.language = $localStorage.language || 'EN';

      //TODO: throw exseption if not found
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

    return $resource(CONFIG.BASEURL + 'users/1', null, {
      'update': {
          method: 'PUT'
      }
    });

    /*return $resource(CONFIG.BASEURL + 'users/:id', null, {
      'update': {
          method: 'PUT'
      }
    });*/

    /*var service = {
      initialize: initialize
    };

    return service;*/
    ////

  }

  /**
   * @name MapsService
   * @desc Retrieve map lists
   */

  /* @ngInject */
  function MapsService($resource, CONFIG, $rootScope) {

    return $resource(CONFIG.BASEURL + 'maps');

  }

  /* @ngInject */
  function CountriesServiceOld($resource, CONFIG, $http, $rootScope) {
    var service = {
      getCountries: getCountries
    };

    return service;
    ////

    function getCountries() {
      //var countries = ['Bulgaria','Albania','Estonia'];
      var earth = {};

      $http.get(CONFIG.BASEURL + $rootScope.init.language + '/1')
       .then(function(res) {
          earth = res.data;
          console.log(res.data.continents);
        });
      console.log(earth);
      return earth;
    }
  }

  /* @ngInject */
  function SampleHttpService($q, $http, $log, CONFIG) {
    var service = {
      getCustomer: getCustomer
    };

    return service;
    ////


    function getCustomer(id) {
      return $http.get(CONFIG.BASEURL + '/api/customer/' + id)
          .then(getCustomerComplete)
          .catch(getCustomerFailed);

      function getCustomerComplete(data, status, headers, config) {
          return data.data;
      }

      function getCustomerFailed(e) {
          var newMessage = 'XHR Failed for getCustomer'
          if (e.data && e.data.description) {
            newMessage = newMessage + '\n' + e.data.description;
          }
          e.data.description = newMessage;
          $log.error(newMessage);
          return $q.reject(e);
      }
    }
  }
})();
