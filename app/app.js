'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        controller:'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller:'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack.firebaseio.com/');

  .config(function(){
    var config = {
    apiKey: "AIzaSyAfF1_ZG8qw45p-5itpuh8ojz3YS7eBcB4",
    authDomain: "fire-slack-15629.firebaseapp.com",
    databaseURL: "https://fire-slack-15629.firebaseio.com",
    projectId: "fire-slack-15629",
    storageBucket: "fire-slack-15629.appspot.com",
    messagingSenderId: "999703239398"
  };
  firebase.initializeApp(config);
});
