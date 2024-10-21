import { $, $$ } from "../utils/dom.js";

$(".add").addEventListener("mousedown", add);
$(".remove").addEventListener("mousedown", remove);
$(".clear").addEventListener("mousedown", clear);

//her tjekker vi om vi bruger localstorge
let toDoArr = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

toDoArr.forEach(makeLi);

//her laver jeg mine li elementer med input valuen
//text er blevet sent fra add() som er input valuen
function makeLi(text) {
  const li = document.createElement("li");
  li.textContent = text;

  $("ul").appendChild(li);
}

function add() {
  toDoArr.push($("input").value);

  localStorage.setItem("items", JSON.stringify(toDoArr));

  makeLi($("input").value);

  $("input").value = "";
}

function remove() {
  console.log("hello");
}

function clear() {
  localStorage.clear();
  $("ul").innerHTML = " ";
}

$("ul").addEventListener("mousedown", (event) => {
  if (event.target.tagName === "LI") {
    console.log("li was clicked");
    localStorage.removeItem("items");
  }
});
