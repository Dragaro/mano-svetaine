document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("commissionForm");
  const successMessage = document.getElementById("successMessage");

  // CAPTCHA klausimas ir atsakymas
  const captchaQuestion = "Kiek yra 7 + 3?";
  const captchaAnswer = "10";

  // Sukuriam CAPTCHA lauką dinamiškai ir įdedam prieš mygtuką
  const formBlock = form;
  const captchaDiv = document.createElement("div");
  captchaDiv.classList.add("field");
  captchaDiv.innerHTML = `
    <label for="captchaInput">${captchaQuestion}</label>
    <input type="text" id="captchaInput" name="captchaInput" required />
  `;
  formBlock.insertBefore(captchaDiv, formBlock.querySelector("button[type='submit']"));

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const captchaInput = form.captchaInput.value.trim();

    // Funkcija klaidoms rodyti
    function showError(field, message) {
      if (!field.nextElementSibling || !field.nextElementSibling.classList.contains("error-msg")) {
        const errorElem = document.createElement("p");
        errorElem.classList.add("error-msg");
        errorElem.style.color = "red";
        errorElem.style.fontSize = "0.9em";
        errorElem.textContent = message;
        field.parentNode.appendChild(errorElem);
      } else {
        field.nextElementSibling.textContent = message;
      }
      field.focus();
    }

    // Išvalom ankstesnes klaidas
    const errors = form.querySelectorAll(".error-msg");
    errors.forEach((el) => el.remove());

    // Tikrinam vardą ir pavardę (tik raidės ir tarpai)
    const nameRegex = /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s]+$/;

    if (!firstName) {
      showError(form.firstName, "Vardas privalomas.");
      return;
    } else if (!nameRegex.test(firstName)) {
      showError(form.firstName, "Varde gali būti tik raidės ir tarpai.");
      return;
    }

    if (!lastName) {
      showError(form.lastName, "Pavardė privaloma.");
      return;
    } else if (!nameRegex.test(lastName)) {
      showError(form.lastName, "Pavardėje gali būti tik raidės ir tarpai.");
      return;
    }

    // Telefonas (pagal pattern)
    const phoneRegex = /^\+?[0-9\s\-]{8,15}$/;
    if (!phone) {
      showError(form.phone, "Telefono numeris privalomas.");
      return;
    } else if (!phoneRegex.test(phone)) {
      showError(form.phone, "Telefono numeris netinkamas.");
      return;
    }

    // El. paštas
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email) {
      showError(form.email, "El. paštas privalomas.");
      return;
    } else if (!emailRegex.test(email)) {
      showError(form.email, "Įveskite galiojantį el. pašto adresą.");
      return;
    }

    // Žinutė (leidžiame raidės, skaičiai ir paprastus skyrybos ženklus)
    const messageRegex = /^[a-zA-Z0-9ąčęėįšųūžĄČĘĖĮŠŲŪŽ\s.,!?]+$/;
    if (!message) {
      showError(form.message, "Aprašymas privalomas.");
      return;
    } else if (!messageRegex.test(message)) {
      showError(form.message, "Aprašyme yra neleistinų simbolių.");
      return;
    }

    // CAPTCHA validacija
    if (captchaInput !== captchaAnswer) {
      showError(form.captchaInput, "Neteisingas CAPTCHA atsakymas.");
      return;
    }

    // Jeigu viskas gerai, rodome sėkmės pranešimą
    successMessage.style.display = "block";

    // Čia gali pridėti tikrą formos siuntimą, pvz.: form.submit();
    // arba AJAX siuntimą. Dabar formos siuntimas sustabdytas, kad matytum pranešimą.
  });
});
