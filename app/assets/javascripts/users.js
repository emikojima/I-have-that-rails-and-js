$(function(){
  attachListeners();
})

function getUsers() {
  $.get('/users.json', function(data) {
    var users = data
    $('#js-container').empty()
    $('#js-title').empty()
    $('#js-title').html("<h2>" + "Community Members" + "</h2>")
    users.forEach((user) =>
      $('#js-container').append(`<h3> <a id="${user.id }" onclick="userLink(${user.id})">◦ ${user.name} ◦</a></h3><p>${user.city}, ${user.state}</p>`)
    )
  })
}

function userLink(id) {
    $.get(`/users/${id}.json`, function(data){
      var items = data.items
      $('#js-title').empty()
      $('#js-container').empty()
      $('#js-title').html("<h2>" + "User: " + `${data.name}` + "</h2><h4>" + "Location: " + `${data.city}` + ", " +`${data.state}` + "</h4>")

items.forEach((item) =>
$('#js-container').append(`<h3>◦ ${item.name} ◦</h3><h4> ◦ ${item.description} ◦</h4> <h4> ◦ ${item.available} ◦</h4>`))

    })
}

function attachListeners() {
  $('.users').on('click', function(e) {
    e.preventDefault()
    getUsers()
  })



}
