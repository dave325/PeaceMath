'use strict';


document.getElementById('btn_enter').addEventListener('click', function () {

	let inputBVals = []
	let inputVals = document.getElementsByClassName('b_values')

	for (let j = 0; j < inputVals.length; j++) {
		let input = inputVals[j]
		if(input.value === '')
		{
			inputBVals.push(1)

		}
		else{
			inputBVals.push(input.value)		
		}
	}

	
	let body = {}
	body['key'] = window.sessionStorage.getItem('key')
	body['b_vals'] = inputBVals

	let mainGraph = document.getElementById('b')
	let styleBefore = b.style.display
	b.style.display = "none"

	var h1 = document.createElement('h4');
	h1.style.cssText="margin-top:100px;margin-left:auto;margin-right:auto"
	h1.appendChild(document.createTextNode('Loading...'))
	let subHeading = document.createElement('p')
	subHeading.appendChild(document.createTextNode("we're building an awesome graph"))
	h1.appendChild(subHeading)
	
	mainGraph.parentNode.insertBefore(h1, mainGraph.nextSibling);

	fetch('/physics/mainViewEnterButton/', {
		method: 'post',	 headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}, body: JSON.stringify(body)
	}).then((res) => {
		res.json().then(


			(i) => {



				let b_values = document.getElementsByClassName('b_values');
				for (let j = 0; j < b_values.length; j++) {
					b_values[j].value = i.data[j];
				}
				d3.select("#b").selectAll("*").remove();
				mpld3.draw_figure("b", i.graph[0][0]);
				let text = document.getElementsByClassName("mpld3-text");
				
				b.style.display = styleBefore;
				mainGraph.parentNode.removeChild(h1)


			}
		).catch((err) => {
				console.log(err);
		})
	});
});

document.getElementById('btn_calculate').addEventListener('click', function () {


	let inputBVals = []
	let inputVals = document.getElementsByClassName('b_values')

	for (let j = 0; j < inputVals.length; j++) {
		let input = inputVals[j]
		if(input.value === '')
		{
			inputBVals.push(1)

		}
		else{
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
	let myWindow = window.open("", "Figure " + windowCounter, "width=960 ,height=780");
	myWindow.document.write('<h1>Loading</h1>');




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
					b_values[j].value = i.data[j];
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

			}
		)
			.catch((err) => {
				console.log(err);
			})
	});
});





