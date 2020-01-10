// Enable debug mode to output "extra" information to the console
const debug = false;
/*
	Procedural solutions
*/
function addToArrayProcedural(data, inputData) {
	
	inputData = inputData.trim();
	if (inputData.length > 0) {

		// Add non duplicate data
		let dupe = false;
		for (let i = 0; i < data.length; i++) {
			if (data[i] == inputData) {
				dupe = true;
			}
		}
		if (!dupe) {
			data.push(inputData);
			data.sort();
		}
	}
}

function outputToDivProcedural(data, divReference) {
	// Create concatenated string with HTML break separators for DIV
	let output = '';
	for (let i = 0; i < data.length; i++) {
		if (output.length > 0) output += '<br />';
		output += data[i];
	}
	divReference.innerHTML = output;
}

window.onload = () => {
	if (debug) console.log("window.onload");

	// Store reference to output DIV
	const outputDiv = document.querySelector('#outputDiv');

	// Store reference to Add button
	const addButton = document.querySelector('#addButton');

	// Store reference to input box
	const inputBox = document.querySelector('#inputData');

	// Setup Clear button callback
	document.querySelector('#clearButton').addEventListener('click', function () {
		if (debug) console.log("clearButton: click");
		data_procedural = [];
		outputToDivProcedural(data_procedural, outputDiv);
	});

	// Array "data" container
	let data_procedural = [];

	// Setup Add button click event handler (callback) using anonymous function
	addButton.addEventListener('click', function () {
		if (debug) console.log("addButton: click");

		// Retrieve input data, add to array and update DIV
		let inputData = inputBox.value;
		addToArrayProcedural(data_procedural, inputData);
		outputToDivProcedural(data_procedural, outputDiv);

		// Clear the previous input and ensure focus
		inputBox.value = '';
		inputBox.focus();
	});
}
