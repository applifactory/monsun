app.directive('blogPosts', function($http, x2js) {
  return {
    restrict: 'A',
    template:
      '<li ng-repeat="post in posts|limitTo:2">' +
        '<a href="{{post.link}}">' +
          '<div class="image" style="background-image: url({{post.image}})"></div>' +
          '<div class="title">{{post.title}}</div>' +
          '<div class="date">{{post.date}}</div>' +
        '</a>' +
      '</li>',
    link: function(scope, el, attr) {
      $http.get('/blog/rss/').success(function(data){
        var rss = x2js.xml_str2json(data).rss;
        var items = rss.channel.item;
        scope.posts = items.map(function(item){
          return {
            link: '/blog/' + item.link.replace(/.+\/([\w\d\-]+)\/$/, '$1') + '/',
            title: item.title.__cdata,
            image: item.content ? item.content._url.replace(/^.+\/blog\//, '/blog/') : null,
            date: moment(item.pubDate).format('D.MM.YYYY')
          }
        })
      })
    }
  }
})
