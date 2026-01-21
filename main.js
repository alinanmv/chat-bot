//темная тема
const toggle = document.getElementById("toggle-theme");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
}
toggle.onclick = () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
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

//tapalka na chati 
const chat = document.querySelector(".chat");
const chatSelect = document.querySelector(".select-chat");
const chatList = document.querySelector(".chats"); 

chatList.addEventListener("click", (e) => {
  const item = e.target.closest(".chat-item");
  if (!item) return;


  chatList.querySelectorAll(".chat-item, .contact-item").forEach((el) => el.classList.remove("active"));
  item.classList.add("active");


  chat.style.display = "flex";      
  chatSelect.style.display = "none";
});



function getCookie(key) {
	return document.cookie.split(';').find(f => f?.split('=')[0] === key)?.split('=')[1]
}
function timeAgo(date) {
  const now = new Date().getTime()
  const past = new Date(date).getTime()
  const diff = Math.floor((now - past) / 1000) // секунды

  if (diff < 60) {
    return `${diff} сек назад`
  }

  const minutes = Math.floor(diff / 60)
  if (minutes < 60) {
    return `${minutes} мин назад`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} ч назад`
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return `${days} дн назад`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months} мес назад`
  }

  const years = Math.floor(months / 12)
  return `${years} г назад`
}
async function init_chats() {
	const token = getCookie('token')
	try {
		const response = await fetch(BASEURL + '/chats', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		const res = await response.json()
		let items = ''
		res.forEach(f => {
			const client = f.participants.find(f => f.meta.role !== 'STAFF')
			const avatar_letters = client.name.split(' ').map(item => item[0]).join('')
			items += `
				<div class="chat-item flex-side">
					<div class="img-wrapper">
						<div class="avatar-letters">${avatar_letters}</div>
						<div class="circle" style="background-color: rgb(3, 194, 3);border: 2px solid white;width: 8px;height: 8px;border-radius: 50%;right: -2px;top: 30px;position: absolute;">
						</div>
					</div>
					<div class="data">
						<div class="name flex-side space">
							<strong>${client.name}</strong>
							<p class="last-time">${timeAgo(client.meta.created_at)}</p>
						</div>
						<p>${f.topic.slice(0, 28)} ...</p>
					</div>
				</div>
			`
		})
		document.getElementById('chat-list').innerHTML += items
	} catch (err) {
		console.log(err)
	}
}
init_chats()

