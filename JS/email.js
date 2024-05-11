function sendData() {
  let email = document.getElementById("email2");
  let emailValue = email.value;
  console.log(emailValue);
  fetch("http://localhost:8000/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      let message = document.getElementById("EmailSuccess");
      message.innerHTML = `${data.message}`;
    });
  email.value = "";
}
