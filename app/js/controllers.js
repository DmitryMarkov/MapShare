'use strict';

angular.module('mapshare')


.controller('IndexController', ['$scope', 'countriesService', function($scope, countriesService) {

    $scope.countries = countriesService.getCountries();
}])

.controller('CountriesController', [
   '$scope', 'countriesService', 'wishlistService', function(
    $scope, countriesService, wishlistService) {


}])

.controller('MapsController', [function(){


}])

.controller('WishlistController', [function(){


}])

.controller('StatsController', [function(){


}])

.controller('LoginController', [function(){


}])

.controller('FeedbackController', [function(){


}])
;
