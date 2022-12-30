// let times = 1
document.getElementById("thing2").addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addCounter()
  }
});

document.getElementById("hours2").addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addCounter()
  }
});


try {
  items = JSON.parse(localStorage.getItem("counted"))

  for (let t = 0; t < items.length; t++) {
    addCounter(items[t])
  }
  times += 1
  // runCheck()
}
catch {
  localStorage.setItem("counted", JSON.stringify([]))
}

function addCounter(item = "", diff=false) {

  todo_text = document.getElementById("thing2").value
  todo_time = document.getElementById("hours2").value
  set_it = false
  if (item != "") {
    // if (diff){
      times = JSON.parse(item)[0]
      // console.log(times)
    // }
    todo_text = JSON.parse(item)[1]
    todo_time = JSON.parse(item)[2]
    set_it = true
  }
  if (todo_text != "") {
    myFunction("thing_pop2", " ")
    document.getElementById("thing2").value = ""
    if (Math.floor(todo_time) >= 1) {
      
      myFunction("timed_pop", " ")
      document.getElementById("hours2").value = ""
      parent_box = document.getElementById("counted-items")

      children_box = document.createElement("div")
      children_box.id = times+"_count_div"
      children_box.classList = "children_counter_div"

      children_work = document.createElement("p")
      children_work.innerHTML = todo_text
      children_work.id = times+"_count_p"
      children_work.classList = "count_p"
      children_box.appendChild(children_work)

      children_time_hour = document.createElement("p")
      children_time_hour.id = times+"_count_h"
      children_time_hour.innerHTML = todo_time+" hrs"
      children_time_hour.classList = "count_h"
      children_box.appendChild(children_time_hour)

      children_time_button = document.createElement("button")
      children_time_button.id = times
      children_time_button.innerHTML = "+"
      children_time_button.addEventListener("click", function(evt) { addNumber(evt); });
      children_time_button.classList = "count_b"

      children_time_button2 = document.createElement("button")
      children_time_button2.id = times
      children_time_button2.innerHTML = "-"
      children_time_button2.addEventListener("click", function(evt) { delNumber(evt); });
      children_time_button2.classList = "count_b"
      
      children_box.appendChild(children_time_button)
      children_box.appendChild(children_time_button2)

      parent_box.appendChild(children_box)
      
      

      

      

      if (item == "") {
        try {
          st = JSON.parse(localStorage.getItem('counted'))
          st.push(JSON.stringify([times, todo_text, Math.floor(todo_time)]))
          localStorage.setItem('counted', JSON.stringify(st));
        } catch {
    
          localStorage.setItem('counted', JSON.stringify([]))
        }
              times += 1
      }

      // runCheck()
    }
    else {
      if (!set_it){
        myFunction("timed_pop", "add")
      }
    }
  }
  else {
    myFunction("thing_pop2", "add")
  }

}


function addNumber(evt){
  // console.log(evt)
  let tid = evt.target.id
  // console.log("Add, ", tid)
  element = document.getElementById(tid+"_count_h")
  // console.log(element)
  storage = JSON.parse(localStorage.getItem('counted'))

  
  item = JSON.stringify([Math.floor(tid), document.getElementById(tid+"_count_p").innerHTML, Math.floor(document.getElementById(tid+"_count_h").innerHTML.toString().slice(0, -4))])


  // console.log(item)
  ind = storage.indexOf(item)
  // console.log(item)
  // console.log(ind)
  if ( ind != -1) {
    updated = JSON.stringify([Math.floor(tid), document.getElementById(tid+"_count_p").innerHTML, Math.floor(document.getElementById(tid+"_count_h").innerHTML.toString().slice(0, -3))+1])
    storage[ind] = updated
    
    localStorage.setItem('counted', JSON.stringify(storage));
    // console.log(storage[ind])
    element.innerHTML = Math.floor(document.getElementById(tid+"_count_h").innerHTML.toString().slice(0, -3))+1 + " hrs"
  }
  // console.log(ind)
}

function delNumber(evt){
  let tid = evt.target.id

  element = document.getElementById(tid+"_count_h")

  storage = JSON.parse(localStorage.getItem('counted'))

  item = JSON.stringify([Math.floor(tid), document.getElementById(tid+"_count_p").innerHTML, Math.floor(document.getElementById(tid+"_count_h").innerHTML.toString().slice(0, -4))])

  ind = storage.indexOf(item)

  if ( ind != -1) {
    num = Math.floor(document.getElementById(tid+"_count_h").innerHTML.toString().slice(0, -3))-1

    if (num > 0) {
    updated = JSON.stringify([Math.floor(tid), document.getElementById(tid+"_count_p").innerHTML, num])
    storage[ind] = updated
    
    localStorage.setItem('counted', JSON.stringify(storage));
    element.innerHTML = num + " hrs"
    }

    else if (num == 0) {
      storage.splice(ind, 1)
      for (let x=0;x<storage.length;x++){
        // console.log(storage[x])
      }
      localStorage.setItem('counted', JSON.stringify(storage));
      element.innerHTML = num + " hrs"
    }
    else if (num < 0){
      for (let x=0;x<storage.length;x++){
        // console.log(storage[x])
      }
      localStorage.setItem('counted', JSON.stringify(storage));
    }
  }

  
}

function myFunction(id, state) {
  var popup = document.getElementById(id);
  if (state=="add"){
  popup.classList.add("show");
  }
  else {
    popup.classList.remove("show");
  }
}



