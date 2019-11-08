'use strict';


// DO NOT USE THIS BELOW ==> USE TEMPLATE RENDERING 

// const inputParameters = [8, 105, 111, 202];
// inputParameters.forEach(value => {
// 	document.querySelector(`.input-value_${value}`).addEventListener('click', function(){
// 		// document.querySelector("#dropdown_input-value").innerHTML = value;
// 		// inputParamValue = value;
// 		_sendInputParams(inputParamValue);
// 	});
// });

// /**
//  * Makes POST request to set input parameter values of either:
//  * 	8, 105, 111, 202
//  * 
//  * @param {*} inputParamValue 
//  */
// function _sendInputParams(inputParamValue=8){
// 	axios.post('http://localhost:8000/physics/sendInitialParameterValue/', {
//     'value': inputParamValue
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }


document.getElementById('btn_calculate').addEventListener('click', function(){
	let loadingFlag = true;
	console.log(window.sessionStorage.getItem(window.clientInformation))
	fetch('/physics/chart/', {method:'post',    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	  }, body:window.sessionStorage.getItem(window.clientInformation)}).then((res)=>{
		res.json().then(
			(i) => {
				console.log(i.data)
				loadingFlag = false;
				var myWindow = window.open("", "Figure", "width=800,height=500");
				myWindow.document.write(i.chart);

			}
		)
	});
});
