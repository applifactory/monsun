app.controller('ProjectsController', function($scope){

  var sector, solution, container, items;

  function filterProjects() {
    container = container || angular.element(document.querySelector('.list-items'));
    items = items || document.querySelectorAll('.list-items li');
    angular.forEach(items, function(item){
      var _sector, _solution, visible = true;
      var _item = angular.element(item);
      _sector = item.dataset.hasOwnProperty('sector') ? item.dataset.sector : _sector;
      _solution = item.dataset.hasOwnProperty('solution') ? item.dataset.solution : _solution;
      if ( sector !== undefined && _sector != sector )
        visible = false;
      if ( solution !== undefined && _solution != solution )
        visible = false;
      try {
        if ( visible ) {
          if ( !item.parentElement )
            container.append(_item);
        } else {
          if ( item.parentElement )
            _item.remove();
        }
      } catch (e) {};
    })
  }

  $scope.$on('dropdown:sector', function(e, value){
    sector = value == -1 ? undefined : value;
    filterProjects();
  })

  $scope.$on('dropdown:solution', function(e, value){
    solution = value == -1 ? undefined : value;
    filterProjects();
  })

});
