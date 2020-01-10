// Post DOM load anonymous function
/* window.onload = function() {
	alert('"test');
} */

// Enable debug mode to output "extra" information to the console
const debug = false;

/*
	Functional solutions
	https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5
	https://blog.bitsrc.io/functional-programming-in-javascript-how-and-why-94e7a97343b
*/
const addToArrayFunctional = (data, inputData) => {
	if (debug) console.log("addToArrayFunctional()");
	// Make copy of data using ES6 spread operator
	// https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array
	let cloneData = [...data];

	// Good practice to create local constant copy of input parameter
	const trimData = inputData.trim();

	// Add new data, remove duplicate data and sort
	// https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c

	/* 
		Three different techniques used to prevent duplicates
	*/

	// Some procedural and some functional (includes)
	if (trimData.length > 0 && !cloneData.includes(trimData)) {
		cloneData.push(trimData);
		cloneData.sort();
	}

	// Use filter()
	/*
	if (trimData.length > 0) {
		cloneData.push(trimData);
		cloneData = cloneData.filter((item, index) => cloneData.indexOf(item) === index).sort();	
	}
	*/

	// Use reduce()
	/*
	if (trimData.length > 0) {
		cloneData.push(trimData);
		cloneData = cloneData.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []).sort();
	}
	*/

	// Return potentially modified copy of data
	return cloneData;
}

const outputToDivFunctional = (data, divReference) => {
	if (debug) console.log("outputToDivFunctional()");
	// No need to use copy of data as will not change the original array
	divReference.innerHTML = data.join('<br />');
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
		data_functional = [];
		outputToDivFunctional(data_functional, outputDiv);
	});

	// Array "data" container
	let data_functional = [];

	// Setup Add button click event handler (callback) using anonymous function
	addButton.addEventListener('click', function () {
		if (debug) console.log("addButton: click");

		// Retrieve input data, add to array and update DIV
		let inputData = inputBox.value;
		data_functional = addToArrayFunctional(data_functional, inputData);
		outputToDivFunctional(data_functional, outputDiv);

		// Clear the previous input and ensure focus
		inputBox.value = '';
		inputBox.focus();
	});
}
