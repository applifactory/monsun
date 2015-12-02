app.directive('dropdown', function($timeout){
  return {
    restrict: 'C',
    link: function(scope, el, attr) {

      var sid = ( attr.persist && attr.name && window.hasOwnProperty('sessionStorage') ) ? attr.name + 'DropdownValue' : null;

      var contains = function(item, container) {
        while ( item ) {
          if ( item == container )
            return true;
          item = item.parentElement;
        }
        return false;
      }

      var select = function(id) {
        var li = el[0].querySelector('[data-id="' + id + '"]');
        var active = el[0].querySelector('li.active');
        var span = el[0].querySelector('span');
        if ( li ) {
          if ( active )
            active.classList.remove('active');
          span.innerText = li.innerText;
          li.classList.add('active');
          el.removeClass('open');
          if ( sid )
            sessionStorage[sid] = id;
          if ( attr.name )
            scope.$emit('dropdown:' + attr.name, id);
        }
      }

      $timeout(function(){
        if ( sid && sessionStorage[sid] )
          select(sessionStorage[sid]);

        if( attr.hasOwnProperty('selection') && attr.selection != undefined )
          select(attr.selection);
      }, 500);

      angular.element(document.body).bind('click', function(e){
        if( !contains(e.target, el[0]) ) {
          el.removeClass('open');
        }
      })

      el.bind('click', function(e){
        if ( e.target.tagName.toLowerCase() == 'span' ) {
          el.toggleClass('open');
        }
        if ( e.target.tagName.toLowerCase() == 'li' ) {
          select( e.target.dataset.id );
        }
      })

    }
  }
})
