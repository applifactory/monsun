app.directive('dateTime', function(){
  return {
    restrict: 'E',
    scope: {
      timestamp: '=ngModel'
    },
    template: '<input name="date" type="text" placeholder="Wybierz datę" readonly/>',
    link: function(scope, el, attrs) {

      scope.time = '00:00';
      var date = new Date();
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();

      var dateEl = el[0].querySelector('[name=date]');
      var timeEl = el[0].querySelector('[name=time]');
      var picker = datepickr( dateEl, { dateFormat: 'd-m-Y' });

      var _zPref = function(input) {
        input = parseInt(input) || 0;
        return input < 10 ? '0' + input : '' + input;
      }

      var _buildTimestamp = function() {
        if ( picker.selectedDate ) {
          year = picker.selectedDate.year;
          month = picker.selectedDate.month;
          day = picker.selectedDate.day;
          scope.timestamp = year + '-' + _zPref(month+1) + '-' + _zPref(day) + 'T' + scope.time + ':00'//.000+01:00';
        }
      }

      angular.element(dateEl).bind('change', function(){
        _buildTimestamp();
        scope.$apply();
      });

      angular.element(timeEl).bind('blur', function(){
        var hh, mm;
        parts = timeEl.value.split(':');
        hh = Math.min( Math.max( parseInt( parts[0] ) || 0, 0 ), 23 );
        mm = Math.min( Math.max( parseInt( parts[1] ) || 0, 0 ), 59 );
        scope.time = _zPref(hh) + ':' + _zPref(mm);
        _buildTimestamp();
        scope.$apply();
      });

      var unwatch = scope.$watch('timestamp', function(timestamp){
        if ( timestamp ) {
          year = timestamp.substr(0,4);
          month = timestamp.substr(5,2);
          day = timestamp.substr(8,2);
          scope.time = timestamp.substr(11,5);
          picker.setDate( year, parseInt(month)-1, day );
        } else {
          picker.deselectDate();
        }
      });

    }
  }
})
