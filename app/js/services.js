'use strict';

angular.module('mapshare')
  .constant("baseURL","http://localhost:3000/")
  .constant("imageDIR", "images/")

  .service('countriesService', ['$resource', 'baseURL', function($resource, CONFIG["BASEURL"]) {

    this.getCountries = function() {
      var countries = [];
      return countries;
    }

  }])

  .service('wishlistService', ['$resource', function($resource)  {


  }])
;
