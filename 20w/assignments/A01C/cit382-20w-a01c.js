// Post DOM load anonymous function
/* window.onload = function() {
	alert('"test');
} */

// Enable debug mode to output "extra" information to the console
const debug = false;

// An object-based enumeration to enable different solution "modes"
// URL: https://www.sohamkamani.com/blog/2017/08/21/enums-in-javascript/
const techniques = {
	PROCEDURAL: 'procedural',	// Standard sequential/procedural coding technique
	OOP: 'oop',					// Object-oriented programming technique
	FUNCTIONAL: 'functional'	// Functional programming
}

// Set current mode, could be changed to let declaraction and changed via GUI
let technique = techniques.PROCEDURAL;

/*
	Procedural solutions
*/
function addToArrayProcedural(data, inputData) {
	
	// Data array parameter is modified within function
	// Data array is sorted

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

/*
	OOP solutions
	https://javascript.info/class
*/
class SortedDivOutput {
	constructor() {
		this.data = [];
	}
	add(item) {
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
		this.data = [];
	}
	display(outputDiv) {
		// Create concatenated string with HTML break separators for DIV
		let output = '';
		for (let i = 0; i < this.data.length; i++) {
			if (output.length > 0) output += '<br />';
			output += this.data[i];
		}
		outputDiv.innerHTML = output;
	}
}

/*
	Functional solutions
	https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5
	https://blog.bitsrc.io/functional-programming-in-javascript-how-and-why-94e7a97343b
*/
const addToArrayFunctional = (data, inputData) => {
	// Make copy of data using ES6 spread operator
	// https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array
	let cloneData = [...data];

	// Good practice to create local constant copy of input parameter
	const trimData = inputData.trim();

	// Use functional methods to add non-duplicate data
	// https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
	/*
	// Some procedural and some functional (includes)
	if (trimData.length > 0 && !cloneData.includes(trimData)) {
		// 
		cloneData.push(trimData);
		cloneData.sort();
	}
	*/

	// Use filter()
	
	if (trimData.length > 0) {
		cloneData.push(trimData);
		cloneData = cloneData.filter((item, index) => cloneData.indexOf(item) === index).sort();	
	}
	

/*
	// Use reduce()
	if (trimData.length > 0) {
		cloneData.push(trimData);
		cloneData.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
		cloneData.sort();
	}
*/

	// Return potentially modified copy of data
	return cloneData;
}

const outputToDivFunctional = (data, divReference) => {
	// No need to use copy of data as will not change the original array
	divReference.innerHTML = data.join('<br />');
	// outputDiv.innerHTML = data.filter((inputData, index) => data.indexOf(inputData) === index).sort().join('<br />');
}

// Data "containers" made global to make clearing easier
// Note: SortedDivOutput class must be defined before using (i.e. no hoisting with classes)
let data_procedural = [];
let sortedDivOutput = new SortedDivOutput();
let data_functional = [];

window.onload = () => {
	if (debug) console.log("window.onload");

	// Store reference to output DIV
	const outputDiv = document.querySelector('#outputDiv');

	// Store reference to Add button
	const addButton = document.querySelector('#addButton');

	// Store reference to input box
	const inputBox = document.querySelector('#inputData');

	// Store reference to technique span
	const techniqueSpan = document.querySelector('#technique');

	// Setup Technique radiobutton change callback
	document.querySelectorAll('input[name="tech_type"').forEach((ctl) => {
		ctl.addEventListener('change', function (event) {
			// console.log("radio", event.target.id);
			switch(event.target.id) {
				case "procedural":
					technique = techniques.PROCEDURAL;
					break;
				case "oop":
					technique = techniques.OOP;
					break;
				case "functional":
					technique = techniques.FUNCTIONAL;
					break;
			}
		});
	});

	// Setup Clear button callback
	document.querySelector('#clearButton').addEventListener('click', function () {
		switch(technique) {
			case techniques.PROCEDURAL:
				data_procedural = [];
				outputToDivProcedural(data_procedural, outputDiv);
				break;
			case techniques.OOP:
				sortedDivOutput.clear();
				sortedDivOutput.display(outputDiv);
				break;
			case techniques.FUNCTIONAL:
				data_functional = [];
				outputToDivFunctional(data_functional, outputDiv);
				break;
		}
	});

	// Select programming "technique"
	switch(technique) {
		case techniques.PROCEDURAL:
			// Set technique
			techniqueSpan.innerHTML = "Procedural";

			// Setup Add button click event handler (callback) using anonymous function
			addButton.addEventListener('click', function () {

				// Retrieve input data, add to array and update DIV
				let inputData = inputBox.value;
				addToArrayProcedural(data_procedural, inputData);
				outputToDivProcedural(data_procedural, outputDiv);

				// Clear the previous input and ensure focus
				inputBox.value = '';
				inputBox.focus();
			});
			break;
		case techniques.OOP:
			// Set technique
			techniqueSpan.innerHTML = "Object";

			// Setup Add button click event handler (callback) using ES6 fat arrow
			addButton.addEventListener('click', () => {

				// Retrieve input data, add to array and update DIV
				let inputData = inputBox.value;
				sortedDivOutput.add(inputData);
				sortedDivOutput.display(outputDiv);

				// Clear the previous input and ensure focus
				inputBox.value = '';
				inputBox.focus();
			});
			break;
		case techniques.FUNCTIONAL:
			// Set technique
			techniqueSpan.innerHTML = "Functional";

			// Setup Add button click event handler (callback) using anonymous function
			addButton.addEventListener('click', function () {

				// Retrieve input data, add to array and update DIV
				let inputData = inputBox.value;
				data_functional = addToArrayFunctional(data_functional, inputData);
				outputToDivFunctional(data_functional, outputDiv);

				// Clear the previous input and ensure focus
				inputBox.value = '';
				inputBox.focus();
			});
			break;
	}
}
