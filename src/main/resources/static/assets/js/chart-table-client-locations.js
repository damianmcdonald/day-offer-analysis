setTimeout(function(){
	google.charts.setOnLoadCallback(drawChartClientLocations);
}, CSV_LOAD_WAIT_TIME());

function drawChartClientLocations() {
	const data = new google.visualization.DataTable();

	const groupByClientLocation = DATA_SET.reduce((acc, item) => {
		acc[item.geoLocation] = acc[item.geoLocation] + 1 || 1;
		return acc;
	}, {});

	data.addColumn('string', 'Ubicación');
	data.addColumn('number', '# de clientes');

	const chartData = [];
	$.each( groupByClientLocation, function( key, value ) {
		let itemArr = [];
		itemArr.push(key);
		itemArr.push(value);
		chartData.push(itemArr);
	});
	data.addRows(chartData);

	const table = new google.visualization.Table(document.getElementById('chart_table_client_locations'));

	table.draw(data,
		{
			showRowNumber: false,
			sort: 'enable',
			sortAscending: false,
			sortColumn: 1,
			width: '100%',
			height: '100%',
			page: 'enable',
			pageSize: 20
		});
}
