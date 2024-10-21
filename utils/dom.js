export function $(element) {
  return document.querySelector(element);
}
// her bruger vi querySelector og elementet er div
// $("div")

export function $$(element) {
  return document.querySelectorAll(element);
}
// her bruger vi querySelectorAll og elementet er div
// $$("div")
