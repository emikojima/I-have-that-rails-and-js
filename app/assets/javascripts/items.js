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
    this.user = i.user
  }
  formatIndex() {
    let itemHtml = `
    <h3><a id="${this.id}" onclick="getThis(${this.user_id},${this.id})"> ∇ ${this.name} ∇ </a></h3>
    <p> ${this.description}</p>
    <p> From: ${this.user.name} @ ${this.user.city}, ${this.user.state}</p>
    <p> Availabile? ${this.available}</p>
    <br>

    `
    return itemHtml
  }

  formatEmail() {
    let emailHtml = `
    <h3> ∇ ${this.name} ∇ </a></h3>
    <p> Descripton: ${this.description}</p>
    <p> From: ${this.user.name} </p>
    <p> Located @: ${this.user.city}, ${this.user.state}</p><br>
    <h4><a href="mailto:${this.user.name}?subject=Message from IHT Re: ${this.name} &body=Message sent from IHT (I HAVE THAT App) ">
    Email ${this.user.name} to borrow this item </a></h4><br>
    <p><a onclick="userLink(${this.user.id})"> See More Items from ${this.user.name} </a></p>
    `
    return emailHtml
  }
}

  function getItems() {
    clear()
    $.get(("/items.json"), function(data) {

      data.forEach(item => {
        let newItem = new Item(item)
        let ih = newItem.formatIndex()

        $('#js-container').append(ih)

      })

    })
  }


  function getThis(uid,id) {
    clear()
    $.get((`/users/${uid}/items/${id}.json`), function(data) {
      let newIt = new Item(data)
      let ni = newIt.formatEmail()
      $(`#js-container`).append(ni)
    })
  }

  function attachEventListeners() {

    $('.items-list').on('click', function(e) {
      e.preventDefault()
      getItems()
    })

    $(document).on('click', "#makeItem", function(e) {
       getLink()

     })


  }
