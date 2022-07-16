// set the numberPlacementPosition if it is undefined
chrome.storage.local.get("numberPosition", (data) => {
	// get the numberPlacement from chrome storage
	let numberPlacement = data.numberPosition;
	// if undefined then set it to default value
	if (numberPlacement === undefined) {
		chrome.storage.local.set({ numberPosition: "center" });
	}
});

// set the imageopacity if it is undefined
chrome.storage.local.get("imageOpacity", (data) => {
	// get the imageOpacity from chrome storage
	let imageOpacity = data.imageOpacity;
	// if undefined then set it to default value
	if (imageOpacity === undefined) {
		chrome.storage.local.set({ imageOpacity: "0.2" });
	}
});

// we set the fecth value null to get all
// the keys from the chrome.storage.local
chrome.storage.local.get(null, (data) => {
	// check if the extensionEnabled variable
	// in chrome storage is true
	if (data.extensionEnabled) {
		// if the extensionEnabled variable in chrome
		// storage is true call the following function
		addCountToImage(data.numberPosition, data.imageOpacity);

		// if the user starts scrolling then call
		// the following function
		window.addEventListener("scroll", () => {
			addCountToImage(data.numberPosition, data.imageOpacity);
		});
	}
});

// function to add overlay to the images
// with numberPosition and imageOpacity parameters
function addCountToImage(numberPosition, imageOpacity) {
	// get all the tags with img tag
	var img = document.getElementsByTagName("img");

	// setting the variable for adding count
	// on the overlay of image
	var counter = 1;

	// looping through all the img tags fetched
	// we start looping from 4th image because
	// the images we want to overlay starts
	// from the fourth elemet of img array
	for (var i = 4; i < img.length; i++) {
		// image of this height may or may not come
		// with wrapping div so we ignore it
		if (img[i].width == 43) {
			continue;
		}

		// if image already has a div with id "img-count-counter"
		// then we skip because we do not want to keep overlaying
		if (!!document.getElementById("img-count-" + counter)) {
			counter++;
			continue;
		}

		// create an element of tag div
		let div = document.createElement("div");

		// add class to the created div tag
		div.className = "img-count";
		// add id to the created div tag
		// we'll use this to check
		// if the image already
		// has overlay
		div.id = "img-count-" + counter;

		// create an element of tag p
		let p = document.createElement("p");

		if (img[i].width > 46) {
			// if the image's width is greater than 46
			// then align text to center and
			// font size to 3 rem
			div.style["textAlign"] = numberPosition;
			if (numberPosition != "center") {
				p.style["margin-" + numberPosition] = "25px";
			}
			p.style["fontSize"] = "3rem";
		} else {
			// if the image's width is less than 46
			// then align text to left and
			// font size to 1 rem
			div.style["textAlign"] = "left";
			p.style["fontSize"] = "1rem";
		}

		// setting the div tag's styling
		div.style["position"] = "absolute";
		div.style["width"] = "100%";
		div.style["height"] = "100%";
		div.style["margin"] = "auto";
		div.style["top"] = "0";
		div.style["left"] = "0";
		div.style["bottom"] = "0";
		div.style["right"] = "0";
		div.style["z-index"] = "1";
		div.style["background"] = "rgba(203, 197, 197," + imageOpacity + ")";
		// setting the p tag's styling
		p.style["position"] = "absolute";
		p.style["inset"] = 0;
		p.style["color"] = "black";
		p.style["fontWeight"] = "bold";
		p.style["webkitTextStroke"] = "1px white";

		// adding counter value inside the p tag
		p.innerHTML = counter;

		// appending p tag inside the div tag
		div.append(p);

		// rendering the div tag after the img tag
		img[i].after(div);

		// increment the counter value
		counter++;
	}
}
