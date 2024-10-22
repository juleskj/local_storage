import { $, $$ } from "../utils/dom.js";

$(".add").addEventListener("mousedown", add);

$(".clear").addEventListener("mousedown", clear);

//her tjekker vi om vi bruger localstorge
let toDoArr = localStorage.getItem("toDo")
  ? JSON.parse(localStorage.getItem("toDo"))
  : [];

let checkArr = localStorage.getItem("checked")
  ? JSON.parse(localStorage.getItem("checked"))
  : [];

toDoArr.forEach(makeItem);
checkArr.forEach(makeCheckedItem);

//her laver jeg mine todo elementer med input valuen
//text er blevet sent fra add() som er input valuen
function makeItem(text) {
  const tr = document.createElement("tr");

  tr.innerHTML =
    `<td>${text.amount}  </td>` +
    `<td>${text.item}</td>` +
    `<button class="check">check</button>` +
    `<button class="delete">delete</button>`;

  $(".to_do_list").appendChild(tr);
}

//her laver jeg mine andre tr elemener for tjek listen
function makeCheckedItem(text) {
  const tr = document.createElement("tr");

  tr.innerHTML =
    `<td>${text.amount}  </td>` +
    `<td>${text.item}</td>` +
    `<button class="undo">undo</button>` +
    `<button class="delete">delete</button>`;

  $(".checked_list").appendChild(tr);
}

function add() {
  //her tjekker jeg om input feltet er tomt, og hvis det er så giver laver den en alart
  if ($("#item").value.trim()) {
    const toDoitem = {
      item: $("#item").value.trim(),
      amount: $("#amount").value.trim() ? $("#amount").value.trim() : 1,
    };

    toDoArr.push(toDoitem);

    localStorage.setItem("toDo", JSON.stringify(toDoArr));

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
    const textItem = row.querySelector("td:nth-child(2)").textContent.trim();
    const amountItem = row.querySelector("td:nth-child(1)").textContent.trim();

    //her laver jeg det nye checkItem objekt
    const checkItem = {
      item: textItem,
      amount: amountItem,
    };

    //puter obejtet ind i det nye localstorage
    checkArr.push(checkItem);
    localStorage.setItem("checked", JSON.stringify(checkArr));

    row.remove();

    //fjerne det objektet fra toDoArr hvis det har den
    toDoArr = toDoArr.filter((item) => item.item !== textItem);

    console.log("after filtering toDoArr:", toDoArr);

    localStorage.setItem("toDo", JSON.stringify(toDoArr));

    makeCheckedItem(checkItem);
  }
});

//delete for to do liste
$$("tbody").forEach((tbody) => {
  tbody.addEventListener("click", (event) => {
    if (
      event.target.tagName === "BUTTON" &&
      event.target.classList.contains("delete")
    ) {
      //her retunere closest det første element som matcher udtrykket tr
      const row = event.target.closest("tr");

      //her tager jeg elementerne fra den tr jeg får tilbage
      const textItem = row.querySelector("td:nth-child(2)").textContent.trim();

      row.remove();

      //kigger på hvilke liste der bliver klikket
      let clickedList = event.currentTarget.getAttribute("class").trim();

      console.log(row);
      console.log(clickedList);

      // sletter to do item
      if (clickedList === "to_do_list") {
        toDoArr = toDoArr.filter((item) => item.item !== textItem);
        localStorage.setItem("toDo", JSON.stringify(toDoArr));
      }

      // sletter check list item
      if (clickedList === "checked_list") {
        checkArr = checkArr.filter((item) => item.item !== textItem);
        localStorage.setItem("checked", JSON.stringify(checkArr));
      }
    }
  });
});

//fjerner alle elementer fra begge locale storages
function clear() {
  localStorage.clear();
  $("tbody").innerHTML = " ";
}
