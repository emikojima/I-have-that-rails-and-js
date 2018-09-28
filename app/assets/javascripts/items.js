$(function(){
  attachEventListeners();
})



class Item {
  constructor(i) {
    this.id = i.id
    this.name = i.name;
    this.description = i.description;
    this.available = i.available;
    this.user_id = i.user_id;
  }
  formatIndex() {
    let itemHtml = `
    <h3><a id="${this.id}" onclick="getThis(${this.user_id},${this.id})"> ∇ ${this.name} ∇ </a></h3>
    <p> ${this.description}</p>
    <p> Availabile? ${this.available}</p><br>
    `
    return itemHtml
  }
}

  function getItems() {
    clear()
    $.get(("/items.json"), function(data) {

      data.forEach(item => {
        let newItem = new Item(item)
        let ih = newItem.formatIndex()
        $('#everything').append(ih)
      })
    })
  }

  function getThis(uid) {
    debugger
    $.get((`users/${uid}/items/${id}.json`), function(data) {
      debugger
    })
  }
  function attachEventListeners() {

    $('.items-list').on('click', function(e) {
      e.preventDefault()
      getItems()
    })

    // $(document).on('click', ".item_link", function(e)
    //  { getItem()
    //
    //  })


  }
