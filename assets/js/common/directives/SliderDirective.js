app.directive('slider', function(){
  return {
    restrict: 'C',
    link: function($scope, elem){

      var slides = elem[0].querySelectorAll('.slide');
      var nav = elem[0].querySelectorAll('.nav li');
      var active = 0;

      var setActive = function(index) {
        if ( active != index ) {
          slides[active].classList.remove('active');
          nav[active].classList.remove('active');

          active = index;
          slides[active].classList.add('active');
          nav[active].classList.add('active');
        }
        timerStart();
      }

      var next = function() {
        var index = active + 1;
        if ( index >= slides.length ) index = 0;
        setActive(index);
      }
      var prev = function() {
        var index = active - 1;
        if ( index < 0 )  index = slides.length - 1;
        setActive(index);
      }
      var _timeout = 0;
      var timerStart = function() {
        clearTimeout(_timeout);
        _timeout = setTimeout(next, 5000);
      }

      for ( var i in nav ) {
        if ( i < nav.length ) {
          var item = nav[i];
          item.addEventListener('click', function(e){
            setActive( parseInt(this.innerHTML)-1 );
          })
        }
      }

      timerStart();

    }
  }
})
