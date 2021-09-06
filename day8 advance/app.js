const labels = document.querySelectorAll(".form-control label");
const passwords = document.getElementById("passwords");
const show = document.getElementById("show");
const hide = document.getElementById("hide");
labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, i) =>
        `<span style="transition-delay: ${i * 50}ms">${letter}</span>`
    )
    .join("");
});

show.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    hide.style = "display:none";
  } else {
    password.type = "password";
    hide.style = "display:block";
  }
});
