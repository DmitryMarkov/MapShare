angular.module('mapshare.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $scope.closeLogin();
  };

  // Feedback modal
  $ionicModal.fromTemplateUrl('templates/feedback.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.feedbackModal = modal;
  });

  $scope.feedback = function() {
    $scope.feedbackModal.show();
  };
  $scope.closeFeedback = function() {
    $scope.feedbackModal.hide();
  };
  $scope.doFeedback = function() {
    console.log('Doing feedback');

    $scope.closeFeedback();
  };

  // Setting modal
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.settingsModal = modal;
  });

  $scope.settings = function() {
    $scope.settingsModal.show();
  };
  $scope.closeSettings = function() {
    $scope.settingsModal.hide();
  };
  $scope.doSettings = function() {
    console.log('Doing settings');

    $scope.closeSettings();
  };

  // About modal
  $ionicModal.fromTemplateUrl('templates/about.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.aboutModal = modal;
  });

  $scope.about = function() {
    $scope.aboutModal.show();
  };
  $scope.closeAbout = function() {
    $scope.aboutModal.hide();
  };
})

.controller('CountriesController', function($scope) {
  $scope.playlists = [
    { title: 'Albania', id: 1 },
    { title: 'Bulgaria', id: 2 },
    { title: 'Canada', id: 3 },
    { title: 'India', id: 4 },
    { title: 'Russia', id: 5 },
    { title: 'Uruguay', id: 6 }
  ];
})

.controller('MapsController', function($scope, $stateParams) {
})

.controller('WishlistController', function($scope, $stateParams) {
})

.controller('StatsController', function($scope, $stateParams) {
});
