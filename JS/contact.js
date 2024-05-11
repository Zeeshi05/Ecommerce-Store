let form = document.getElementById("contactForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  let name = formData.get("name");
  let email = formData.get("email");
  let subject = formData.get("subject");
  let message = formData.get("message");
  console.log(name, email, subject);
  resetForm();
  fetch("http://localhost:8000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      subject: subject,
      message: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      // document.getElementById("message").value = "";
      resetForm();
    });
});

function resetForm() {
  form.reset();
  const success = (document.getElementById("success").innerHTML =
    "Message Sent Successfully");
  console.log(success);
}
