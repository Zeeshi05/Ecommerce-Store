// Retrieve encoded product data from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const encodedProductData = urlParams.get("product");

if (encodedProductData) {
  try {
    // Decode and parse product data
    const productData = JSON.parse(decodeURIComponent(encodedProductData));

    // Populate single product page with the retrieved product data
    document.getElementById("mainimg").src = productData.image;
    document.querySelector(".single-pro-detail h6").textContent = productData.category;
    document.querySelector(".single-pro-detail h4").textContent = `${productData.name}`;
    document.querySelector(".single-pro-detail h2").textContent = `$${productData.price.toFixed(2)}`;
    document.querySelector(".single-pro-detail span").textContent = productData.description;

    // Add event listener to the "Buy Now" button
    document.getElementById("buyNowButton").addEventListener("click", function() {
      // Retrieve the selected quantity
      const quantity = parseInt(document.getElementById("quantityInput").value);

      // Add product to the cart with the selected quantity
      addProductToCart(productData, quantity);

      // Redirect to the checkout page
      window.location.href = "checkout.html";
    });
  } catch (error) {
    console.error('Error parsing product data:', error);
  }
} else {
  console.error('Product data not found in URL');
}

// Function to add product to the cart
function addProductToCart(productData, quantity) {
  let listCart = [];

  // Retrieve existing cart data from cookie
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));

  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  }

  // Add new product to the cart with the selected quantity
  listCart.push({
    id: productData.id, // Assuming each product has a unique id
    name: productData.name,
    price: productData.price,
    image: productData.image,
    quantity: quantity // Selected quantity
  });

  // Store updated cart data in cookie
  document.cookie = `listCart=${JSON.stringify(listCart)}; path=/`;
}
