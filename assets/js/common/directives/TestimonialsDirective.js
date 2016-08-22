app.directive('testimonials', function(){
  return {
    restrict: 'E',
    link: function($scope, elem, attr){

      var slides = elem[0].querySelectorAll('li'),
          navNext = elem[0].querySelector('.next'),
          navPrev = elem[0].querySelector('.prev'),
          active = 0,
          interval = parseInt(attr.interval) || 0;

      if ( slides.length <= 1 ) {
        navNext.remove();
        navPrev.remove();
      }

      var setActive = function(index) {
        slides[active].classList.remove('active');
        slides[index].classList.add('active');
        active = index;
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
        if ( interval ) {
          clearTimeout(_timeout);
          _timeout = setTimeout(next, 5000);
        }
      }

      navPrev.addEventListener('click', prev);
      navNext.addEventListener('click', next);

      setActive(0);

    }
  }
})
