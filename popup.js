// this variable will work to enable/disable the extension
var extensionEnabled = false;

// get the toggle_extension  div to check
// if it is clicked or not
var toggleExtension = document.getElementById("toggle_extension");

// first check the status of extension in chrome storage
// when the chrome page is first loaded
chrome.storage.local.get("extensionEnabled", (data) => {
	// get the status of extension from chrome storage
	// and set it to the extensionEnabled variable
	extensionEnabled = !!data.extensionEnabled;

	// pass the extensionEnabled variable to setToggleExtensionIcon function
	// and add the return value to toggleExtension element's as an html
	toggleExtension.innerHTML = setToggleExtensionIcon(extensionEnabled);

	// pass the extensionEnabled variable to setIcon function
	// which sets the chrome extension's icon on
	// google chrome bar
	setIcon(extensionEnabled);
});

// function which checks if the user has clicked on the toggle button
toggleExtension.onclick = () => {
	// invert the value of extensionEnabled(global) variable
	extensionEnabled = !extensionEnabled;

	// pass the extensionEnabled(local) variable to setToggleExtensionIcon function
	// and add the return value to toggleExtension element's as an html
	toggleExtension.innerHTML = setToggleExtensionIcon(extensionEnabled);

	// pass the extensionEnabled(local) variable to setIcon function
	// which sets the chrome extension's icon on
	// google chrome bar
	setIcon(extensionEnabled);

	// sets the extensionEnabled variable on chrome storage
	chrome.storage.local.set({ extensionEnabled: extensionEnabled });

	// reloads the active chrome tab
	chrome.tabs.reload();
};

// function to change the icon on google chrome bar
function setIcon(extensionEnabled) {
	if (extensionEnabled) {
		chrome.action.setIcon({ path: "images/green_background_64.png" });
	} else {
		chrome.action.setIcon({ path: "images/red_background_64.png" });
	}
}

// function to change the icon on the popup
function setToggleExtensionIcon(extensionEnabled) {
	return extensionEnabled
		? '<i class="fa-solid fa-power-off" style="color: green"></i>'
		: '<i class="fa-solid fa-power-off" style="color: red"></i>';
}
