'use strict';


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
	console.log(window.sessionStorage.getItem('key'))
		fetch('/physics/chart/', {method:'post', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			}, body:window.sessionStorage.getItem("key")}).then((res)=>{
			res.json().then(
				 (i) => {
					 console.log(i.data.b)
					let b_values = document.getElementsByClassName('b_value');
					for(let j = 0; j < b_values.length; j++){
						b_values[j].value = i.data.b[j];
					}
					if (!sessionStorage.getItem('windowCounter')){
						sessionStorage.setItem('windowCounter', 1);
					}

					const windowCounter = Number(sessionStorage.getItem('windowCounter'));

					const myWindow = window.open("", "Figure " + windowCounter, "width=800,height=500");
					console.log(windowCounter);
					console.log(i);
					
					myWindow.document.write(i.chart);
					myWindow.document.title = "Figure " + windowCounter;
					sessionStorage.setItem('windowCounter', windowCounter + 1);

				}
			)
			.catch((err) => {
				console.log(err);
			})
		});	
});





	