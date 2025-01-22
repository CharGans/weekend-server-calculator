console.log('client.js is sourced!');

let calculation = {
    numberOne: null,
    numberTwo: null,
    method: null
};

//function that requests data from backEnd
function getNewCalc() {
    console.log('in getNewCalc function');

    axios.get('/calculations')
// .then is responsible for the action done once 
// a successfull GET request has been made
    .then((response) => {
        console.log('got /calculations data', response.data);

// store response.data in a variable
let newCalculation = response.data;

renderToDom(newCalculation);
})

// .catch handles failure case
    .catch((error) => {
console.log(error);
alert('Somthing went wrong!');
    });

}; //end of getNewCalc function

function renderToDom(newCalculation) {
    console.log('in renderToDom');
    let recentResult = document.getElementById('recentResult');
    let resultHistory = document.getElementById('resultHistory');
//clear exsisting content
recentResult.innerHTML = '';
resultHistory.innerHTML = '';

if (newCalculation.length > 0) {
    let mostRecent = newCalculation[newCalculation.length - 1];

//renders resent result to dom
        recentResult.innerHTML += `<p>${mostRecent.result}</p>`;
//renders all previous results to dom
        newCalculation.forEach(calc => {
            resultHistory.innerHTML += `<p>${calc.numberOne} ${calc.method} ${calc.numberTwo} = ${calc.result}</p>`;
        });
    };
};

//function to update existing calculation object
function selectMethod(event, method) {
    event.preventDefault();
    console.log('method selected', method);
    calculation.numberOne = Number(document.getElementById('numOne').value);
    calculation.numberTwo = Number(document.getElementById('numTwo').value);
    calculation.method = method;
};

//this function is called when form is submitted
function addNewCalc(event) {
    event.preventDefault();
console.log('= button works!');
// let firstNum = Number(document.getElementById('numOne').value);
// let secondNum = Number(document.getElementById('numTwo').value);
if (calculation.numberOne === null || calculation.numberTwo === null) {
    alert('Please select a method and enter both numbers');
    return;
};

axios.post('/calculations', calculation)
    .then ((response) => {
        console.log('calculation added', response.data);
        getNewCalc();
    })
    .catch((error) => {
        console.log(error);
        alert('somthing went wrong');
    });

};

//function to clear inputs. called with C button
function clearInputs(event) {
    event.preventDefault();
    document.getElementById('numOne').value = '';
    document.getElementById('numTwo').value = '';

    calculation = {
        numberOne: null,
        numberTwo: null,
        method: null
    };
};

getNewCalc();