const toysDisplay = document.getElementById("toys-display");

fetch(`http://localhost:3000/toys`)
  .then((res) => res.json())
  .then((toysData) => {
    displayToys(toysData);
  });

function displayToys(toysData) {
  toysData.forEach((toy) => {
    const toyCard = document.createElement("div");
    toyCard.classList = "toy-card";
    let toyName = toy.name;
    //let shortDescription = toy.shortDescription;
    let toyImage = toy.image;
    let toyPrice = toy.price;

    toyCard.innerHTML = `<img src = "${toyImage}" class="toy-image">
                             <div class="toy-details" id="toy-price">Ksh: ${toyPrice} /-</div>
                             <div class="toy-details" id="toy-name">${toyName}</div>
                             <button type="button" class="btn" id="view-toy">View Toy</button>
                             <button type="button" class="btn" id="add-to-cart">Add To Cart</button>
                            `;
    const viewToy = toyCard.querySelector("#view-toy");
    viewToy.addEventListener("click", (e) => {
      toysDisplay.innerHTML = ``;
      let longDescription = toy.longDescription;
      let rating = toy.rating;
      toysDisplay.innerHTML = `<div class="view-toy-details">
                                        <img src = "${toyImage}" class="toy-image-view">
                                        <div class="toy-details" id="toy-price">Ksh: ${toyPrice} /-</div>
                                        <div class="toy-details" id="toy-name">${toyName}</div>
                                        <h2>Description</h2>
                                        <p class="decription">${longDescription}</p>
                                        <div id="rating">Rating: ${rating} </div>
                                        <button type="button" class="btn" id="add-cart">Add To Cart</button>
                                    </div>
                                    <hr>
                                    <h2>Similar Products</h2>
                                    `;
        // TODO add cart
        function updateCart(){

        }
    });
    toysDisplay.appendChild(toyCard);
    //console.log(toy)
  });
}
