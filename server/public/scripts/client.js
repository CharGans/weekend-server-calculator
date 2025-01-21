console.log('client.js is sourced!');

//function that requests data from backEnd
function getNewCalc() {
    console.log('in getNewCalc function');

    axios.get('/calculations')
// .then is responsible for the action done once 
// a successfull GET request has been made
    .then((response) => {
        console.log('got /calculations data',
         response.data
        );

// store response.data in a variable
let newCalculation = response.data;

//call the renderToDom function with the new data
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

//maybe try calculataions.result.length - 1?
if (newCalculation.length > 0) {
    let mostRecent = newCalculation[newCalculation.length - 1];

        recentResult.innerHTML += `
        <p>${mostRecent.result}</p>
        `;
        newCalculation.forEach(calc => {
            resultHistory.innerHTML += `
            <p>${calc.numberOne} ${calc.numberTwo}</p>
            `;
        });
    };
};

//this function is called when form is submitted
function addNewCalc(event) {
    event.preventDefault();
console.log('= button works!');
//variables to store inputs
let firstNum = Number(document.getElementById('numOne').value);
let secondNum = Number(document.getElementById('numTwo').value);

axios.post('/calculations', 
    { numberOne: firstNum,
      numberTwo: secondNum
    })
    .then ((response) => {
        console.log('calculation added', response.data);
        getNewCalc();
    })
    .catch((error) => {
        console.log(error);
        alert('somthing went wrong');
    });

};

getNewCalc();

//function to clear inputs. called with C button
function clearInputs(event) {
    event.preventDefault();
    document.getElementById('numOne').value = '';
    document.getElementById('numTwo').value = '';
}