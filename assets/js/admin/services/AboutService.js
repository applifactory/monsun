app.service('AboutService', function($http, $q){
  return {
    create: function(name, type, language) {
      var d = $q.defer();
      $http.post('/api/about', {
        name: name,
        type: type,
        language: language.replace('/', '')
      }).success(function(about){
        d.resolve(about);
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    update: function(about) {
      var d = $q.defer();
      $http.put('/api/about/' + about._id, about).success(function(about){
        d.resolve();
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    sort: function(ids) {
      return $http.put('/api/about', {ids: ids});
    },
    delete: function(aboutId) {
      return $http.delete('/api/about/' + aboutId);
    }
  }
})
