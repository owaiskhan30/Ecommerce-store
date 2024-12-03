const div = document.querySelector(".products");
let allProducts = "";

fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then((res) => {
        res.products.map(function (item, index) {
            div.innerHTML += `
            <div class="card" id="card_${item.id}">
                <img src="${item.thumbnail}">
                <h2 class="title">${item.title}</h2>
                <h2>Category: ${item.category}</h2>
                <h2>Rating: ${item.rating}</h2>
                <h2>Stock: ${item.stock}</h2>
                <h2>Brand: ${item.brand}</h2>
                <h1>Price: $${item.price}</h1>
                <button onclick="productDetails(${item.id})">Read More</button>
                <button onclick="addtocart(${index})">Add To Cart</button>
            </div>`;
        });

        allProducts = res.products;
    })
    .catch((error) => {
        console.error("Error fetching products:", error);
    });

function productDetails(id) {
    localStorage.setItem("productId", id);
    window.location = "single-product.html";
}

// Cart functionality
let cart_product = [];
const savedCart = JSON.parse(localStorage.getItem("Cart Products"));
cart_product = savedCart ? [...savedCart] : [];

// Initialize product count
let productCount = document.querySelector(".count");
updateCartCount();

function addtocart(index) {
    const productIndex = cart_product.findIndex(item => item.id === allProducts[index].id);
    if (productIndex === -1) {
        // Add new product to the cart
        allProducts[index].quantity = 1;
        cart_product.push(allProducts[index]);
    } else {
        // Increment quantity for an existing product
        cart_product[productIndex].quantity++;
    }

    // Save updated cart to localStorage
    localStorage.setItem("Cart Products", JSON.stringify(cart_product));
    updateCartCount();

    // Show success alert
    Swal.fire({
        title: `${allProducts[index].title} Added`,
        text: "Product added to cart successfully!",
        icon: "success",
    });
}

function updateCartCount() {
    const totalQuantity = cart_product.reduce((acc, item) => acc + item.quantity, 0);
    productCount.innerHTML = totalQuantity;
}

function Checkout() {
    if (!cart_product.length) {
        Swal.fire({
            title: "Product Not Selected",
            text: "Please Select The Product First",
            icon: "question"
        });
    } else {
        localStorage.setItem("Cart Products", JSON.stringify(cart_product));
        window.location = "cart.html";
    }
}

// Add event listener to Checkout button
let CheckoutBtn = document.querySelector(".icons");
CheckoutBtn.addEventListener('click', Checkout);
