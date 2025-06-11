export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
const naf = ["DenemeXbonuslar","GüvenliAdres","ahsensiteler","vippsiteler"]
export function makeShine(shines) {
  shines ? shines : (shines = document.querySelectorAll("[alt*=shine]"));
  shines.forEach((shine) => {
    let parent = shine.parentElement.parentElement;
    parent.className = shine.getAttribute("alt").toLowerCase() + " " + parent.className;
  });
}
export const not = naf.filter(x=>window.location.pathname.includes(x)).length !== 0
export function getNextSiblings(elem, hideElement, limit, selector) {
  if (!elem) return;
  var siblings = [];
  var next = elem.nextElementSibling;
  while (next) {
    if (selector && next.matches(selector)) break;
    siblings.push(next);
    next = next.nextElementSibling;
  }
  if (hideElement) {
    elem.remove();
  }
  return limit && siblings.length > limit ? siblings.slice(0, limit) : siblings;
}
export function getPrevSiblings(elem, hideElement, limit, selector) {
  if (!elem) return;
  var siblings = [];
  var prev = elem.previousElementSibling;
  while (prev) {
    if (selector && prev.matches(selector)) break;
    siblings.push(prev);
    prev = prev.previousElementSibling;
  }
  if (hideElement) {
    elem.remove();
  }
  return limit && siblings.length > limit ? siblings.slice(0, limit) : siblings;
}

export function addClassToElements(elements, classNames) {
  elements.forEach((elem) => {
    //slet parent = elem.parentElement.parentElement;
    elem.className = elem.className + " " + classNames;
  });
}

export function altToClass() {
  const images = document.querySelectorAll("div>a>img.img-fluid");
  images.forEach((image) => {
    const parent = image.parentElement.parentElement.classList;
    let alts = image.getAttribute("alt").split(" ")
    alts.forEach((x) => parent.add(x.toLowerCase()))
  })
}
