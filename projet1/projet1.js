let fs = require("fs");

fs.readFile(process.argv[2], "utf8", (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	createArray(data);
});

const createArray = (data) => {
	var IntArray = data.split(" ").map(Number);
	console.log("Inital Array: " + IntArray);
	check(IntArray);
};

const check = (IntArray) => {
	for (i = 0; i < IntArray.length; i++) {
		if (Number.isNaN(IntArray[i])) {
			console.log(
				"Please enter only numbers in the list.txt file! NaN found at place:" +
					i
			);
		}
	}
	if (IntArray == " ") {
		console.log("Please enter the list of numbers in the list.txt file");
	}

	bubbleSort(IntArray); //Please comment bubbleSort(IntArray) to see the right number of comparisons for intersectionSort(IntArray)!
	intersectionSort(IntArray);
	mergeSortTopDown(IntArray);
	console.log(
		"Merge sorted array: " +
			mergeSortTopDown(IntArray) +
			" // nombre de comparaisons: " +
			counter
	);
};

/// liste de 6 nombres non-triée donne 6 comparaisons => O(n), liste non-trié 11 comparaisons O(n^2), liste longue non triés 2424 comparaisons O(n^2)
let bubbleSort = (IntArray) => {
	let counter = 0;
	let len = IntArray.length;
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len; j++) {
			if (IntArray[j] > IntArray[j + 1]) {
				let tmp = IntArray[j];
				counter++;
				IntArray[j] = IntArray[j + 1];
				IntArray[j + 1] = tmp;
			}
		}
	}
	console.log("Bubble sort number of comparisons:" + counter);
	console.log("Bubble sorted array:" + IntArray);
	// return IntArray;
};
/// sorted array: 0 comparisons, unsorted short array: 11 comparaisons
//100 numbers unsorted array: 2424 comparisons => so O(n^2) is true

let intersectionSort = (IntArray) => {
	let counter = 0;
	let length = IntArray.length;
	for (let i = 1; i < length; i++) {
		let key = IntArray[i];
		let j = i - 1;
		while (j >= 0 && IntArray[j] > key) {
			IntArray[j + 1] = IntArray[j];
			j = j - 1;
			counter++;
		}
		IntArray[j + 1] = key;
	}
	console.log("Intersection sort nb of comparisons:" + counter);
	console.log("Intersection sorted array:" + IntArray);
	return IntArray;
};
////

let counter = 0;
let mergeSortTopDown = (IntArray) => {
	if (IntArray.length <= 1) {
		return IntArray;
	}
	const middle = Math.floor(IntArray.length / 2);
	const left = IntArray.slice(0, middle);
	const right = IntArray.slice(middle);
	counter++;
	return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right), counter);
};

function mergeTopDown(left, right) {
	const array = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			array.push(left.shift());
		} else {
			array.push(right.shift());
		}
	}
	return array.concat(left.slice()).concat(right.slice());
}
