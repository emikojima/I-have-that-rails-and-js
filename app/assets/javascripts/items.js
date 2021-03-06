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
      this.available ? this.available = "Available" : this.available = "Currently UNAVAILABLE"
      let itemHtml = `
      <li><h3><a id="${this.id}" onclick="getItem(${this.user_id},${this.id})"> ∇ ${this.name} ∇ </a></h3>
      <p> ${this.description}</p>
      <p> From: ${this.user.name} @ <span class="city">${this.user.city}, ${this.user.state}</span></p>
      <p> Item is: ${this.available}</p><br></li>
      `
      return itemHtml
    }

    formatEmail() {
      this.available ? this.available = "Available" : this.available = "Currently UNAVAILABLE"
      let emailHtml = `
      <h3> ∇ ${this.name} ∇ </a></h3>
      <p> Descripton: ${this.description}</p>
      <p> From: ${this.user.name} </p>
      <p> Located: ${this.user.city}, ${this.user.state}</p>
      <p> Item is: ${this.available}</p><br>
      <h5><a href="mailto:${this.user.email}?subject=Message from IHT Re: ${this.name} &body=Message sent from IHT (I HAVE THAT App), encode: "javascript" ">
      ◦ Email ${this.user.name} to borrow this item ◦ </a></h5><br>
      <h5><a onclick="userLink(${this.user.id})"> See More Items from ${this.user.name} </a></h5>
      `
      return emailHtml
    }
}

  function getItems() {
    clear()
    let x = `<h3>Search Items  <input type="text" id="myInput" onkeyup="searchItem()" placeholder="Item name ..." title="Type in a name" > Search Location: <input type="text" id="location" onkeyup="searchItem()" placeholder="Item location..." title="Type in a location" /></h3> <br>`
    $('#everything').append(x)
    $.get(("/items.json"), function(data) {
      data.forEach(item => {
        let newItem = new Item(item)
        let ih = newItem.formatIndex()
        $('#js-container').append(ih)
      })
    })
  }

  function searchItem() {
    var name, location, nameFilter, locationFilter, ul, li, a, span, i;
    name = document.getElementById("myInput");
    location = document.getElementById("location");
    nameFilter = name.value.toUpperCase();
    locationFilter = location.value.toUpperCase();
    ul = document.getElementById("js-container");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        span = li[i].getElementsByClassName("city")[0];
        if (a.innerHTML.toUpperCase().indexOf(nameFilter) > -1 && span.innerHTML.toUpperCase().indexOf(locationFilter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
  }

  function getItem(uid,id) {
    clear()
    $.get((`/users/${uid}/items/${id}.json`), function(data) {
      let newIt = new Item(data)
      let ni = newIt.formatEmail()
      $(`#js-container`).append(ni)
    })
  }

  function editItem(uid, id) {
    $.get((`/users/${uid}/items/${id}/edit`), function(form) {
      clear()
      let d = `<button onclick="deleteItem(${uid}, ${id})" id="deleteItem"> Delete This Item  </button>`
      $('#js-sub').append(form)
      $('#js-sub').append(d)
    })
  }

  function addItem(id) {
    $('#js-sub').empty("")
    $.get((`/users/${id}/items/new`), function(data){
      let addHtml = "<br><br>" + `${data}` + "<br><br>"
    $('#js-sub').append(addHtml)
    $('#js-next').empty("")
    })
  }

  function deleteItem(uid, id) {
    const cc = confirm("Are you sure you want to delete this item?")
    if (cc === true){
    $.ajax({
        type: "DELETE",
        url: `/users/${uid}/items/${id}`,
        success: function(response) {
            getMyPage(uid)
            alert("Item was successfully deleted");
        }
    })}
  }

  function attachEventListeners() {
    $('.items-list').on('click', function(e) {
      e.preventDefault()
      getItems()
    })

    $('#js-sub').on('submit', ".edit_item", function(e) {
      e.preventDefault()
      $.ajax({
        type: ($("input[name='_method']").val() || this.method),
        url: this.action,
        data: $(this).serialize(),
        success: function(response){
          clear()
          alert("Item Successfully Updated")
          $('#js-container').append("<h4>" + "Item Successfully Updated" + `${response}` + "</h4>")
          $('#js-sub').empty()
        }
      })
    })


  }
