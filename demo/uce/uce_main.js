function addCustomElements() {
	//Retrieves json, sets up default values and gets the custom elements
	$.getJSON("/App_Plugins/uce/uce_elements.json", function (data) {
		let scanInterval = data["interval"];
		let elementArray = data["elements"];

		$.each(elementArray, function (i, element) {
			//Adds the custom element to a handler which waits for the parent to be rendered
			addRenderRequest(new CustomElement(element["name"], element["file"], element["target"], element["direction"], element["parent"]), scanInterval);
		});
	});
}

function CustomElement(name, file, target, direction, parent) {
	//Name of the file
	this.name = name;
	//File location
	this.file = file;
	//The target element the custom element will look for
	this.target = target;
	//Decides where the custom element will go, append, prepend, after, before
	this.direction = direction;
	//Which parent the custom element will be a child of. 
	this.parent = parent;
}

function addRenderRequest(element, interval) {
	//Make sure the parent has been rendered on the page by umbraco
	if (document.querySelector(element.parent) != null) {
		insertHtml(element.file, element.target, element.direction);
		return;
	}
	else {
		//Cant find the element, look again after interval has passed
		setTimeout(function () {
			addRenderRequest(element, interval);
		}, interval);
	}
}

function insertHtml(htmlFile, target, direction) {
	//Gets the html file from path, returns the markup
	$.get(htmlFile, function (markup) {
		switch (direction) {
			case "append":
				//Adds the element as the next child of the target
				$(target).append(markup);
				break;
			case "prepend":
				//Adds the element as the last child of the target
				$(target).prepend(markup);
				break;
			case "after":
				//Adds the element directly after the target
				$(markup).insertAfter(target);
				break;
			case "before":
				//Adds the element directly before the target
				$(markup).insertBefore(target);
				break;
			default:
				console.log("Valid direction not given.");
				break;
		}
	});
}

addCustomElements();