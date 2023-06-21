import ajax from '../../../js/src/util/ajax.js';

const wrapper = document.querySelector('.js-wrapper');
const url = 'dashboard-warehouse';
let hours;
let minutes;

setInterval(function () {
	const time = new Date();
	hours = time.getHours();
	minutes = time.getMinutes();
	hours = (hours < 10) ? '0' + hours : hours;
	minutes = (minutes < 10) ? '0' + minutes : minutes;
	updateClock();
},1000);

function updateClock () {
	const clockBox = document.getElementById('clock-box');
	const time = hours + ':' + minutes;
	if (clockBox) {
		clockBox.innerText = time;
	}
}

function switchDashboard() {
	const dashboard = document.querySelector('.js-dashboard');

	if (dashboard.classList.contains('dashboard-1-active')) {
		dashboard.classList.remove('dashboard-1-active');
		dashboard.classList.add('dashboard-2-active');		
		return;
	} else if (dashboard.classList.contains('dashboard-2-active')) {
		dashboard.classList.remove('dashboard-2-active');
		dashboard.classList.add('dashboard-3-active');
		return;
	} else {
		dashboard.classList.remove('dashboard-3-active');
		dashboard.classList.add('dashboard-1-active');
		return;
	}
}

setInterval(switchDashboard, 15000); // switch dashboards every 15 seconds

function getDashboard() {
	if(new Date().getHours() >= 6){
		ajax.get( url, { timeout: 15000 }).then(res => {
			wrapper.innerHTML = res.data;
			updateClock();
		}).catch(() => { 
			wrapper.innerHTML = `<h1 class="error-message">${wrapper.dataset.errorMessage}</h1>`;
		});
	}
}
getDashboard();
setInterval(getDashboard, 45000); //refresh dashboard data every 45 seconds
