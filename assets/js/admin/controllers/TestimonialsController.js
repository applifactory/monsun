app.controller('TestimonialController', function($scope, TestimonialService, ngDialog){

  var language = 'pl';

  $scope.init = function(_language) {
    language = _language;
  }

  $scope.newTestimonial = function() {
    TestimonialService.create(language).then(function(){
      location.reload();
    });
  }

  $scope.update = function(id, attr, text) {
    var update = { _id: id };
    update[attr] = text;
    TestimonialService.update(update);
  }

  $scope.delete = function(id) {
    TestimonialService.delete(id).then(function(){
      location.reload();
    })
  }

})
