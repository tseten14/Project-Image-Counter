// get the about div element
let aboutDiv = document.getElementById("about");
// get the setting div element
let settingsDiv = document.getElementById("settings");

// get the settings button element
let settingsButton = document.getElementById("settingsButton");
// get the about button element
let aboutButton = document.getElementById("aboutButton");

// get the number placement select value
var numberPlacement = document.getElementById("numberPlacement");

// get the image opacity value
var imageOpacityValue = document.getElementById("imageOpacityRange");

// if settings button is clicked
settingsButton.addEventListener("click", () => {
	// about div should not be displayed
	aboutDiv.style.display = "none";
	// about button should not be underlined and
	// be of black color
	aboutButton.style.color = "black";
	aboutButton.style.textDecoration = "none";

	// settings div should be displayed
	settingsDiv.style.display = "block";

	// settings button should be of red color
	// and underlined
	settingsButton.style.color = "red";
	settingsButton.style.textDecoration = "underline";
	settingsButton.style.textDecorationColor = "red";
});

// if about button is clicked
aboutButton.addEventListener("click", () => {
	// settings div should not be displayed
	settingsDiv.style.display = "none";
	// settings button should be black color and not
	// underlined
	settingsButton.style.color = "black";
	settingsButton.style.textDecoration = "none";

	// about div should be displayed
	aboutDiv.style.display = "block";
	// about button should be of red color
	// and underlined
	aboutButton.style.color = "red";
	aboutButton.style.textDecoration = "underline";
	aboutButton.style.textDecorationColor = "red";
});

// function which checks if user has changed
// image opacity range
imageOpacityValue.onchange = () => {
	//get the image opacity value and set it
	let imageOpacity = imageOpacityValue.value;
	// show the opacity value to the user
	document.getElementById("rangeValue").innerHTML = imageOpacity;

	//set the image opacity variable to chrome storage
	chrome.storage.local.set({ imageOpacity: imageOpacity });

	//reload the active chrome tab
	chrome.tabs.reload();
};

// function which checks if the user has changed the
// number placement settings option
numberPlacement.onchange = () => {
	// set the numberPosition variable to changed variable name
	let numberPosition = numberPlacement.value;

	// sets the numberPlacementPosition variable on chrome storage
	chrome.storage.local.set({ numberPosition: numberPosition });

	// re-generate the options
	imagePlacementOptionGenerator();
	// reloads the active chrome tab
	chrome.tabs.reload();
};

// generate option list for number placement
// with current number position as selected value
function imagePlacementOptionGenerator() {
	// define the option value to be used
	let optionValues = ["center", "left", "right"];

	// get the selector
	var selector = document.getElementById("numberPlacement");

	//if options are set remove them
	while (selector.options.length > 0) {
		selector.remove(0);
	}
	// loop through the optionsValue and create the option to be placed
	for (const val of optionValues) {
		// create the option
		let option = document.createElement("option");
		// set the option value
		option.value = val;
		// set the option value text
		option.text = val.charAt(0).toUpperCase() + val.slice(1);

		// now check if the option value same as saved in chrome storage
		chrome.storage.local.get("numberPosition", (data) => {
			// get the number position from the chrome storage
			let numberPosition = data.numberPosition;

			// now check which position is to be displayed as selected
			if (numberPosition === undefined) {
				// if numberPosition is undefined then center value is selected
				option.value === "center" ? (option.selected = "selected") : "";
			} else {
				// else then the value at the chrome storage is selected
				option.value === numberPosition ? (option.selected = "selected") : "";
			}
		});
		selector.appendChild(option);
	}
}

//codes to be run while the settings and about page is loaded
window.onload = () => {
	// at first about div element should not be displayed
	aboutDiv.style.display = "none";
	// at first settings button should be of red color and underlined
	settingsButton.style.color = "red";
	settingsButton.style.textDecoration = "underline";
	settingsButton.style.textDecorationColor = "red";

	// number options should be generated
	imagePlacementOptionGenerator();
};

document.getElementById("hotkey").onclick = () =>
	chrome.tabs.create({
		url: "chrome://extensions/configureCommands",
	});
