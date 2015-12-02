app.controller('AboutController', function($scope, ngDialog, AboutService){

  $scope.init = function(language) {
    $scope.language = language;

    var list = document.querySelector('.list ul');
    var sortable = new Sortable(list, {
      onSort: function (evt) {
        var items = list.querySelectorAll('li');
        var ids = [];
        angular.forEach(items, function(item){
          ids.push(item.dataset.id);
        });
        AboutService.sort(ids);
      }
    });
  }


  $scope.newItem = function(type) {
    AboutService.create('New ' + type, type, $scope.language).then(function(about){
      window.location.reload();
    }, function(){

    })
  }

  $scope.update = function(attr, value) {
    var _attr = attr.split('/');
    var update = {_id: _attr[1]};
    update[_attr[0]] = value;
    AboutService.update(update);
  }

  $scope.deleteItem = function(aboutId) {
    AboutService.delete(aboutId).then(function(){
      window.location.reload();
    })
  }

})
