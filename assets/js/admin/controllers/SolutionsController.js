app.controller('SolutionsController', function($scope, ngDialog, ImageService, SolutionService){

  $scope.init = function(language) {
    $scope.language = language;
    var list = document.querySelector('.list ul');
    var sortable = new Sortable(list, {
      onSort: function (/**Event*/evt) {
        var items = list.querySelectorAll('li');
        var ids = [];
        angular.forEach(items, function(item){
          ids.push(item.dataset.id);
        });
        SolutionService.sort(ids);
      }
    });
  }

  var dialog = null;

  $scope.newSolution = function(){
    dialog = ngDialog.open({
      template:
        '<div>New solution</div>' +
        '<input type="text" placeholder="Solution name" ng-model="newSolutionName"/>' +
        '<div class="tools">' +
          '<div class="button" ng-click="createNewSolution(newSolutionName)" ng-class="{disabled: !newSolutionName}">Create solution</div>' +
        '</div>',
      plain: true,
      scope: $scope
    });
  }

  $scope.createNewSolution = function(newSolutionName) {
    if ( newSolutionName ) {
      SolutionService.create(newSolutionName, $scope.language).then(function(solution){
        dialog.close();
        window.location.reload();
      }, function(){

      })
    }
  }

  $scope.update = function(attr, value) {
    var _attr = attr.split('/');
    var update = {_id: _attr[1]};
    update[_attr[0]] = value;
    SolutionService.update(update);
  }

  $scope.upload = function($files, solutionId) {
    var img = document.querySelector('.image[data-solution-id="' + solutionId + '"] img');
    if ( !$scope.isUploading && $files.length > 0 ) {
      $scope.isUploading = true;
      ImageService.upload($files[0], 'solution/' + solutionId).then(function(image){
        img.src = '/fx/' + image.file;
        $scope.isUploading = false;
      }, function(err){
        $scope.isUploading = false;
      });
    }
  }

  $scope.deleteSolution = function(solutionId) {
    SolutionService.delete(solutionId).then(function(){
      window.location.reload();
    })
  }

})
