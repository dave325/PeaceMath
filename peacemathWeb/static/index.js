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


		document.getElementById('questions').style.display = "none";
		document.getElementById("prevBtn").style.display = "none";
		document.getElementById("nextBtn").style.display = "none";
		document.getElementById("nextBtn").style.display = "none";
		document.getElementById("openMenu").disabled = true;
		document.getElementById("loader").style.display = "block";





		let inputVals = document.getElementsByClassName("rangeInput");
		let inputBVals = []

		for (let j = 0; j < inputVals.length; j++) {
			let inputValue = inputVals[j].value;
			let finalInputVal = 0;



			if (inputValue == 1) {
				finalInputVal = 0;
			}
			else if (inputValue == 2) {
				finalInputVal = 0.75;
			}
			else if (inputValue == 3) {
				finalInputVal = 2;
			}
			else if (inputValue == 4) {
				finalInputVal = 6;
			}


			inputBVals.push(finalInputVal)
		}


		console.log(inputBVals)


		if (!sessionStorage.getItem('windowCounter')) {
			sessionStorage.setItem('windowCounter', 1);
		}

		let body = {}
		body['key'] = window.sessionStorage.getItem('key')
		body['b_vals'] = inputBVals


		const windowCounter = Number(sessionStorage.getItem('windowCounter'));

		console.log(window);
		let myWindow = window.open("", "Figure " + windowCounter, "width=960 ,height=780");
		myWindow.document.write('<h1>Loading</h1>');


		let mainGraph = document.getElementById('b')
		mainGraph.innerHTML = ''
		mainGraph.innerHTML = '<h1>Loading...</h1> <p> We\'re building an awesome graph!';


		fetch('/physics/chart/', {
			method: 'post', headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, body: JSON.stringify(body)
		}).then((res) => {
			res.json().then(

				(i) => {




					console.log(i)
					//console.log(i.data.b)
					let b_values = document.getElementsByClassName('b_values');
					for (let j = 0; j < b_values.length; j++) {
						//NOTE, removed from this version of application
						//b_values[j].value = i.data[j];
					}
					d3.select("#b").selectAll("*").remove();
					mpld3.draw_figure("b", i.graph[0]);
					let text = document.getElementsByClassName("mpld3-text");

					for (let j = 0; j < b_values.length; j++) {
						console.log(i.data[j])
						console.log(Math.max(...i.data))
						console.log((i.data[j] / Math.max(...i.data)))
						text[j].style.fontSize = ((i.data[j] / Math.max(...i.data) + 0.3) * 28) + "px";
					}
					myWindow.document.open("");
					myWindow.document.innerHTML = ' ';
					myWindow.document.write(i.chart);
					myWindow.document.title = "Figure " + windowCounter;
					sessionStorage.setItem('windowCounter', windowCounter + 1);

					document.getElementById('b').style.display = 'block';
					document.getElementById("loader").style.display = "none";
					document.getElementById("openMenu").disabled = false;


				}
			)
				.catch((err) => {
					console.log(err);
				})
		});


	}





	document.getElementById('btn_calculate').addEventListener('click', () => {

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
				inputBVals.push(input.value)
			}
		}



		if (!sessionStorage.getItem('windowCounter')) {
			sessionStorage.setItem('windowCounter', 1);
		}

		let body = {}
		body['key'] = window.sessionStorage.getItem('key')
		body['b_vals'] = inputBVals


		const windowCounter = Number(sessionStorage.getItem('windowCounter'));

		console.log(window);

		
		let myWindow = window.open("", "Figure " + windowCounter, "width=960 ,height=780");
		myWindow.document.write('<h1>Loading</h1>');


		let mainGraph = document.getElementById('b')
		mainGraph.innerHTML = ''
		mainGraph.innerHTML = '<h1>Loading...</h1> <p> We\'re building an awesome graph!';



		fetch('/physics/chart/', {
			method: 'post', headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, body: JSON.stringify(body)
		}).then((res) => {
			res.json().then(

				(i) => {

					document.getElementById("b").style.display = "block";


					console.log(i)
					//console.log(i.data.b)
					let b_values = document.getElementsByClassName('b_values');
					for (let j = 0; j < b_values.length; j++) {
						//NOTE, removed from this version of application
						//b_values[j].value = i.data[j];
					}
					d3.select("#b").selectAll("*").remove();
					mpld3.draw_figure("b", i.graph[0]);
					let text = document.getElementsByClassName("mpld3-text");

					for (let j = 0; j < b_values.length; j++) {
						console.log(i.data[j])
						console.log(Math.max(...i.data))
						console.log((i.data[j] / Math.max(...i.data)))
						text[j].style.fontSize = ((i.data[j] / Math.max(...i.data) + 0.3) * 28) + "px";
					}
					myWindow.document.open("");
					myWindow.document.innerHTML = ' ';
					myWindow.document.write(i.chart);
					myWindow.document.title = "Figure " + windowCounter;
					sessionStorage.setItem('windowCounter', windowCounter + 1);


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




