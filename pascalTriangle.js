console.log('Pascals Triangle');
console.log('Given numRows, generate the first numRows of Pascal’s triangle.');
console.log('--------------------------------------------------------------\n');

const rl = require('readline');
const rli = rl.createInterface({
	input: process.stdin,
	output: process.stdout
});

rli.question('Pascal triangle length(): ', (input) => {

	for (let i = 0; i <= input; i++) {
		console.log(pascalGenerator(i));
	}

	rli.close();
});

function pascalGenerator(n) {
	if (n === 0) return [1];

	let res = [];

	for (let i = 0; i <= n; i++) {
		const fn = getFactorial(n);
		const fi = getFactorial(i);
		const fni = getFactorial(n - i);
		const combinations = fn/((fi) * fni);
		
		res.push(combinations);			
	}

	return res;
}

function getFactorial(n) {
	let arr = [];
	for (let i = 0; i < n; i++) {
		arr.push(i+1);
	}	

	return arr.reduce((el, hl) => el * hl, 1);
}

