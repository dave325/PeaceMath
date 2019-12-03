'use strict';

document.getElementById('btn_calculate').addEventListener('click', function () {



	if (!sessionStorage.getItem('windowCounter')) {
		sessionStorage.setItem('windowCounter', 1);
	}

	const windowCounter = Number(sessionStorage.getItem('windowCounter'));
	let myWindow = window.open("", "Figure " + windowCounter, "width=960 ,height=780");
	myWindow.document.write('<h1>Loading</h1>');


	fetch('/physics/chart/', {
		method: 'post', headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}, body: window.sessionStorage.getItem("key")
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
				mpld3.draw_figure("b", i.graph[0])
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





