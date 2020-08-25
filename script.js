const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");


const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];
console.log(richestPeople);
let dragStartIndex;

// Store listitems
const listItems = [];

createList();
function createList() {
  const copyRichestPeople = [...richestPeople];

  const randomNumArr = copyRichestPeople.map((item) => ({
    personName: item,
    num: Math.random(),
  }));
  // console.log(randomNumArr);

  const sortedArr = randomNumArr.sort((a, b) => a.num - b.num);
  // console.log(sortedArr);

  const finalArr = sortedArr.map((item) => item.personName);
  // console.log(finalArr);

  finalArr.forEach((people, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", index);
    li.innerHTML += `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${people}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
  `;
    draggable_list.appendChild(li);
    listItems.push(li);
  });

  addEventListeners();
}
//drag and drop
function dragStart() {
  dragStartIndex = this.closest("li").getAttribute("data-index");
  // console.log(dragStartIndex);
}
function dragLeave() {
  //console.log("dragLeave");
  this.classList.remove("over");
}
function dragOver() {
  //console.log("dragOver");
  event.preventDefault();
}
function dragDrop() {
  //console.log("dragDrop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
}

//swap Items
function swapItems(from, to) {
  const fromItem = listItems[from].querySelector(".draggable");
  const toItem = listItems[to].querySelector(".draggable");
  // console.log(fromItem);
  // console.log(toItem);
  listItems[from].appendChild(toItem);
  listItems[to].appendChild(fromItem);
}

function dragEnter() {
  //console.log("dragEnter");
  this.classList.add("over");
}
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableList = document.querySelectorAll(".draggable-list li");
  // console.log(draggables, draggableList);

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  draggableList.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
check.addEventListener("click", checkOrder);
function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggable").innerText;

    if (personName !== richestPeople[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}
