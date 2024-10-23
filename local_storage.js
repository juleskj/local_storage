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
  tr.setAttribute("data-id", text.id);

  tr.innerHTML =
    `<button class="check"></button>` +
    `<td class="amount">${text.amount}  </td>` +
    `<td>${text.item}</td>` +
    `<button class="delete">delete</button>`;

  $(".to_do_list").appendChild(tr);
}

//her laver jeg mine andre tr elemener for tjek listen
function makeCheckedItem(text) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", text.id);

  tr.innerHTML =
    `<button class="undo"></button>` +
    `<td class="amount">${text.amount}  </td>` +
    `<td>${text.item}</td>` +
    `<button class="delete">delete</button>`;

  $(".checked_list").appendChild(tr);
}

function add() {
  //her tjekker jeg om input feltet er tomt, og hvis det er så giver laver den en alart
  if ($("#item").value.trim()) {
    const toDoitem = {
      id: Date.now(),
      item: $("#item").value.trim(),
      amount: $("#amount").value.trim() ? $("#amount").value.trim() : 1,
    };

    toDoArr.push(toDoitem);

    localStorage.setItem("toDo", JSON.stringify(toDoArr));

    //vi laver det første objekt inde todoaray
    makeItem(toDoArr[toDoArr.length - 1]);

    $("#amount").value = "";

    $("#item").value = "";
  } else {
    alert("Tilføj et elemnt!");
  }
}

//event listerne for button for knap og skal sende data videre
$$("tbody").forEach((tbody) => {
  tbody.addEventListener("click", (event) => {
    if (
      (event.target.tagName === "BUTTON" &&
        event.target.classList.contains("check")) ||
      (event.target.tagName === "BUTTON" &&
        event.target.classList.contains("undo"))
    ) {
      console.log("check");
      //her retunere closest det første element som matcher
      //udtrykket altså tr
      const row = event.target.closest("tr");
      //her tager jeg elementerne fra den tr jeg får tilbage
      const textItem = row.querySelector("td:nth-child(3)").textContent.trim();
      const amountItem = row
        .querySelector("td:nth-child(2)")
        .textContent.trim();

      const itemID = row.getAttribute("data-id");

      //her laver jeg det nye checkItem objekt
      const newItem = {
        id: parseInt(itemID),
        item: textItem.trim(),
        amount: amountItem.trim(),
      };

      let clickedList = event.target.getAttribute("class").trim();
      console.log(clickedList);

      row.remove();

      if (clickedList === "check") {
        //tilføjer objektet til checkArr
        checkArr.push(newItem);
        //updatere arrayet
        localStorage.setItem("checked", JSON.stringify(checkArr));

        //fjerne det objektet fra toDoArr hvis det har den og derefter updatere storaget
        toDoArr = toDoArr.filter((item) => item.id !== parseInt(itemID));
        localStorage.setItem("toDo", JSON.stringify(toDoArr));

        makeCheckedItem(newItem);
      } else if (clickedList === "undo") {
        console.log("clicked");

        toDoArr.push(newItem);
        localStorage.setItem("toDo", JSON.stringify(toDoArr));

        checkArr = checkArr.filter((item) => item.id !== parseInt(itemID));
        localStorage.setItem("checked", JSON.stringify(checkArr));

        makeItem(newItem);
      }
    }
  });
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
      //id
      const itemId = row.getAttribute("data-id").trim();

      row.remove();

      console.log(itemId);

      //kigger på hvilke liste der bliver klikket
      let clickedList = event.currentTarget.getAttribute("class").trim();

      console.log(`slettede fra:` + clickedList);

      // sletter to do item
      if (clickedList === "to_do_list") {
        //sammenligner id
        toDoArr = toDoArr.filter((item) => item.id !== parseInt(itemId));
        localStorage.setItem("toDo", JSON.stringify(toDoArr));
      }

      // sletter check list item
      if (clickedList === "checked_list") {
        checkArr = checkArr.filter((item) => item.id !== parseInt(itemId));
        localStorage.setItem("checked", JSON.stringify(checkArr));
      }
    }
  });
});

//fjerner alle elementer fra begge locale storages
function clear() {
  localStorage.clear();
  $$("tbody").forEach((tbody) => {
    tbody.innerHTML = " ";
  });
}
