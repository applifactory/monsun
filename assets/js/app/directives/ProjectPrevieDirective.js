app.directive('projectPreview', function(){
  return {
    restrict: 'A',
    link: function(scope, el, attr){
      var thumbs = el[0].querySelectorAll('.thumbs .img img');
      var image = el[0].querySelector('.image img');
      angular.forEach(thumbs, function(thumb){
        thumb.addEventListener('click', function(){
          console.log(image);
          image.src = this.src.replace('thumb-', '');
        })
      });
    }
  }
})
