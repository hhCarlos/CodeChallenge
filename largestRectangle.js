console.log('Largest Rectangle in Histogram');
console.log('Given n non-negative integers representing the histogram’s bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.');
console.log('---------------------------- \n');

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let arr = [];

rl.question('Please add numbers separated by space(Ex: 2 1 5 6 2 3): ', (input) => {
	input.split(' ').map((n) => {
		arr.push(+n);
	});

	getMaxPositions();

	rl.close();
});

function getMaxPositions() {
	console.log('Original array: ', arr);
	let max = null;
	let res = [];

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === max || arr[i] === max - 1) {
			res.push(arr[i]);
		}
	}

	console.log('Bigger rectangle found area: ');
	console.log((max - 1) * res.length);
}
