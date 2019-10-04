'use strict';

window.onload = function(){
	setSideBarValues(defaultInputValues);
};	

// Do not change the default values
const defaultInputValues = {
	addMem: 1.0,
	subMem: 1.0,
	addExpect: 1.0,
	subExpect: 1.0,
	pir: 1.0,
	nir: 1.0
}

// Instead, change these values
const inputValues = {...defaultInputValues};

// ========================================================================

// Sidebar Buttons
const initialConditionsBtn = document.querySelector('.btn_intial-conditions');
initialConditionsBtn.addEventListener('click', function(){

});

const originalBtn = document.querySelector('.btn_original');
originalBtn.addEventListener('click', function(){
	// revert back to default initial condtions of input values
	setSideBarValues(defaultInputValues);
});

const calculateBtn = document.querySelector('.btn_calculate');
calculateBtn.addEventListener('click', function(){
	
});

const enterBtn = document.querySelector('.btn_enter');
enterBtn.addEventListener('click', function(){
	
});


// ========================================================================


// Main Figure Buttons
const addMemBtn = document.querySelector('.btn_add-mem');
addMemBtn.addEventListener('click', function(){

});

const addExpectBtn = document.querySelector('.btn_add-expect');
addExpectBtn.addEventListener('click', function(){
	
});

const pirBtn = document.querySelector('.btn_pir');
pirBtn.addEventListener('click', function(){
	
});

const nirBtn = document.querySelector('.btn_nir');
nirBtn.addEventListener('click', function(){
	
});

const subMemBtn = document.querySelector('.btn_sub-mem');
subMemBtn.addEventListener('click', function(){
	
});

const subExpectBtn = document.querySelector('.btn_sub-expect');
subExpectBtn.addEventListener('click', function(){
	
});

// ========================================================================

function setSideBarValues(obj){
	document.getElementById('add_mem').value = obj['addMem'];
	document.getElementById('sub_mem').value = obj['subMem'];
	document.getElementById('add_expect').value = obj['addExpect'];
	document.getElementById('sub_expect').value = obj['subExpect'];
	document.getElementById('pir').value = obj['pir'];
	document.getElementById('nir').value = obj['nir'];
}





