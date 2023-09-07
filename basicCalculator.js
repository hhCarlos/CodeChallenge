console.log('Basic Calculator.');
console.log('mplement a basic calculator to evaluate a simple expression string. The expression string can contain opening parentheses (and closing parentheses), the plus sign + or minus -, the * sign, the / sign, and non-negative integers, as well as empty spaces. The given expression will always be valid.');
console.log('----------------------------------- \n');

const rl = require('readline');
const rli = rl.createInterface({
	input: process.stdin,
	output: process.stdout
});

rli.question('Give operation: ', (input) => {
	console.log('Input: ', input);

	let op = input.replace(/\s/g, '');
	let fragments = [];
	let holdFragment = "";
	
	for (let i = 0; i < op.length; i++) {
		if (op[i] == '+' || op[i] == '-' || op[i] == '/' || op[i] == '*') {
			fragments.push(op[i]);
		} else {
			holdFragment += op[i];
			fragments.push(holdFragment);
			holdFragment = '';
		}
	}

	const ef = `${fragments.join('')}`;
	const efs = ef.replace(/(\d+|\))\(/g, (match, p1) => {
		return `${p1}*(`;
	});

	console.log('Result: ', eval(efs));

	rli.close();
});
