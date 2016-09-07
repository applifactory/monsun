app.service('ImageService', function($q, Upload, $http){
  return {
    upload: function(file, path) {
      var d = $q.defer();
      Upload.upload({
        method: 'POST',
        url: '/api/image/' + path,
        file: file,
        fileFormDataName: 'image'
      }).progress(function (evt) {
        d.notify(100.0 * evt.loaded / evt.total);
      }).success(function (data, status, headers, config) {
        d.resolve(data.image);
      }).error(function(err){
        d.reject(err);
      });
      return d.promise;
    },
    sort: function(ids) {
      var d = $q.defer();
      $http.put('/api/image', {
        ids: ids
      }).success(function (data) {
        d.resolve(data);
      }).error(function(err){
        d.reject(err);
      });
      return d.promise;
    },
    delete: function(id) {
      return $http.delete('/api/image/' + id);
    },
    update: function(image) {
      var d = $q.defer();
      console.log('update', image);
      $http.put('/api/image/' + image._id, image).success(function (data) {
        d.resolve(data);
      }).error(function(err){
        d.reject(err);
      });
      return d.promise;
    }
  }
})
