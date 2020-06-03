'use strict';


window.onload = function () {

	/*
	document.getElementById('btn_original').addEventListener('click', () => {

		let inputVals = document.getElementsByClassName('b_values')
		for (let j = 0; j < inputVals.length; j++) {
			let input = inputVals[j]
			input.value = '1'
		}

	});
	

	document.getElementById('btn_enter').addEventListener('click', () => {

		let inputBVals = []
		let inputVals = document.getElementsByClassName('b_values')

		for (let j = 0; j < inputVals.length; j++) {
			let input = inputVals[j]
			if (input.value === '') {
				inputBVals.push(1)

			}
			else {
				inputBVals.push(input.value)
			}
		}

		

		let body = {}
		body['key'] = window.sessionStorage.getItem('key')
		body['b_vals'] = inputBVals

		let mainGraph = document.getElementById('b')

		mainGraph.innerHTML = '<h1>Loading...</h1> <p> We\'re building an awesome graph!';

		fetch('/physics/mainViewEnterButton/', {
			method: 'post', headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, body: JSON.stringify(body)
		}).then((res) => {
			res.json().then(
				(i) => {

					mainGraph.innerHTML = '';

					let b_values = document.getElementsByClassName('b_values');
					for (let j = 0; j < b_values.length; j++) {
						b_values[j].value = i.data[j];
					}
					d3.select("#b").selectAll("*").remove();
					mpld3.draw_figure("b", i.graph[0][0]);
					let text = document.getElementsByClassName("mpld3-text");


				}
			).catch((err) => {
				console.log(err);
			})
		});
	});

	*/


	let nxtButton = document.getElementById("nextBtn")

	nxtButton.addEventListener("click", function () {

		if (nxtButton.textContent == "Calculate") {

			submitCalculate();

		}
	});
	function submitCalculate() {


	

	}





	document.getElementById('btn_enter').addEventListener('click', () => {

		hideMenu();

		document.getElementById('questions').style.display = "none";
		document.getElementById("prevBtn").style.display = "none";
		document.getElementById("nextBtn").style.display = "none";
		document.getElementById("nextBtn").style.display = "none";
		document.getElementById("openMenu").disabled = true;
		document.getElementById("loader").style.display = "block";

		let inputBVals = []
		let inputVals = document.getElementsByClassName('b_values')



		for (let j = 0; j < inputVals.length; j++) {
			let input = inputVals[j]
			if (input.value === '') {
				inputBVals.push(1)

			}
			else {
				inputBVals.push(parseFloat(input.value))
			}
		}



	

		let body = {}
		body['key'] = window.sessionStorage.getItem('key')
		body['b_vals'] = inputBVals

		
		//let myWindow = window.open("", "Figure " + windowCounter, "width=960 ,height=780");
		//myWindow.document.write('<h1>Loading</h1>');


		let mainGraph = document.getElementById('b')
		mainGraph.innerHTML = ''
		mainGraph.innerHTML = '<h1>Loading...</h1> <p> We\'re building an awesome graph!';


		fetch('/physics/mainViewEnterButton/', {
			method: 'post', headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, body: JSON.stringify(body)
		}).then((res) => {
			res.json().then(

				(i) => {



			
					mainGraph.style.display = "block";


					mainGraph.innerHTML = '';

					let b_values = document.getElementsByClassName('b_values');
					for (let j = 0; j < b_values.length; j++) {
						//b_values[j].value = i.data[j];
					}
					d3.select("#b").selectAll("*").remove();
					mpld3.draw_figure("b", i.graph[0][0]);
					let text = document.getElementsByClassName("mpld3-text");
					

					for (let j = 0; j < b_values.length; j++) {
	
						text[j].style.fontSize = ((i.data[j] / Math.max(...i.data) + 0.3) * 28) + "px";
					}

					document.getElementById('b').style.display = 'block';
					document.getElementById("loader").style.display = "none";
					document.getElementById("openMenu").disabled = false;

				}
			)
				.catch((err) => {
					console.log(err);
				})
		});
	});




}




