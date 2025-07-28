   const scriptURL = "https://script.google.com/macros/s/AKfycbzaKlnSL4KkUCw-oPIv3slZkcyQ42ys8qOaprO_CByPhoz_CuyHe644OWWcLxNLy2TrFw/exec";
   const form = document.getElementById("surveyForm");
   const responseMsg = document.getElementById("feedback");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const isValid = validateContactForm();
      if (!isValid) return;

      const isConfirmed = confirm("Are you sure you want to send this message?");
      if (!isConfirmed) {
        responseMsg.style.color = "orange";
        responseMsg.textContent = "Message not sent. You can review your inputs.";
        return;
      }

      // Show the preloader after form submission
      const preloader = document.getElementById("preloader");
      preloader.style.display = "flex"; // Show preloader
      preloader.style.opacity = "1"; // Make sure preloader is visible

      const formData = new FormData(form);

      fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(formData)
      })
        .then(res => res.json())
        .then(data => {
          // Hide the preloader once submission is complete
          preloader.style.opacity = "0";
          setTimeout(() => preloader.style.display = "none", 500); // Hide after fade out

          responseMsg.style.color = "green";
          responseMsg.textContent = "Message sent successfully!";
          form.reset();
        })
        .catch(error => {
          // Hide the preloader in case of an error
          preloader.style.opacity = "0";
          setTimeout(() => preloader.style.display = "none", 500);

          responseMsg.style.color = "red";
          responseMsg.textContent = "Error sending message.";
          console.error("Error!", error.message);
        });
    });

    function validateContactForm() {
function validateContactForm() {
  const fields = form.querySelectorAll('#name, #email, #message');
  let allFilled = true;
  let validEmail = true;

  responseMsg.textContent = "";
  responseMsg.style.color = "red";

  fields.forEach(field => field.classList.remove("error"));

  fields.forEach(field => {
    if (field.value.trim() === "") {
      field.classList.add("error");
      allFilled = false;
      alert(`Please fill out the ${field.previousElementSibling.innerText.toLowerCase()} field.`);
    }
  });

  const emailField = document.getElementById("email");
  const emailValue = emailField.value.trim();

  if (!emailValue.includes("@")) {
    emailField.classList.add("error");
    validEmail = false;
    alert("Please enter a valid email address.");
  }

  if (!allFilled || !validEmail) {
    responseMsg.textContent = !allFilled
      ? "Please fill out all fields."
      : "Please enter a valid email address.";
    return false;
  }

  return true;
}
