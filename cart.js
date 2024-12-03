// Retrieve cart data from localStorage
const get_data = localStorage.getItem("Cart Products");
const convert_data = JSON.parse(get_data) || [];
console.log(convert_data);

const cartItem = document.querySelector("table tbody");
const totalPrice = document.querySelector(".totalPrice");
const productCount = document.querySelector(".count");
const productQuanity = document.getElementsByClassName("increment");
const productCardPrice = document.getElementsByClassName("price");

// Function to render cart items
function render(renderproduct) {
    cartItem.innerHTML = "";
    let i = 1; 
    renderproduct.map((item, index) => {
        cartItem.innerHTML += `
        <tr>
            <td class="product_serno">${i}</td>
            <td class="product_image"><img src="${item.thumbnail}" alt="${item.title}" /></td>
            <td class="product_description">
                <div class="product_details">
                    <h2>Name: ${item.title}</h2>
                    <h2>Brand: ${item.brand}</h2>
                    <h2>Description: ${item.description}</h2>
                </div>
                <div class="removeItem">
                    <button onclick="removeItem(${index})">Remove Item</button>
                </div>
            </td>
            <td class="product_quantity">
                <h2 class="quantityHead">
                    <span class="quantity">
                        <button onclick="quantityDecrement(${index})">-</button>
                        <span class="increment">${item.quantity}</span>
                        <button onclick="quantityIncrement(${index})">+</button>
                    </span>
                </h2>
            </td>
            <td class="total_price">
                <h1 class="price">$${item.price * item.quantity}</h1>
            </td>
        </tr>`;
        i++;
    });

    calculateTotalPrice();
    updateCartCount();
}

// Function to increment product quantity
function quantityIncrement(index) {
    convert_data[index].quantity += 1;
    productQuanity[index].innerHTML = convert_data[index].quantity;
    productCardPrice[index].innerHTML = "$" + (convert_data[index].price * convert_data[index].quantity);

    // Save updated cart to localStorage
    localStorage.setItem("Cart Products", JSON.stringify(convert_data));
    calculateTotalPrice();
    updateCartCount();
}

// Function to decrement product quantity
function quantityDecrement(index) {
    convert_data[index].quantity -= 1;

    if (convert_data[index].quantity > 0) {
        productQuanity[index].innerHTML = convert_data[index].quantity;
        productCardPrice[index].innerHTML = "$" + (convert_data[index].price * convert_data[index].quantity); // Update total price for that row
    } else {
        convert_data.splice(index, 1);
        render(convert_data);
    }

    // Save updated cart to localStorage
    localStorage.setItem("Cart Products", JSON.stringify(convert_data));
    calculateTotalPrice();
    updateCartCount();
}

// Function to remove an item from the cart
function removeItem(index) {
    convert_data.splice(index, 1);
    render(convert_data);

    if (convert_data.length > 0) {
        localStorage.setItem("Cart Products", JSON.stringify(convert_data));
    } else {
        localStorage.removeItem("Cart Products");
        cartItem.innerHTML = "";
        totalPrice.innerHTML = "Total Price: $0";
    }

    updateCartCount();
}

// Function to calculate total price
function calculateTotalPrice() {
    const total = convert_data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    totalPrice.innerHTML = "Total Price: " + formattedTotal;
}

// Function to update cart count
function updateCartCount() {
    const totalQuantity = convert_data.reduce((acc, item) => acc + item.quantity, 0);
    productCount.innerHTML = totalQuantity;
}

// Initial render of the cart
render(convert_data);
