angular.module('angularfireSlackApp')
  .factory('Users', function($firebaseArray, $firebaseObject){
    var usersRef = firebase.database().ref('users');
    var users = $firebaseArray(usersRef);

    var usersRef = firebase.database().ref('users');
    var connectedRef = firebase.database().ref('.info/connected');

    setOnline: function(uid){
      var connected = $firebaseObject(connectedRef);
      var online = $firebaseArray(usersRef.child(uid+'/online'));

      connected.$watch(function (){
        if(connected.$value === true){
          online.$add(true).then(function(connectedRef){
            connectedRef.onDisconnect().remove();
          });
        }
      });
    }

    var Users = {
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      getGravatar: function(uid){
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },
      all: users
    };

    return Users;
  });
