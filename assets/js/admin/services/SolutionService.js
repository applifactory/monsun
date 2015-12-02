app.service('SolutionService', function($http, $q){
  return {
    create: function(name, language) {
      var d = $q.defer();
      $http.post('/api/solution', {
        name: name,
        language: language.replace('/', '')
      }).success(function(solution){
        d.resolve(solution);
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    update: function(solution) {
      var d = $q.defer();
      $http.put('/api/solution/' + solution._id, solution).success(function(solution){
        d.resolve();
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    sort: function(ids) {
      return $http.put('/api/solution', {ids: ids});
    },
    delete: function(id) {
      return $http.delete('/api/solution/' + id);
    }
  }
})
