app.controller('ProjectsController', function($scope, ngDialog, ProjectService){

  $scope.init = function(language) {
    $scope.language = language;

    var list = document.querySelector('.list-items');
    var sortable = new Sortable(list, {
      onSort: function (/**Event*/evt) {
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
      ProjectService.create(newProjectName, $scope.language).then(function(project){
        dialog.close();
        window.location = window.location.pathname + '/' + project.link + '/' + project.id;
      }, function(){

      })
    }
  }

})
