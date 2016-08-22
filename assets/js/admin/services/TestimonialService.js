app.service('TestimonialService', function($q, Upload, $http){
  return {
    create: function(language) {
      var d = $q.defer();
      $http.post('/api/testimonial/' + language).success(function (data) {
        d.resolve();
      }).error(function(err){
        d.reject(err);
      });
      return d.promise;
    },
    delete: function(id) {
      return $http.delete('/api/testimonial/' + id);
    },
    update: function(testimonial) {
      var d = $q.defer();
      $http.put('/api/testimonial/' + testimonial._id, testimonial).success(function (data) {
        d.resolve(data);
      }).error(function(err){
        d.reject(err);
      });
      return d.promise;
    }
  }
})
