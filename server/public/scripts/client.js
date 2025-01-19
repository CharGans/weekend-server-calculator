console.log('client.js is sourced!');


//function that requests data from backEnd

function getNewCalc() {
    console.log('in getNewCalc function');

    axios
// GET request to get /calculations from server
    .get('/calculations')

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

    }) //end of .then

// .catch handles failure case
    .catch((error) => {
console.log(error);
alert('Somthing went wrong!');
    });

}; //end of getNewCalc function

//call the functon to run
getNewCalc();

//this function is called when form is submitted
function addNewCalc(event) {
    event.preventDefault();
console.log('= button works!');
//variables to store inputs


};