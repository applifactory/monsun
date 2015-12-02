app.service('PersonService', function($http, $q){
  return {
    create: function(name, language) {
      var d = $q.defer();
      $http.post('/api/person', {
        name: name,
        language: language.replace('/', '')
      }).success(function(person){
        d.resolve(person);
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    update: function(person) {
      var d = $q.defer();
      $http.put('/api/person/' + person._id, person).success(function(person){
        d.resolve();
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    sort: function(ids) {
      return $http.put('/api/person', {ids: ids});
    },
    delete: function(id) {
      return $http.delete('/api/person/' + id);
    }
  }
})
