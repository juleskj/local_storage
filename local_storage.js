import { $, $$ } from "../utils/dom.js";

$(".add").addEventListener("mousedown", add);

$(".clear").addEventListener("mousedown", clear);

//her tjekker vi om vi bruger localstorge
let toDoArr = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

let doneArr = localStorage.getItem("checkedItems")
  ? JSON.parse(localStorage.getItem("checkedItems"))
  : [];

toDoArr.forEach(makeItem);
doneArr.forEach(makeCheckedItem);

//her laver jeg mine todo elementer med input valuen
//text er blevet sent fra add() som er input valuen
function makeItem(text) {
  const tr = document.createElement("tr");

  tr.innerHTML =
    `<td>${text.amount || "1"}  </td>` +
    `<td>${text.item}</td>` +
    `<button class="check">check</button>` +
    `<button class="delete">delete</button>`;

  $(".to_do_list").appendChild(tr);
}

//her laver jeg mine andre tr elemener for tjek listen
function makeCheckedItem(text) {
  const tr = document.createElement("tr");

  tr.innerHTML =
    `<td>${text.amount || "1"}  </td>` +
    `<td>${text.item}</td>` +
    `<button class="undo">undo</button>` +
    `<button class="delete">delete</button>`;

  $(".checked_list").appendChild(tr);
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

//event listerne for button for knap og skal sende data videre
$("tbody").addEventListener("click", (event) => {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.classList.contains("check")
  ) {
    //her retunere closest det første element som matcher
    //udtrykket altså tr
    const row = event.target.closest("tr");
    //her tager jeg elementerne fra den tr jeg får tilbage
    const textItem = row.querySelector("td:nth-child(2)").textContent;
    const amountItem = row.querySelector("td:nth-child(1)").textContent;

    //her laver jeg det nye checkItem objekt
    const checkItem = {
      item: textItem,
      amount: amountItem,
    };

    //puter obejtet ind i det nye localstorage
    doneArr.push(checkItem);
    localStorage.setItem("checkedItems", JSON.stringify(doneArr));

    row.remove();

    //fjerne det nyeobejt fra toDoArr
    toDoArr = toDoArr.filter((item) => item.item !== textItem);
    localStorage.setItem("items", JSON.stringify(toDoArr));

    makeCheckedItem(checkItem);
  }
});

//delete for to do liste
$(".to_do_list").addEventListener("click", (event) => {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.classList.contains("delete")
  ) {
    //her retunere closest det første element som matcher
    //udtrykket altså tr
    const row = event.target.closest("tr");
    //her tager jeg elementerne fra den tr jeg får tilbage
    const textItem = row.querySelector("td:nth-child(2)").textContent;

    row.remove();

    //fjerne det nyeobejt fra toDoArr
    toDoArr = toDoArr.filter((item) => item.item !== textItem);
    localStorage.setItem("items", JSON.stringify(toDoArr));
  }
});

//delete for checkListe
$(".checked_list").addEventListener("click", (event) => {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.classList.contains("delete")
  ) {
    //her retunere closest det første element som matcher
    //udtrykket altså tr
    const row = event.target.closest("tr");
    //her tager jeg elementerne fra den tr jeg får tilbage
    const textItem = row.querySelector("td:nth-child(2)").textContent;

    row.remove();

    //fjerne det nyeobejt fra toDoArr
    doneArr = doneArr.filter((item) => item.item !== textItem);
    localStorage.setItem("checkedItems", JSON.stringify(doneArr));
  }
});

//fjerner alle elementer fra begge locale storages
function clear() {
  localStorage.clear();
  $("tbody").innerHTML = " ";
}
