const getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.nextElementSibling;
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {siblings.push(sibling);}
		sibling = sibling.nextSibling
	}
	return siblings;
};

    document.getElementById("footer").remove();
    const main = document.getElementById("links");
main.children[0].className = "left-brands"
    main.parentElement.className = ""
    main.parentElement.parentElement.className = ""
main.parentElement.parentElement.parentElement.classList.remove("container");

const splitter_one = document.querySelector(".col-12.mt-4.mb-4");
//const splitter_two = document.querySelector(".col-12.mt-5.mb-5");
const right_brands = document.createElement("div");
right_brands.className ="right-brands";
const head_brand = document.createElement("div");
head_brand.className ="head-brand";
const def_brands = document.createElement("div");
def_brands.className ="def-brands";
//const head_brand_clone = splitter_one.nextElementSibling
//head_brand.appendChild(head_brand_clone)
const def_brands_clone = getSiblings(splitter_one)
def_brands_clone.forEach((node)=>def_brands.appendChild(node))
right_brands.appendChild(head_brand);
right_brands.appendChild(def_brands);
main.appendChild(right_brands);

splitter_one.remove()
//splitter_two.remove();