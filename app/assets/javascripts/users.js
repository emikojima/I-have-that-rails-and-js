$(document).on('turbolinks:load', function() {
  attachListeners();
})
// $(function(){
//   attachListeners();
// })

function getUsers() {
  $.get('/users.json', function(users) {
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
  $('#js-sub').empty()
}

function userLink(id) {
  clear()
  $.get(`/users/${id}.json`, function(data){
      const its = data.items
      $('#js-title').html("<h4>" + "Δ Δ Δ" + "</h4><h3>" + "User: " + `${data.name}` + "</h3><p>" + "Location: " + `${data.city}` + ", " +`${data.state}` + "</p> <h4>" + "∇ ∇ ∇" + "</h4><br><h3>" + "Items Listed for Lending: " + "</h3>")
        if (its == "") {
          $('#js-container').html( "<p>"+"NO ITEMS LISTED (YET)" + "</p><br>")
        }
      its.forEach((i) =>
        $('#js-container').append(`<h4><a onclick="getItem(${id}, ${i.id})">◦ ${i.name} ◦</a></h4><p> Description:  ${i.description} </p> <p> Availabile: ${i.available} </p><br>`)
      )
      $('#js-next').html(`<button id="${id}" class="nexti">   Next User </button>`)
  })
}

function deleteUser(id) {
  let c = confirm("Are you sure you want to delete your account?")
  if (c === true) {
  $.ajax({
      type: "DELETE",
      url: `/users/${id}`,
      success: function(response) {
        alert("Your account has been deleted");
      }
  })}
}

function next(id) {
  $.get((`/users/${id}/next.json`), function(data) {
    userLink(data.id)
  })
}

function getMyPage(id) {
  current = `${id}`
  $.get((`/users/${id}.json`), function(data) {
    const itss = data.items
    clear()

    $('#js-title').html("<h4>" + "Δ Δ Δ" + "</h4><h3>" + "Hello, " + `${data.name}` + "</h3><p>" + "Your Location: " + `${data.city}` + ", " +`${data.state}` + "</p> <h4>" + "∇ ∇ ∇" + "</h4><br><h3>" + "Your Items" + "</h3><p>" + "(Click on Item to Edit) " + "</p>")

    $('#js-next').append(`<br><h5><a onclick="addItem(${current})"> Add an Item </a></h5>`)
      $('#js-sub').append(`<br><h5><button onclick="deleteUser(${current})"> Delete Your Account </button></h5>`)

    itss.forEach((i) =>
    $('#js-container').append(`<h4><a onclick="editItem(${id}, ${i.id})">◦ ${i.name} ◦</a></h4>`))
  })
}

function attachListeners() {
  $('.users').on('click', function(e) {
    e.preventDefault()
    getUsers()
  })

  $('.me').on('click', function(e) {
    e.preventDefault()
    getMyPage(this.id)
  })

  $('#js-next').on("click", ".nexti", function(e) {
    e.preventDefault()
    next(this.id)
  })

  $('#js-sub').on('submit', "#new_item", function(e) {
    e.preventDefault()

    $.ajax({
      type: ($("input[name='_method']").val() || this.method),
      url: this.action,
      data: $(this).serialize(),
      success: function(response){
        alert("Thank you for adding an item for community lending!")
        $('#js-container').append(response)
        $('#js-sub').empty()
      }
    })
  })



}
