document.addEventListener("DOMContentLoaded", ()=> {
   loadDogs()
   

})


function loadDogs(){
   let dogbar =  document.getElementById("dog-bar")
   fetch("http://localhost:3000/pups")
   .then((res)=> res.json())
   .then(data => {
      data.forEach((e) => {
         let span = document.createElement("span")
         span.innerText = e.name
         dogbar.append(span)

         span.addEventListener("click", ()=> displayDetails(e))
      })
   })
}

function displayDetails(data){
   let details = document.getElementById("dog-info")
   details.innerText = ""
   let img = document.createElement("img")
   img.src = data.image
   let h2 = document.createElement("h2")
   h2.innerText = data.name
   let button = document.createElement("button")

   if (data.isGoodDog){
      button.innerText = "Good Dog!"  
   } else {
      button.innerText ="Bad Dog!"
   }
  
   details.append(img, h2, button)
   
   button.addEventListener("click", ()=>{
      if (data.isGoodDog){
         console.log("found true")
         fetch(`http://localhost:3000/pups/${data.id}`, {
         method: "PATCH",
         headers: {
            "content-type": "application/json"
         }, 
        body: JSON.stringify({isGoodDog: false})
      })
      .then(resp => resp.json())
      .then(json => displayDetails(json))
      
      } else {
         console.log("found false")
         fetch(`http://localhost:3000/pups/${data.id}`, {
         method: "PATCH",
         headers: {
            "content-type": "application/json"
         }, 
        body: JSON.stringify({isGoodDog: true})
      }) 
      .then(response => response.json())
      .then(json => displayDetails(json))       
      }
   })
}
