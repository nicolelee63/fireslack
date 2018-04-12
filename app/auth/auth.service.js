angular.module('angularfireSlackApp')
.factory('Auth', function(){
  var auth = $firebaseAuth();
  return auth;

});
