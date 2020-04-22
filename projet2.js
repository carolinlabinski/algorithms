let fs = require("fs");

fs.readFile(process.argv[2], "utf8", (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	createArray(data);
});

const createArray = (data) => {
	var array = data.split(" ").map(Number);
	console.log("Inital Array: " + array);
	check(array);
};

const check = (array) => {
	for (i = 0; i < array.length; i++) {
		if (Number.isNaN(array[i])) {
			console.log(
				"Please enter only numbers in the list.txt file! NaN found at place:" +
					i
			);
		}
	}
	if (array == " ") {
		console.log("Please enter the list of numbers in the list.txt file");
	}
	console.log("Result exo 1: " + sum_1(array, (k = 17)));
	console.log(sum_2(array));
	console.log("Result exo 3: " + sum_3(array, (k = 17)));
	console.log("Result exo 5: " + sum_5(array, (k = 17)));
};

//exo1
const sum_1 = (array, k) => {
	for (var i = 0; i < array.length; i++) {
		for (var j = 1; j < array.length; j++) {
			if (array[i] + array[j] == k) {
				return true;
			}
		}
	}
	return false;
};
//exo2
const sum_2 = (array) => {
	let buildings = 1;
	let max = Math.max(...array);
	let exposedBuildings = array.slice(array.indexOf(max));

	for (var i = exposedBuildings.length - 2; 0 <= i; i--) {
		for (var j = exposedBuildings.length - 3; 0 <= j; j--) {
			if (exposedBuildings[i] < exposedBuildings[j]) {
				buildings++;
			}
		}
	}
	console.log(
		" The number of buildings with at least one sunny appartment: " + buildings
	);
};

// exo 3
const sum_3 = (array, k) => {
	array.sort((a, b) => a - b);
	let left = 0;
	let right = array.length - 1;

	while (left < right) {
		const sum = array[left] + array[right];
		if (sum === k) {
			return true;
		} else if (sum < k) {
			left += 1;
		} else {
			right -= 1;
		}
	}
	return false;
};

// exo 3 option b
// function swap(arr, i1, i2) {
// 	let tmp = arr[i1];
// 	arr[i1] = arr[i2];
// 	arr[i2] = tmp;
// }

// function sum_3(array, k) {
// 	let imax = array.length - 1;
// 	let last = array[imax];
// 	let checker = 0;
// 	while (array[0] != last) {
// 		if (array[checker] + array[checker + 1] == k) return true;
// 		else swap(array, checker, checker + 1);
// 		checker = (checker + 1) % imax;
// 	}
// 	return false;
// }

//exo5
function sum_5(array, k) {
	let imax = array.length - 1;
	let mid = k / 2;
	let gap;
	let hash_gap = {};
	for (let cursor = 0; cursor <= imax; cursor++) {
		gap = Math.abs(array[cursor] - mid);
		if (hash_gap[gap]) return true;
		else hash_gap[gap] = true;
	}
	return false;
}
