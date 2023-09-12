const rl = require('readline');
const rli = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function initApp() {
    const inputOne = await question('Add array [] only with 0 and 1, other values will be remove: ');
    const inputTwo = JSON.parse(await question('Target: '));

    verifyArray(inputOne, inputTwo);

    rli.close();
}

initApp();

function question(texto) {
    return new Promise((resolve, reject) => {
        rli.question(texto, (input) => resolve(input));
    });
}

// ------------------------------ Utilities
function verifyArray(arr, target) {
    const parseArr = JSON.parse(arr);
    let result = [];

    if (Array.isArray(parseArr)) {
        // console.log(parseArr);
        parseArr.forEach(item => {
            if (item == 0 || item == 1) {
                result.push(item);
            } else {
                errores += 1;
            }
        });
    }

    const matrixVerify = matrixVerification(dividirYRellenar(result), target);

    return [];
}

function matrixVerification(matrix, target) {
    let jumps = 0;
    let outputFinal = [];

    for (let i = matrix.length; i <= target; i += matrix.length) jumps += 1;

    console.log('----------------------------------------------------------------------');
    console.log('Given array: ');
    const resultado = matrix.map(row => `  [${row.join(', ')}]`).join(',\n');
    console.log(`[\n${resultado}\n]`);

    if (matrix[jumps].includes(0)) {
        matrix[jumps] = matrix[jumps].map(element => element === 1 ? 0 : element);
        console.log('Matrix: ', matrix);

        outputFinal = matrix.map(subArray => {
            subArray[0] = 0;
            return subArray;
        });
    }

    const output = matrix.map(row => `  [${row.join(', ')}]`).join(',\n');
    console.log('Target= ', target);
    console.log(`[\n${output}\n]`);
}

function dividirYRellenar(array) {
    const totalElementos = array.length;
    let longitud = Math.ceil(Math.sqrt(totalElementos));

    while (totalElementos % longitud !== 0) {
        longitud++;
    }

    const totalDivisiones = totalElementos / longitud;
    const elementosFaltantes = totalDivisiones * longitud - totalElementos;

    const divisiones = [];
    let indice = 0;

    for (let i = 0; i < totalDivisiones; i++) {
        let subarray = array.slice(indice, indice + longitud);

        if (i >= totalDivisiones - elementosFaltantes) {
            const elementosParaAgregar = longitud - subarray.length;
            subarray = subarray.concat(Array(elementosParaAgregar).fill(0));
        }

        divisiones.push(subarray);
        indice += longitud;
    }

    return divisiones;
}
