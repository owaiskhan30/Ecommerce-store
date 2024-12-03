const div = document.querySelector(".single-products");
let singleproductdata = localStorage.getItem("productId");
let pageHeader = document.querySelector(".pageHeader");


fetch(`https://dummyjson.com/products/${singleproductdata}`)
.then(res => res.json())
.then((res) => {
    pageHeader.innerHTML = `${res.title}`;
        div.innerHTML += `
        <div class="single-product" id="card_${res.id}">
            <div class="product_thumb">
                <img src="${res.thumbnail}">
            </div>
            <div class="product_description">
                <h2 class="title">${res.title}</h2>
                <p>${res.description}</p>
                <h1>Price: $${res.price}</h1>
                <div class="product_details">
                    <h2>Category: ${res.category}</h2>
                    <h2>Stock: ${res.stock}</h2>
                    <h2>Brand: ${res.brand }</h2>
                    <h2>Rating: ${res.rating}</h2>
                    <h2>Sku: ${res.sku}</h2>
                    <h2>Warranty Information: ${res.warrantyInformation}</h2>
                    <h2>Shipping Information: ${res.shippingInformation}</h2>
                    <h2>Availability Status: ${res.availabilityStatus}</h2>
                </div>
            </div>
        </div>`  
});