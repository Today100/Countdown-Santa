let times = 1
const toMilliseconds = (hrs) => (hrs*60*60)*1000;
let items

document.getElementById("thing").addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo()
  }
});

document.getElementById("hours").addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo()
  }
});

try {
  items = JSON.parse(localStorage.getItem("todo"))

  for (let t = 0; t < items.length; t++) {
    addTodo(items[t])
  }

  // runCheck()
}
catch (err) {
// console.log(err)
  localStorage.setItem("todo", JSON.stringify([]))
}


var interval_set = setInterval(function(){runCheck()}, 1000);
  
function runCheck() {
  // console.log("here, right here")
  items = JSON.parse(localStorage.getItem("todo"))
  // if (items == null){localStorage.setItem("todo", JSON.stringify([]))}

  for (let t = 0; t < items.length; t++) {
    
    id = JSON.parse(items[t])[0]
    
    target_time = Math.floor(JSON.parse(items[t])[2])
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = target_time - now;
    // console.log(JSON.parseitems[t])
    // console.log(target_time)
    // console.log(distance)
      
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id="demo"
    hours = days *24 + hours
    if (seconds > 0 || minutes > 0 || hours > 0) {

      document.getElementById(id+"_h").innerHTML = hours + "h " +minutes + "m " + seconds + "s ";
      
    }


      
    if (distance < 0) {
      var title = "Countdown Santa!";
      // icon = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
      var body = "Time is FINISHED for: " + JSON.parse(items[t])[1];
      // var notification = new Notification(title, { body });
      document.getElementById(id+"_h").innerHTML = "EXPIRED";
    }

  }
  
  // console.log("finished")
}

function addTodo(item = "") {
  todo_text = document.getElementById("thing").value
  todo_time = document.getElementById("hours").value
  set_it = false
  if (item != "") {
    times = JSON.parse(item)[0]
    todo_text = JSON.parse(item)[1]
    todo_time = JSON.parse(item)[2]
    set_it = true
  }
  if (todo_text != "") {
    myFunction("thing_pop", " ")
    
    if (todo_time != "" || todo_time > 0) {

      d = new Date()
      if (toMilliseconds(todo_time) == 0){
        myFunction("hr_pop", "add")
        return
      }

      if (!set_it){
        target_time =  d.getTime()+toMilliseconds(todo_time)
        // console.log("times: ", times)
        addCounter(JSON.stringify([times, todo_text, Math.floor(todo_time)]), true)
        // console.log("Added: ", JSON.stringify([times, todo_text, Math.floor(todo_time)]))
      try {
          st = JSON.parse(localStorage.getItem('counted'))
          st.push(JSON.stringify([times, todo_text, Math.floor(todo_time)]))
          localStorage.setItem('counted', JSON.stringify(st));
        } 
      catch {
    
          localStorage.setItem('counted', JSON.stringify([]))
        }
      }
        
      else {
        target_time = todo_time
      }
      
      myFunction("hr_pop", " ")
      document.getElementById("thing").value = ""
      document.getElementById("hours").value = ""
      parent = document.getElementById("todos")
      // console.log(todo_text)
    
      let father_div = document.createElement("div")
      father_div.classList = "father_div"
      father_div.id = times + "_div"
    
    
      child_text = document.createElement("p")
      child_text.innerHTML = todo_text
      child_text.classList = "child_text"
      child_text.id = times + "_p"


      child_text_container = document.createElement("div")
      child_text_container.classList = "child_text_container"

      
      
      child_time = document.createElement("p")
      child_time.innerHTML = todo_time
      child_time.classList = "hours"
      child_time.id = times + "_h"

      child_time_container = document.createElement("div")
      child_time_container.classList = "child_time_container"
      child_time_container.appendChild(child_time)

      child_time_target = document.createElement("p")
      child_time_target.innerHTML = target_time
      child_time_target.id = times + '_target'
      child_time_target.classList = "text-hidden"
      // child_time_target.hidden = true
      // child_time_container.appendChild(child_time_target)
      
      child_text_div = document.createElement("div")
      child_text_div.classList = "div_all_text"
      child_text_div.appendChild(child_text_container)
      child_text_div.appendChild(child_time_container)

      
      child_check = document.createElement("input")
      child_check.type = "checkbox"
      child_check.classList = "checks"
      child_check.id = times
      child_text_container.appendChild(child_check)
      child_text_container.appendChild(child_text)
      child_check.addEventListener("click", function(evt) { crossText(evt); });


    
      // father_div.appendChild(child_check)
      father_div.appendChild(child_text_div)
      father_div.appendChild(child_time_target)


      // console.log(father_div)
    
    
      parent.appendChild(father_div);
      // console.log(parent)

      
      if (item == "") {
        try {
          st = JSON.parse(localStorage.getItem('todo'))
          st.push(JSON.stringify([times, todo_text, target_time]))
          localStorage.setItem('todo', JSON.stringify(st));
          
        } catch (err) {
          // console.log(err)
          localStorage.setItem('todo', JSON.stringify([]))
        }
    
      }
      times += 1
      // runCheck()
      

      
    }
    else {
      myFunction("hr_pop", "add")
    }
  }
  else {
    myFunction("thing_pop", "add")
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

function toTimee(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


function crossText(num) {
  let tid = num.target.id
  checkmark = document.getElementById(tid)


  if (checkmark.checked) {
    newParent = document.getElementById("achieved")
    origin = document.getElementById(String(tid) + "_div")
    
    let l = JSON.parse(localStorage.getItem("todo"))
    // for (let i=0; i<l.length;i++){
    //   console.log(l[i])
    // }

    elements = JSON.stringify([Math.floor(tid), document.getElementById(tid + "_p").innerHTML, Math.floor(document.getElementById(tid +"_target").innerHTML)])
    
    const index = l.indexOf(elements);
    
    if (index > -1) {
      l.splice(index, 1);
    }
    
    localStorage.setItem("todo", JSON.stringify(l))
    newParent.appendChild(origin)
    
  } else if (!checkmark.checked) {

    const tx = JSON.stringify([Math.floor(tid), document.getElementById(tid + "_p").innerHTML, Math.floor(document.getElementById(tid +"_target").innerHTML)]);
    
    origin = document.getElementById(tid + "_div")
    origin.remove()
    
    addTodo(tx)

    let l = JSON.parse(localStorage.getItem("todo"))

    l.push(tx)
    localStorage.setItem("todo", JSON.stringify(l))

  }



}
