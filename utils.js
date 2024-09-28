export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function makeShine(shines) {
  shines ? shines : (shines = document.querySelectorAll("[alt*=shine]"));
  shines.forEach((shine) => {
    let parent = shine.parentElement.parentElement;
    parent.className = shine.getAttribute("alt").toLowerCase() + " " + parent.className;
  });
}
export function getNextSiblings(elem, hideElement, filter) {
  var sibs = [];
  while ((elem = elem.nextSibling)) {
    if (elem.nodeType === 3) continue; // text node
    if (!filter || filter(elem)) sibs.push(elem);
  }
  if (hideElement) {
    elem.remove();
  }
  return sibs;
}

export function getPrevSiblings(elem, hideElement, filter) {
  var sibs = [];
  while ((elem = elem.previousSibling)) {
    if (elem.nodeType === 3) continue; // text node
    if (!filter || filter(elem)) sibs.push(elem);
  }
  if (hideElement) {
    elem.remove();
  }
  return sibs;
}

export function addClassToElements(elements, classNames) {
  elements.forEach((elem) => {
    //slet parent = elem.parentElement.parentElement;
    elem.className = elem.className + " " + classNames;
  });
}
