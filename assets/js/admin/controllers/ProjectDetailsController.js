app.controller('ProjectDetailsController', function($scope, ProjectService, ImageService, $timeout, $window, ngDialog) {

  var dialog;

  $scope.init = function(language, id, category) {
    $scope.id = id;
    $scope.category = category;
    var thumbs = document.querySelector('.thumbs');
    if ( thumbs && thumbs.dataset.images )
      $scope.images = JSON.parse(thumbs.dataset.images);
  }

  $scope.update = function(attr, value) {
    var update = {_id: $scope.id};
    update[attr] = value;
    ProjectService.update(update);
  }

  $scope.updateImage = function(id, attr, value) {
    var update = {_id: id};
    update[attr] = value;
    ImageService.update(update);
  }

  $scope.upload = function($files) {
    if ( !$scope.isUploading && $files.length > 0 ) {
      $scope.isUploading = true;
      ImageService.upload($files[0], 'project/' + $scope.id).then(function(image){
        $scope.images.push(image);
        $scope.isUploading = false;
      }, function(err){
        $scope.isUploading = false;
      });
    }
  }

  $scope.sortConfig = {
    onSort: function (e){
      ImageService.sort( $scope.images.map(function(image){ return image._id}) );
    }
  }

  $scope.deleteImage = function(image, $index) {
    ImageService.delete(image._id).then(function(){
      $scope.images.splice($index, 1);
    })
  }

  $scope.$on('dropdown:sector', function(e, value){
    ProjectService.update({
      _id: $scope.id,
      sector: value
    });
  });

  $scope.$on('dropdown:solution', function(e, value){
    ProjectService.update({
      _id: $scope.id,
      solution: value
    });
  });

  $scope.deleteProject = function(showConfirmation) {
    if ( showConfirmation ) {
      dialog = ngDialog.open({
        template:
          '<div>Are you sure you want to delete this project?</div>' +
          '<div class="tools">' +
            '<div class="button danger" ng-click="deleteProject(false)">Delete</div>' +
            '<div class="button" ng-click="closeThisDialog()">Cancel</div>' +
          '</div>',
        plain: true,
        scope: $scope
      });
    } else {
      dialog.close();
      ProjectService.delete($scope.id).then(function(){
        $window.location = $scope.category;
      });
    }
  }

});
