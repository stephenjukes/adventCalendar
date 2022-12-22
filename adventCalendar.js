const calendar = document.querySelector("#calendar");
const toast = document.querySelector("#toast");

const windows = [
    "candles.png",
    "cupcake.jpg",
    "hat.png",
    "robin.jpg",
    "snowman.jpg",
    "candy.jpg",
    "candyCane.jpg",
    "bauball1.png",
    "snowflake.jpg",
    "santaSack.jpg",
    "gloves.jpg",
    "reindeer.jpg",
    "holly.jpg",
    "bell.jpg",
    "christmasTree.jpg",
    "bauball2.jpg",
    "stocking.jpg",
    "star.png",
    "gingerbread.jpg",
    "clock.jpg",
    "flower.jpg",
    "teddy.jpg",
    "pinecone.jpg",
    "present.jpg",
    "santa.jpg"
];

for(let i = 0; i < windows.length; i++) { 
    const template = document.querySelector("template");
    const clone = template.content.cloneNode(true);
    
    const calendarWindow = clone.querySelector(".window");
    calendarWindow.style.order = random(100);    

    // date
    const displayDate = i + 1;
    const date = calendarWindow.querySelector(".date");
    date.innerText = displayDate;
    calendarWindow.id = displayDate;

    // content
    const content = calendarWindow.querySelector(".window-content");
    content.style.background = `url("images/${windows[i]}") no-repeat center`;
    content.style.backgroundSize = "cover";

    calendar.appendChild(clone);
}

calendar.addEventListener("click", handleOpen);

function handleOpen(event) {
    const calendarWindow = event.target.closest(".window");
    const dateOpened = Number(calendarWindow.id);

    const isValid = isValidOpen(dateOpened);
    if (!isValid) return;

    const cover = calendarWindow.querySelector(".window-cover");
    cover.classList.add("open");
}

function isValidOpen(dateOpened) {
    const arrived = hasArrived(dateOpened);
    if (!arrived) return false;

    const next = isNext(dateOpened);
    if (!next) return false;

    return true;
}

function hasArrived(dateOpened) {
    const today = new Date();
    const isAdvent = today.getMonth() == 11;
    const date = today.getDate();

    if (isAdvent && dateOpened > date) {
        showToast("Patience, patience. We haven't got there yet!");
        return false;
    }
 
    return true;
}

function isNext(dateOpened) {
    const lastOpened = [...document.querySelectorAll(".open")]
        .map(open => open.closest(".window").id)
        .sort((a, b) => b - a);

    console.log(lastOpened);

    const nextToOpen = lastOpened[0] + 1 || 1;

    if (dateOpened > nextToOpen) {
        showToast(`Hey, you haven't opened number ${nextToOpen} yet!`);
        return false;
    }

    return true;
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function showToast(message) {
    toast.innerHTML = message;
    toast.style.display = "block";
    
    setTimeout(_ => {
        toast.style.display = "none";
    }, 2000);
}