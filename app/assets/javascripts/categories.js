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

}
