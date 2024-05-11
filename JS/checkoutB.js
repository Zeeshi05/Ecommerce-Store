const form = document.getElementById("checkoutForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const country = formData.get("country");
  const city = formData.get("city");
  const price = document.getElementById("price");
  const priceValue = price.textContent || price.innerHTML;
  console.log(name, priceValue);

  fetch("http://localhost:8000/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      address: address,
      country: country,
      city: city,
      price: priceValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);

      // Reset form fields
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("address").value = "";
      document.getElementById("country").value = "";
      document.getElementById("city").value = "";

      // Reset form-specific content
    });
  resetForm();
});

function resetForm() {
  form.reset();
  console.log("Hello world");
  let totalPriceHTML = document.querySelector(".totalPrice");
  totalPriceHTML.innerHTML = "$0";

  // Assuming you want to remove all items from the list
  let list = document.querySelector(".list");
  list.innerHTML = "";
  console.log(list);
  document.cookie = "listCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  console.log("Cookie removed");
}
