app.controller('SliderController', function($scope, ImageService, ngDialog){

  var thumbs = document.querySelector('.thumbs');
  var dialog = null;
  var sliderIndex = thumbs.dataset.index;
  $scope.slides = thumbs ? JSON.parse(thumbs.dataset.slides) : [];
  
  $scope.editSlide = function(slide) {

    $scope.currentSlide = slide;
    $scope.slideLink = (slide.link || '') + '';

    dialog = ngDialog.open({
      template:
        '<div>Slide link</div>' +
        '<input type="text" placeholder="http://google.com/ or /architecture" ng-model="slideLink"/>' +
        '<div class="tools">' +
          '<div class="button" ng-click="updateSlide(slideLink)">Save slide</div>' +
        '</div>',
      plain: true,
      scope: $scope
    });
  }

  $scope.updateSlide = function(link) {
    var update = {
      _id: $scope.currentSlide._id,
      link: link
    };
    ImageService.update(update).then(function(){
      $scope.currentSlide.link = link;
    });
    dialog.close();
  }

  $scope.upload = function($files) {
    if ( !$scope.isUploading && $files.length > 0 ) {
      $scope.isUploading = true;
      ImageService.upload($files[0], 'slider/'+sliderIndex).then(function(slide){
        $scope.slides.push(slide);
        $scope.isUploading = false;
      }, function(err){
        $scope.isUploading = false;
      });
    }
  }

  $scope.deleteSlide = function(slide, $index, $event) {
    $event.stopImmediatePropagation();
    ImageService.delete(slide._id).then(function(){
      $scope.slides.splice($index, 1);
    })
  }

  $scope.sortConfig = {
    onSort: function (e){
      ImageService.sort( $scope.slides.map(function(slide){ return slide._id}) );
    }
  }

})
