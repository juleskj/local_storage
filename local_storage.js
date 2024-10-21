import { $, $$ } from "../utils/dom.js";

$(".add").addEventListener("mousedown", add);

$(".clear").addEventListener("mousedown", clear);

//her tjekker vi om vi bruger localstorge
let toDoArr = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

let doneArr = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

toDoArr.forEach(makeItem);

//her laver jeg mine todo elementer med input valuen
//text er blevet sent fra add() som er input valuen
function makeItem(text) {
  // const li = document.createElement("li");
  const tr = document.createElement("tr");

  tr.innerHTML =
    `<td>${text.amount || "1"}  </td>` +
    `<td>${text.item}</td>` +
    `<button class="check">check</button>`;

  $("tbody").appendChild(tr);
}

function add() {
  //her tjekker jeg om input feltet er tomt, og hvis det er så giver laver den en alart
  if ($("#item").value.trim()) {
    const toDOitem = {
      item: $("#item").value.trim(),
      amount: $("#amount").value.trim(),
    };

    toDoArr.push(toDOitem);

    localStorage.setItem("items", JSON.stringify(toDoArr));

    //vi laver det første objekt inde todoaray
    makeItem(toDoArr[toDoArr.length - 1]);

    $("input").value = " ";
  } else {
    alert("Tilføj et elemnt!");
  }
}

function checkPush() {
  console.log("check");
}

function clear() {
  localStorage.clear();
  $("tbody").innerHTML = " ";
}
