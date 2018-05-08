'use strict';

angular
  .module("Stubtrax")
  .factory("FBStorageFactory", function($q, $http, FBCreds) { 

    let storage = firebase.storage();

    let pushImage = (event, uploader) => {
      let file = event.target.files[0];
      let storageRef = firebase.storage().ref(file.name);
      let task = storageRef.put(file);

      task.on('state_changed', function progress(snapshot) {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;

      });
    };
    return { pushImage };
  });
