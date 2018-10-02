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
    <li><h3><a id="${this.id}" onclick="getThis(${this.user_id},${this.id})"> ∇ ${this.name} ∇ </a></h3>
    <p> ${this.description}</p>
    <p> From: ${this.user.name} @ ${this.user.city}, ${this.user.state}</p>
    <p> Availabile? ${this.available}</p></li>
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
    let x = `Search Items <input type="text" id="myInput" onkeyup="myFind()" placeholder="Item name ..." title="Type in a name" >`
    $('#everything').append(x)

    $.get(("/items.json"), function(data) {

      data.forEach(item => {
        let newItem = new Item(item)
        let ih = newItem.formatIndex()

        $('#js-container').append(ih)

      })

    })
  }

  function myFind() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("js-container");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }}


  function getThis(uid,id) {
    clear()
    $.get((`/users/${uid}/items/${id}.json`), function(data) {
      let newIt = new Item(data)
      let ni = newIt.formatEmail()
      $(`#js-container`).append(ni)
    })
  }

  function editThis(uid, id) {
    $.get((`/users/${uid}/items/${id}/edit`), function(form) {
      clear()
      $('#js-container').append(form)
  })
}

  function attachEventListeners() {
    $('.items-list').on('click', function(e) {
      e.preventDefault()
      getItems()
    })

    $('#js-container').on('submit', ".edit_item", function(e) {
      alert("Item Successfully Updated")
      e.preventDefault()
      $.ajax({
        type: ($("input[name='_method']").val() || this.method),

        url: this.action,
        data: $(this).serialize(),
        success: function(response){
          clear()
          $('#js-container').append("<h4>" + "Item Successfully Updated" + `${response}` + "</h4>")
          $('#js-sub').empty()
        }
      })
    })


  }
