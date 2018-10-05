$(function(){
    eListeners();
})

function getCategories() {
  clear()
  $.get(('/categories.json'), function(data) {
    data.forEach(category => {
      let nc =
      `<br><h3> ∇  ${category.name} ∇ </h3>
       <h4>  ${category.description} </h4>
       <p> There is ${category.items.length} item(s) in this category </p>`
      $('#js-container').append(nc)
      category.items.forEach(item => {
        let c =
          `<li><a onclick="getThis(${item.user_id}, ${item.id})">◦ ${item.name} ◦</a></li>`
          $('#js-container').append(c)
      })
    })
  })
}

function eListeners() {

  $('.categories').on('click', function(e) {
    e.preventDefault()
    getCategories()
  })

  $('#js-sub').on("click", ".new_cat_link", function(e) {
    e.preventDefault()
    $.get(('/categories/new'), function(form) {
      clear()
      $('#js-container').append(form)
    })
  })

  $('#js-container').on('submit', ".new_category", function(e) {
    alert("Success! Category has been added!")
    e.preventDefault()
    $.ajax({
      type: ($("input[name='_method']").val() || this.method),
      url: this.action,
      data: $(this).serialize(),
      success: function(response){

        $('#js-container').append("<li>" + `${response}` + "</li>")
        $('.new_category').empty()
        $('h2').empty()
          $('#js-title').append("<h2>" + "Categories" + "</h2>")

      }
    })
  })

}
