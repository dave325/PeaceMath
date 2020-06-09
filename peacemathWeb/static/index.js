'use strict';


window.onload = function () {

	let newVals = {
		'PosRecip': 'Positive Intergroup Reciprocity',
		'Neg Recip': 'Negative Intergroup Reciprocity',
		'Pro Norms': 'Positive Norms',
		'Constrctv': 'Preventative Norms',
		'Pos Histo': 'Positive Intergroup History',
		'Neg Histo': 'Negative Intergroup History',
		'Pos Goals': 'Positive Intergroup Goals',
		'Neg Goals': 'Negative Intergroup Goals',
		'P-Symbols': 'Symbols of Peacefulness',
		'Cross-cut': 'Cross-cutting Structures',
		'Governanc': 'Good Governance',
		'Conf Mgmt': 'Constructive Conflict Resolution',
		'Proc Just': 'Justice',
		'Safe &amp;sec': 'Safety and Security',
		'P-Leaders': 'Leaders',
		'Sust Deve.': 'Sustainable Development',
		'Transcend': 'Values and Beliefs',
		'Peace Edu': 'Education',
		'Shared Id': 'Shared Overarching Identity',
		'P-vision': 'Vision',
		'EqResourc': 'Equitable Distribution of Resources',
		'Info Flow': 'Information Flows',
		'BasicNeed': 'Basic Needs',
		'Dvalu Vio': 'Non-violent Values and Attitudes',
		'RuleofLaw': 'Rule of Law'
	}

	let sideLabels = document.getElementsByClassName("sidebarLabel")

	for (let sideLabel of sideLabels) {

		sideLabel.innerHTML += '  (' + newVals[sideLabel.innerHTML] + ')'
	}




	/*
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


		let myWindow = window.open("", "Figure " + windowCounter, "width=640 ,height=480");
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

	*/


	

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

		let posNegButtons = document.getElementsByClassName('PositiveNegative')




		for (let j = 0; j < inputVals.length; j++) {

			let multiplier = 1

			let input = inputVals[j]
			let group = posNegButtons[j];
			let pos = group.childNodes[1]

			if (pos.classList.contains("active")) {
				multiplier = 1;
			}
			else {
				multiplier = -1
			}

			inputBVals.push(parseFloat(input.value) * multiplier)




		}

		console.log(inputBVals)



		let body = {}
		body['key'] = window.sessionStorage.getItem('key')
		body['b_vals'] = inputBVals





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
						///console.log(i.data[j])
						//console.log(Math.max(...i.data))
						//console.log((i.data[j] / Math.max(...i.data)))
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




