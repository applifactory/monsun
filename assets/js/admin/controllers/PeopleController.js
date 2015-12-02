app.controller('PeopleController', function($scope, ngDialog, ImageService, PersonService){

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
        PersonService.sort(ids);
      }
    });
  }

  var dialog = null;

  $scope.newPerson = function(){
    dialog = ngDialog.open({
      template:
        '<div>New person</div>' +
        '<input type="text" placeholder="Person name" ng-model="newPersonName"/>' +
        '<div class="tools">' +
          '<div class="button" ng-click="createNewPerson(newPersonName)" ng-class="{disabled: !newPersonName}">Create person</div>' +
        '</div>',
      plain: true,
      scope: $scope
    });
  }

  $scope.createNewPerson = function(newPersonName) {
    if ( newPersonName ) {
      PersonService.create(newPersonName, $scope.language).then(function(person){
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
    PersonService.update(update);
  }

  $scope.upload = function($files, personId) {
    var img = document.querySelector('.image[data-person-id="' + personId + '"] img');
    if ( !$scope.isUploading && $files.length > 0 ) {
      $scope.isUploading = true;
      ImageService.upload($files[0], 'person/' + personId).then(function(image){
        img.src = '/fx/' + image.file;
        $scope.isUploading = false;
      }, function(err){
        $scope.isUploading = false;
      });
    }
  }

  $scope.deletePerson = function(personId) {
    PersonService.delete(personId).then(function(){
      window.location.reload();
    })
  }

  $scope.editLinkedin = function(personId) {
    var el = document.querySelector('.person[data-id="' + personId + '"] .image .linkedin span');
    var linkedIn = el.dataset.linkedin;
    $scope.currentPerson = {
      id: personId,
      linkedIn: linkedIn != 'undefined' ? linkedIn : '',
      el: el
    }
    dialog = ngDialog.open({
      template:
        '<div>LinkedIn profile</div>' +
        '<input type="text" placeholder="https://www.linkedin.com/profile/view?id=12345..." ng-model="currentPerson.linkedIn"/>' +
        '<div class="tools">' +
          '<div class="button" ng-click="saveLinkedin()">Save link</div>' +
          '<div class="button" ng-click="closeThisDialog()">Cancel</div>' +
        '</div>',
      plain: true,
      scope: $scope
    });
  }

  $scope.saveLinkedin = function() {
    dialog.close();
    $scope.currentPerson.el.dataset.linkedin = $scope.currentPerson.linkedIn;
    PersonService.update({
      _id: $scope.currentPerson.id,
      linkedIn: $scope.currentPerson.linkedIn
    });
  }

})
