//темная тема
const toggle = document.getElementById("toggle-theme");
const html = document.documentElement;

toggle.onclick = () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
};
//ховеры на чат
const chatItems = document.querySelectorAll(".chat-item, .contact-item");

chatItems.forEach((item) => {
  item.addEventListener("click", () => {
    chatItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
});
// модалка
const modalWindow = document.getElementById("modal-window");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");

openModal.addEventListener("click", () => {
  modalWindow.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modalWindow.classList.remove("active");
});
modalWindow.addEventListener("click", (e) => {
  if (e.target === modalWindow) {
    modalWindow.classList.remove("active");
  }
});
// Профиль (drawer)
const openBtn = document.getElementById("openProfile");
const drawer = document.getElementById("profileDrawer");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-profile");
function openDrawer() {
  drawer.classList.add("is-open");
  overlay.classList.add("is-open");
  document.body.classList.add("no-scroll");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  drawer.setAttribute("aria-hidden", "true");
}

openBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

//side nav
const openSideBarBtn = document.getElementById("side-nav");
const sideBar = document.querySelector(".chat-bar");
const closeSideBarBtn = document.getElementById("close-side-bar");
openSideBarBtn.addEventListener("click", () => {
  sideBar.classList.add("is-open");

  document.body.classList.add("no-scroll");
});
overlay.addEventListener("click", () => {
  sideBar.classList.remove("is-open");

  document.body.classList.remove("no-scroll");
});
closeSideBarBtn.addEventListener("click", () => {
  sideBar.classList.remove("is-open");

  document.body.classList.remove("no-scroll");
});

//выпадающее меню
const select = document.querySelector(".select");
const trigger = document.querySelector(".select-trigger");

if (select && trigger) {
  trigger.addEventListener("click", () => {
    select.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) select.classList.remove("open");
  });
}
//рандомные цвета 
const colors = [
  { bg: "rgb(217, 253, 217)", text: "rgb(0, 128, 0)" },   
  { bg: "rgb(199, 199, 251)", text: "rgb(0, 0, 180)" },   
  { bg: "rgb(255, 224, 224)", text: "rgb(180, 0, 0)" }   
];
document.querySelectorAll(".avatar-letters").forEach((el) => {
  const c = colors[Math.floor(Math.random() * colors.length)];
  el.style.backgroundColor = c.bg;
  el.style.color = c.text;
});