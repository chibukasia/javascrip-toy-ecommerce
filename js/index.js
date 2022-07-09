const toysDisplay = document.getElementById("toys-display");
let updateComments = [];

fetch(`http://localhost:3000/toys`)
  .then((res) => res.json())
  .then((toysData) => {
    displayToys(toysData);
  });

function displayToys(toysData) {

  fetch(`http://localhost:3000/cart`)
  .then((res) => res.json())
  .then((toysData) => {
    //console.log(toysData);
    cartToys(toysData)
  });
  let cartToyName;
  function cartToys(cartToysArr){
    cartToysArr.forEach(cartToy=>{
      cartToyName = cartToy.name; 
      //console.log(cartToyName)
    })
    
    return cartToyName;
  }
  
  toysData.forEach((toy) => {
    const toyCard = document.createElement("div");
    toyCard.classList = "toy-card";
    let toyName = toy.name;
    //let shortDescription = toy.shortDescription;
    let toyImage = toy.image;
    let toyPrice = toy.price;
    let longDescription = toy.longDescription;
    let toyId = toy.id;
    let toyComments = toy.comments;

    toyCard.innerHTML = `<div class="toy-details" id="toy-name">${toyName}</div>
                        <img src = "${toyImage}" class="toy-image">
                        <div class="toy-details" id="toy-price">Ksh: ${toyPrice} /-</div>
                        <button type="button" class="btn" id="view-toy">View Toy</button>
                        <button type="button" class="btn" id="add-to-cart">Add To Cart</button>
                        `;

    let addToCartBtn = toyCard.querySelector('#add-to-cart');
    let toyObj;


    function addToCart(toyObj){
      fetch(`http://localhost:3000/cart`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toyObj)})
      .then(res=>res.json())
      //.then(data=>console.log(data))
      }
      toyObj= {
        name: toyName,
        image: toyImage,
        description:longDescription,
        price: toyPrice,
        quantity: 1
      }   

      //console.log(addToCartBtn)
    addToCartBtn.addEventListener('click', e=>{
      addToCart(toyObj)
    })
    const viewToy = toyCard.querySelector("#view-toy");
    viewToy.addEventListener("click", (e) => {
      toysDisplay.innerHTML = ``;
      
      let rating = toy.rating;
      toysDisplay.innerHTML = `<div class="view-toy-details">
                                <div class="toy-details" id="toy-name">${toyName}</div>
                                <img src = "${toyImage}" class="toy-image-view">
                                <div class="toy-details" id="toy-price">Ksh: ${toyPrice} /-</div>
                                <h2>Description</h2>
                                <p class="decription">${longDescription}</p>
                                <div id="rating">Rating: ${rating} </div>
                                <form id="cart-form">
                                  <label for="quantity">Quantity: </label>
                                  <input type="number" id="quantity" value=1 required>
                                  <input type="submit" class="btn" id="add-cart" value="Add To Cart">
                                </form>
                                <button type="button" class="btn" id="view-cart">View Cart</button>
                               </div>
                               <div id="comments-div">
                                <form id="comment-form">
                                  <label for="comments-area">Add comment: </label><br>
                                    <textarea id="comments-area" required></textarea><br>
                                    <input type="submit" class="btn" id="add-comment" value="Comment">
                                  </form>
                                  <h3>Comments</h3>
                                  <ul id="comments">
                                  </ul>
                               </div 
                               <hr>
                               <h2>Similar Products</h2>`;
      
        //console.log(toyObj)
        let addcart = toysDisplay.querySelector('#cart-form');
        let viewCart = toysDisplay.querySelector('#view-cart');
        let commentForm = toysDisplay.querySelector('#comment-form');
        let comments = toysDisplay.querySelector('#comments');
        // populates comments from the db to the toy product
        let existingToyComments = toy.comments;
        //console.log(existingToyComments) 
        existingToyComments.forEach(existingComment=>{
          let newCommentList = document.createElement('li');
          newCommentList.textContent = existingComment;
          comments.appendChild(newCommentList)
        });
        addcart.addEventListener('submit', e=>{
          e.preventDefault();
          let quantity = toysDisplay.querySelector('#quantity').value;
          let quantityInt = parseInt(quantity, 10);
          //console.log(typeof quantityInt);
          toyObj= {
            name: toyName,
            image: toyImage,
            description:longDescription,
            price: toyPrice,
            quantity: quantityInt
          }
          if (toyObj.name != cartToyName){
            if(quantityInt<1){
              alert("Toy quantity cannot be less than 1");
            }else{
              addToCart(toyObj);
              viewCart.style.display = "block"
            }
            
          }else{
            alert("Product already in Cart ");
          }
          
        })
        viewCart.addEventListener('click', ()=>{
          location.href = "./public/cart.html"
        })

        //add comments
        commentForm.addEventListener('submit', e=>{
          
          let userComment = toysDisplay.querySelector('#comments-area').value;
          e.preventDefault();
          let commentList = document.createElement('li');
          if (userComment.trim()!= ""){
            commentList.textContent = userComment;
            updateComments.push(userComment);
            toy.comments.push(userComment) 
            patchComment(toy);
            //console.log(toy.comments);
          }
          comments.appendChild(commentList);
          
        })

        //function to patch comments on each toy
        function patchComment(toyInfo){
          fetch(`http://localhost:3000/toys/${toyInfo.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(toyInfo)
          })
          .then(res=>res.json())
          .then(infoData =>{
            //console.log(infoData)
          })
        }


        
    });
    toysDisplay.appendChild(toyCard);
    //console.log(toy)
  });
}
