'use strict';

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





	