$(function(){
    eListeners();
})

function getCategories() {
  clear()
  $.get(('/categories.json'), function(data) {
    data.forEach(category => {
      let nc =
      `<br><h4> ∇  ${category.name} ∇ </h4>
       <h5>  ${category.description} </h5>
       <p> There is ${category.items.length} item(s) in this category </p>`
      $('#js-container').append(nc)
      category.items.forEach(item => {
        let c =
          `<li> ${item.name} </li>`
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

}
