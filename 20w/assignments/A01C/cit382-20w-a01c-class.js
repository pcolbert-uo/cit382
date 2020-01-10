// Enable debug mode to output "extra" information to the console
const debug = false;

/*
	Class solutions
	https://javascript.info/class
*/
class SortedDivOutput {
	constructor() {
		if (debug) console.log("SortedDivOutput: constructor()");
		this.data = [];
	}
	add(item) {
		if (debug) console.log("SortedDivOutput: add()");
		item = item.trim();
		if (item.length > 0) {

			// Add non duplicate data
			let dupe = false;
			for (let i = 0; i < this.data.length; i++) {
				if (this.data[i] == item) {
					dupe = true;
				}
			}
			if (!dupe) {
				this.data.push(item);
				this.data.sort();
			}
		}
	}
	clear() {
		if (debug) console.log("SortedDivOutput: clear()");
		this.data = [];
	}
	display(outputDiv) {
		if (debug) console.log("SortedDivOutput: display()");
		// Create concatenated string with HTML break separators for DIV
		let output = '';
		for (let i = 0; i < this.data.length; i++) {
			if (output.length > 0) output += '<br />';
			output += this.data[i];
		}
		outputDiv.innerHTML = output;
	}
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
		sortedDivOutput.clear();
		sortedDivOutput.display(outputDiv);
	});

	// Array "data" container
	let sortedDivOutput = new SortedDivOutput();

	// Setup Add button click event handler (callback) using ES6 fat arrow
	addButton.addEventListener('click', () => {
		if (debug) console.log("addButton: click");

		// Retrieve input data, add to array and update DIV
		let inputData = inputBox.value;
		sortedDivOutput.add(inputData);
		sortedDivOutput.display(outputDiv);

		// Clear the previous input and ensure focus
		inputBox.value = '';
		inputBox.focus();
	});
}
