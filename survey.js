function validateSurveyForm() {

  const form = document.getElementById('surveyForm');
  const fields = form.querySelectorAll('[name="surveyField"]');

  let hasEmptyField = false; 
  const feedbackText = document.getElementById("feedback");


  feedbackText.innerText = "";
  feedbackText.style.color = "red";
  fields.forEach(field => field.classList.remove("error"));

 
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].value.trim() === "") {
      fields[i].classList.add("error");
      hasEmptyField = true;
    }
  }

  if (hasEmptyField) {
    feedbackText.innerText = "Please fill out all fields.";
  } else {
    feedbackText.style.color = "limegreen";
    feedbackText.innerText = "Thank you! Your response has been submitted.";
    form.reset();
  }
}
