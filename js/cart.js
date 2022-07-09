fetch(`http://localhost:3000/cart`)
.then(res=>res.json())
.then(cartData=>{
    displayCart(cartData)
})

//get div elements
const cartDisplay = document.getElementById('toys-display');
const price = document.getElementById('total');

function displayCart(cartData){
    cartData.forEach(cartObj => {
        let cartCard = document.createElement('div');
        cartCard.className = "toy-card";

        //get the data from the cart object
        const toyName = cartObj.name;
        const toyPrice = cartObj.price;
        const toyImage = cartObj.image;
        const description = cartObj.description;
        const toyId = cartObj.id;
        const toyQuantity = cartObj.quantity;

        cartCard.innerHTML=`<div class="toy-details" id="toy-name">Ksh: ${toyName} /-</div>
                            <img src = "${toyImage}" class="toy-image">
                            <div class="toy-details" id="toy-price">Ksh: ${toyPrice} /-</div>
                            <div class="toy-details" id="toy-quantity">Qunatity: ${toyQuantity}</div>
                            <button type="button" class="btn" id="view-desc">View Description</button>
                            <div class="desc">${description}</div>
                            <button type="button" class="btn" id="rmv-toy">Remove From Cart</button>`
        
        // show and hide toy description
        const showBtn = cartCard.querySelector('#view-desc');
        showBtn.addEventListener('click', (e)=>{
            const desc = cartCard.querySelector('.desc');
            if (desc.style.display==="none"){
                desc.style.display = "block";
                showBtn.textContent = "Hide description";
            }else{
                desc.style.display = "none";
                showBtn.textContent = "View Description";
            }
        })
        
        // function to remove toy
        function removeToy(cartObj){
            fetch(`http://localhost:3000/cart/${toyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(cartObj)
            })
            .then(res=>res.json())
            
        }
        // remove toy from cart
        const rmvBtn = cartCard.querySelector('#rmv-toy');
        rmvBtn.addEventListener('click', ()=>{

            let choice = confirm('Are you sure you want to remove item from cart?');
            console.log(choice)
            if(choice===true){
                cartCard.remove();
                removeToy(cartObj);
                location.reload()
                
            }
            
        })
        //append cart card to the html document
        cartDisplay.appendChild(cartCard);
    });

    // calculate the total price of the cart items
    function findTotal(total){
        //let cartToyPrice;
        //let cartToyQuantity;
        total = 0;
        cartData.forEach(cartToy=>{
            let cartToyPrice = cartToy.price * cartToy.quantity;
            total += cartToyPrice;
            //console.log(total);
        })
        console.log(total);
        price.textContent = `Total Price: Ksh ${total} /-`
        return total;
    }
    findTotal()
    //cartData.reduce(findTotal)
}