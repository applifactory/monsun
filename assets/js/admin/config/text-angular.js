app.config(['$provide', function($provide){
  $provide.decorator('taTools', ['$delegate', function(taTools){
    taTools.bold.iconclass = 'icon-bold';
    taTools.italics.iconclass = 'icon-italic';
    taTools.underline.iconclass = 'icon-underline';
    taTools.strikeThrough.iconclass = 'icon-strike';
    taTools.ul.iconclass = 'icon-list-bullet';
    taTools.ol.iconclass = 'icon-list-numbered';
    taTools.insertLink.iconclass = 'icon-link';
    return taTools;
  }]);
}]);
