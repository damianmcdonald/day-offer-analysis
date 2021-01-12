setTimeout(function(){
	google.charts.setOnLoadCallback(drawChartAdditionalServices);
}, CSV_LOAD_WAIT_TIME());

function drawChartAdditionalServices() {

	const SERVICES_1 = DATA_SET.filter(item => item.service1 !== "").map(item => item.service1);
	const SERVICES_2 = DATA_SET.filter(item => item.service2 !== "").map(item => item.service2);
	const SERVICES_3 = DATA_SET.filter(item => item.service3 !== "").map(item => item.service3);
	const SERVICES_4 = DATA_SET.filter(item => item.service4 !== "").map(item => item.service4);
	const SERVICES_5 = DATA_SET.filter(item => item.service5 !== "").map(item => item.service5);
	const SERVICES = SERVICES_1.concat(SERVICES_2, SERVICES_3, SERVICES_4, SERVICES_5);

	const groupByService = SERVICES.reduce((acc, item) => {
	    acc[item] = acc[item] + 1 || 1;
	    return acc;
	}, {});

	const chartData = [];
	// Add headers row
	chartData.push(["Service", "# en ofertas"]);
	$.each( groupByService, function( key, value ) {
		let itemArr = [];
		itemArr.push(key);
		itemArr.push(value);
		chartData.push(itemArr);
	});

  const data = google.visualization.arrayToDataTable(chartData);

	var options = {
	  title: 'Servicos adicionales en ofertas',
		is3D: true,
		chartArea: {'width': '100%', 'height': '80%'},
		legend: {'position': 'bottom'},
		pieSliceText: 'label'
	};

	var chart = new google.visualization.PieChart(document.getElementById('chart-pie-additional-services'));
	chart.draw(data, options);
}
