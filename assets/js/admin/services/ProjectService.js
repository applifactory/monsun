app.service('ProjectService', function($http, $q){
  return {
    create: function(name, category, language) {
      var d = $q.defer();
      $http.post('/api/project', {
        name: name,
        category: category,
        language: language.replace('/', '')
      }).success(function(project){
        d.resolve(project);
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    update: function(project) {
      var d = $q.defer();
      $http.put('/api/project/' + project._id, project).success(function(project){
        d.resolve();
      }).error(function(error){
        d.reject(error);
      });
      return d.promise;
    },
    sort: function(ids) {
      return $http.put('/api/project', {ids: ids});
    },
    delete: function(id) {
      return $http.delete('/api/project/' + id);
    }
  }
})
