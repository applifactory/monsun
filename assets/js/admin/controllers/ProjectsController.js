app.controller('ProjectsController', function($scope, ngDialog, ProjectService, ImageService, $window){

  $scope.init = function(language) {
    $scope.language = language;
    $scope.category = window.location.pathname.replace(/.*\//, '');
    var list = document.querySelector('.list-items');
    var sortable = new Sortable(list, {
      onSort: function (evt) {
        var items = list.querySelectorAll('li');
        var ids = [];
        angular.forEach(items, function(item){
          ids.push(item.dataset.id);
        });
        ProjectService.sort(ids);
      }
    });
  }

  var dialog = null;

  $scope.newProject = function(){
    dialog = ngDialog.open({
      template:
        '<div>New project</div>' +
        '<input type="text" placeholder="Project name" ng-model="newProjectName"/>' +
        '<div class="tools">' +
          '<div class="button" ng-click="createNewProject(newProjectName)" ng-class="{disabled: !newProjectName}">Create project</div>' +
        '</div>',
      plain: true,
      scope: $scope
    });
  }

  $scope.createNewProject = function(newProjectName) {
    if ( newProjectName ) {
      ProjectService.create(newProjectName, $scope.category, $scope.language).then(function(project){
        dialog.close();
        window.location = window.location.pathname + '/' + project.link + '/' + project.id;
      }, function(){

      })
    }
  }

  $scope.uploadCover = function(projectId, $files) {
    console.log('addCover', projectId);
    if ( !$scope.isUploading && $files.length > 0 ) {
      $scope.isUploading = true;
      ImageService.upload($files[0], 'project-cover/' + projectId).then(function(image){
        $window.location.reload();
      }, function(err){
        $scope.isUploading = false;
      });
    }
  }

})
