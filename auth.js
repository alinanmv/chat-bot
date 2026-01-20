const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const themeInput = document.getElementById("theme");
const toggle = document.getElementById("toggle-theme");
const submitBtn = document.getElementById("submit-button");
const html = document.documentElement;
//темная тема
toggle.onclick = () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
};
//

//валидация
submitBtn.addEventListener("click", () => {
  if (loginInput.value.trim() === "" || passwordInput.value.trim() === "") {
    alert("please fill in all fields");
  } else {
    window.location.href = "index.html";
  }
});
