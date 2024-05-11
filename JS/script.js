let iconCart = document.querySelector(".iconCart");
let cart = document.querySelector(".cart");
let container = document.querySelector(".container");
let close = document.querySelector(".close");

iconCart.addEventListener("click", function () {
  if (cart.style.right == "-100%") {
    cart.style.right = "0";
    container.style.transform = "translateX(-400px)";
  } else {
    cart.style.right = "-100%";
    container.style.transform = "translateX(0)";
  }
});
close.addEventListener("click", function () {
  cart.style.right = "-100%";
  container.style.transform = "translateX(0)";
});

let products = null;

fetch("../product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  });
  console.log(products);
console.log("Zeeshan khan");
function addDataToHTML() {
  displayProductsInSection("shirt", "#product1", 4); // Limiting to 4 products
  displayProductsInSection("watch", "#product2", 4); // Limiting to 4 products
}

function displayProductsInSection(category, sectionId, limit) {
  let listProductHTML = document.querySelector(`${sectionId} .listProducth`);
  listProductHTML.innerHTML = "";

  let filteredProducts = products.filter(
    (product) => product.category === category
  );

  // Limit the number of products to 'limit'
  filteredProducts = filteredProducts.slice(0, limit);

  filteredProducts.forEach((product) => {
    let newProduct = document.createElement("div");
    newProduct.classList.add("pro");

    newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    ${generateStars(product.rating)} 
                </div>
                <h4 class="price">$${product.price}</h4>
                <button onclick="addCart(${product.id})">Add To Cart</button>
            </div>
        `;

    listProductHTML.appendChild(newProduct);
  });
}

function generateStars(rating) {
  let starsHTML = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsHTML += '<i class="fa fa-star"></i>';
    } else {
      starsHTML += '<i class="fa fa-star-o"></i>';
    }
  }
  return starsHTML;
}

let listCart = [];
function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  } else {
    listCart = [];
  }
}
checkCart();
function addCart($idProduct) {
  let productsCopy = JSON.parse(JSON.stringify(products));

  if (!listCart[$idProduct]) {
    listCart[$idProduct] = productsCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    listCart[$idProduct].quantity = 1;
  } else {
    listCart[$idProduct].quantity++;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

  addCartToHTML();
}
addCartToHTML();
function addCartToHTML() {
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";

  let totalHTML = document.querySelector(".totalQuantity");
  let totalQuantity = 0;

  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
      }
    });
  }
  totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type) {
  switch ($type) {
    case "+":
      listCart[$idProduct].quantity++;
      break;
    case "-":
      listCart[$idProduct].quantity--;

      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;

    default:
      break;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  addCartToHTML();
}

// Shop page setup
let originalProducts = null;
let shopPageProduct = null;
const productsPerPage = 8; // Display products per page
let currentPage = 1;

async function fetchData() {
  try {
    const response = await fetch("../product.json");
    const data = await response.json();
    originalProducts = data;
    shopPageProduct = [...originalProducts];
    handlePagination(1);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("productContainer");

  if (!productContainer || !Array.isArray(products)) {
    console.error("Container or product data not found");
    return;
  }

  productContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);

  for (let i = 0; i < productsToDisplay.length; i++) {
    const product = productsToDisplay[i];
    const productDiv = document.createElement("div");
    productDiv.className = "pro";

    productDiv.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="des">
          <span>${product.brand}</span>
          <h5>${product.name}</h5>
          <div class="star">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
          </div>
          <h4 class="price">$${product.price.toFixed(2)}</h4>
          <button onclick="addCart(${product.id})">Add To Cart</button>
      </div>
    `;

    // Add click event listener to the product image
    productDiv.querySelector("img").addEventListener("click", function () {
      // Encode product data in URL
      const encodedProductData = encodeURIComponent(JSON.stringify(product));

      // Redirect to single product page with product data in query parameter
      window.location.href = `sproduct.html?product=${encodedProductData}`;
    });

    productContainer.appendChild(productDiv);
  }
}

function updatePaginationNumbers() {
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");

  if (currentPage === 1) {
    page1.textContent = "1";
    page2.textContent = "2";
  } else {
    page1.textContent = currentPage - 1;
    page2.textContent = currentPage;
  }
}

function handlePagination(pageNumber) {
  currentPage = pageNumber;
  updatePaginationNumbers();
  displayProducts(shopPageProduct);
}

function filterProductsByKeyword(keyword) {
  return originalProducts.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

function handleSearchInput() {
  const searchInput = document
    .getElementById("search-products")
    .value.trim()
    .toLowerCase();

  // If search input is not empty, filter products
  if (searchInput !== "") {
    shopPageProduct = filterProductsByKeyword(searchInput);
  } else {
    // If search input is empty, restore original products
    shopPageProduct = [...originalProducts];
  }

  handlePagination(1); // Reset pagination to the first page
  displayProducts(shopPageProduct);
}

function filterProductsByCategory(products, category) {
  return category === "all"
    ? products
    : products.filter((product) => product.category === category);
}

function handleCategoryFilter() {
  const categoryFilter = document.getElementById("category");
  const selectedCategory = categoryFilter.value;

  shopPageProduct = filterProductsByCategory(
    originalProducts,
    selectedCategory
  );

  handlePagination(1); // Reset pagination to the first page
  displayProducts(shopPageProduct);
}

// Event listeners for pagination
document.getElementById("page1").addEventListener("click", function (event) {
  event.preventDefault();
  handlePagination(1);
});

document.getElementById("page2").addEventListener("click", function (event) {
  event.preventDefault();
  handlePagination(2);
});

document.getElementById("nextPage").addEventListener("click", function (event) {
  event.preventDefault();
  handlePagination(currentPage + 1);
});

// Event listener for search input
document
  .getElementById("searchForm")
  .addEventListener("input", handleSearchInput);

// Event listener for category filter
document
  .getElementById("category")
  .addEventListener("change", handleCategoryFilter);

// Fetch data and initialize
fetchData();

function openWhatsApp() {
  window.open("https://wa.me/+923453599742", "_blank");
}
