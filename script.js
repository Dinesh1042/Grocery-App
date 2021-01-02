const formEl = document.getElementById("form");
const inputTextEl = document.getElementById("inputText");
const ulEl = document.getElementById("items");
const submitBtnEl = document.getElementById("submitBtn");
const popupCont = document.getElementById("popupCont");
const imgEl = document.getElementById("emptyimg");

let editFlag = false;
let editValue = "";
let editElem = "";
let editId = "";

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addGrocery();
});

function addGrocery() {
  const elemId = new Date().getTime().toString(16);

  if (inputTextEl.value && !editFlag && !inputTextEl.value.match(/^\s*$/g)) {
    imgEl.style.display = "none";
    createGrocery(inputTextEl.value, elemId);
    setLocal(inputTextEl.value, elemId);
    popup(inputTextEl.value + " has been added", "add");
    inputTextEl.value = "";
  } else if (
    inputTextEl.value &&
    editFlag &&
    !inputTextEl.value.match(/^\s*$/g)
  ) {
    let currentValue = inputTextEl.value;
    editElem.innerHTML = currentValue;
    editFlag = false;
    inputTextEl.value = "";
    console.log(editId);
    submitBtnEl.innerText = "Add Item";
    popup("Item has been edited", "add");
    editLocal(editId, currentValue);
  } else {
    popup("Grocery input cannot be empty value", "remove");
    formEl.style.backgroundColor = `rgba(220, 20, 60, 0.356)`;
    submitBtnEl.style.background = "rgba(220, 20, 60, 0.712)";
    setTimeout(() => {
      formEl.style.backgroundColor = `rgb(201, 225, 247)`;
      submitBtnEl.style.background = "rgb(127, 181, 199)";
    }, 1000);
  }
}

function createGrocery(value, id) {
  const liEl = document.createElement("li");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  const para = document.createElement("p");
  para.innerHTML = value;
  liEl.appendChild(para);
  liEl.setAttributeNode(attr);
  const icon = document.createElement("div");
  icon.classList.add("icon");
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.innerHTML = `<ion-icon id="edit" class="edit" name="create"></ion-icon>`;
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerHTML = `<ion-icon
  id="delete" class="delete"
  name="trash"></ion-icon>`;
  icon.appendChild(editBtn);
  icon.appendChild(deleteBtn);

  liEl.appendChild(icon);
  ulEl.prepend(liEl);

  deleteBtn.addEventListener("click", (e) => {
    let currentEl = e.currentTarget.parentElement.parentElement;
    currentEl.remove();
    removeLocal(currentEl.dataset.id);
    popup("Item has been deleted", "remove");

    let local = getLocal();

    if (local.length === 0) {
      imgEl.style.display = "flex";
    }
  });
  editBtn.addEventListener("click", (e) => {
    editElem = e.currentTarget.parentElement.previousSibling;
    inputTextEl.value = editElem.textContent;
    editId = e.currentTarget.parentElement.parentElement.dataset.id;
    editFlag = true;
    inputTextEl.focus();
    submitBtnEl.innerText = "Edit Item";
  });
}

function getLocal() {
  return localStorage.getItem("Grocery")
    ? JSON.parse(localStorage.getItem("Grocery"))
    : [];
}

function setLocal(value, id) {
  const saveLocal = { id, value };
  const local = getLocal();
  local.push(saveLocal);
  localStorage.setItem("Grocery", JSON.stringify(local));
}

function removeLocal(id) {
  let local = getLocal();
  local = local.filter((item) => {
    if (id !== item.id) {
      return item;
    }
  });
  localStorage.setItem("Grocery", JSON.stringify(local));
}

function editLocal(id, value) {
  let local = getLocal();

  local = local.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("Grocery", JSON.stringify(local));
}

function setLocalElement() {
  const local = getLocal();
  if (local.length >= 1) {
    local.forEach((item) => {
      imgEl.style.display = "none";
      createGrocery(item.value, item.id);
    });
  }
}
setLocalElement();

function popup(value, action) {
  const popupEl = document.createElement("p");
  popupEl.setAttribute("id", "popup");
  popupEl.innerText = value;
  popupEl.classList.add(action);
  popupCont.appendChild(popupEl);
  popupEl.style.animation = `popup 1.3s ease`;

  popupEl.addEventListener("animationend", (e) => {
    popupEl.remove();
  });
}

window.addEventListener("keydown", (e) => {
  inputTextEl.focus();
});



let array = ["sor","sort","sortge"];


console.log(array.filter((items)=>{
 return items == "so"
}));