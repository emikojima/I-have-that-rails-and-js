$(function(){
  attachListeners();
})

function getUsers() {
  $.get('/users.json', function(data) {
    var users = data
    clear()
    $('#js-title').html("<h2>" + "∇ Community Members ∇"  + "</h2>")
    users.forEach((user) =>
      $('#js-container').append(`<br><h3> <a id="${user.id }" onclick="userLink(${user.id})">◦ ${user.name} ◦</a></h3><p>${user.city}, ${user.state}</p>`)
    )
  })
}

function clear() {
  $('#everything').empty()
  $('#js-container').empty()
  $('#js-title').empty()
  $('#js-next').empty()
}

function userLink(id) {
    $.get(`/users/${id}.json`, function(data){
      var its = data.items
      clear()
      $('#js-title').html("<h4>" + "Δ Δ Δ" + "</h4><h3>" + "User: " + `${data.name}` + "</h3><p>" + "Location: " + `${data.city}` + ", " +`${data.state}` + "</p> <h4>" + "∇ ∇ ∇" + "</h4><br><h4>" + "Items for Lending: " + "</h4><br>")

      its.forEach((i) =>
      $('#js-container').append(`<h4><a onclick="getThis(${id}, ${i.id})">◦ ${i.name} ◦</a></h4><p> Description:  ${i.description} </p> <p> Availabile: ${i.available} </p><br>`))

      $('#js-next').html(`<button id="${id + 1}" onclick="userLink(${id + 1})">   Next User </button>`)
    })
}





function attachListeners() {
  $('.users').on('click', function(e) {
    e.preventDefault()
    getUsers()
  })





}
