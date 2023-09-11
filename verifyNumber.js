const math = require('mathjs');
const rl = require('readline');
const rli = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function initApp() {
    const userArr = JSON.parse(await questionIn('Add Array of numbers: '));
    const userTarget = JSON.parse(await questionIn('Target: '));

    // const numerosUsuario = [4,3,2,5];
    // const permutaciones = generarPermutaciones(numerosUsuario);
    // const target = 33;

    const permutaciones = generarPermutaciones(userArr);

    console.log(`Input: list = [${userArr}] target = ${userTarget}`);
    
    verifyNumber(permutaciones, userTarget);    

    rli.close();
}

function questionIn(texto) {
    return new Promise((resolve, reject) => {
        rli.question(texto, (input) => resolve(input));
    });
}

initApp();

// ---------------------------------------------------------------------->
function generarCombinacionesConParentesis(numeros) {
    const operadores = ['+', '-', '*', '/'];
    const combinaciones = [];

    function backtrack(expresion, index) {
        if (index === numeros.length) {
            combinaciones.push(expresion);
            return;
        }

        for (let operador of operadores) {
            const nuevaExpresion = expresion + operador + numeros[index];
            backtrack(nuevaExpresion, index + 1);
        }

        if (index < numeros.length - 1) {
            const expresionConParentesis = expresion + '(' + numeros[index] + operadores[0] + numeros[index + 1] + ')';
            backtrack(expresionConParentesis, index + 2);

            for (let operador of operadores) {
                const expresionConParentesisOperador = expresion + '(' + numeros[index] + operador + numeros[index + 1] + ')';
                backtrack(expresionConParentesisOperador, index + 2);
            }
        }
    }

    backtrack(numeros[0].toString(), 1);

    return combinaciones;
}

function generarTodasCombinaciones(numeros) {
    const todasCombinaciones = new Set();

    // Generamos combinaciones usando todos los dígitos proporcionados
    const combinacionesConParentesis = generarCombinacionesConParentesis(numeros);

    for (let combinacion of combinacionesConParentesis) {
        todasCombinaciones.add(combinacion);
    }

    return [...todasCombinaciones];
}

function generarPermutaciones(arr) {
    const resultados = [];

    function permutar(actual, resto) {
        if (resto.length === 0) {
            resultados.push(actual);
        } else {
            for (let i = 0; i < resto.length; i++) {
                let siguiente = resto.slice();
                siguiente.splice(i, 1);
                permutar(actual.concat(resto[i]), siguiente);
            }
        }
    }

    permutar([], arr);
    return resultados;
}

function verifyNumber(arr, target) {
    const arrPermutado = arr.map((permutacion) => {
        // console.log(permutacion);
        const combo = generarTodasCombinaciones(permutacion);
        // console.log(combo);
        return math.evaluate(combo);
    });

    const perExpres = arr.map((permutacion) => generarTodasCombinaciones(permutacion));

    const cancatPermutaciones = [].concat(...arrPermutado);
    const cancatPermutExpressions = [].concat(...perExpres);
    const verification = !!~cancatPermutaciones.indexOf(target) ? 
        { 
            exist: !!~cancatPermutaciones.indexOf(target), 
            expre: cancatPermutExpressions[cancatPermutaciones.indexOf(target)] 
        } : 
        null;

    if (verification) {
        console.log(`Output: ${verification.exist}`);
        console.log(`Explanation: ${verification.expre}`);
    } else {
        console.log(`Output: false`);
        console.log(`Explanation: There are no operations that achieve the result.`);
    }
}
