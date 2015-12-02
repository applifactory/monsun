app.service('TextService', function($http){
  return {
    update: function(id, text) {
      $http.post('/api/text', {
        id: id,
        text: text
      })
    }
  }
})
