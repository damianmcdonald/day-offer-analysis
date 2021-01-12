setTimeout(function(){
	google.charts.setOnLoadCallback(drawChartRecentProjects);
}, CSV_LOAD_WAIT_TIME());

function drawChartRecentProjects() {
	const data = new google.visualization.DataTable

  const SORTED_DATA_SET = DATA_SET.sort((a, b) => b.statusDate - a.statusDate).slice(0,10);

	data.addColumn('string', 'Cliente');
	data.addColumn('date', 'Oferta recibido');
	data.addColumn('string', 'Status');
	data.addColumn('string', 'Cloud');
	data.addColumn('number', 'Recompilación');
	data.addColumn('number', 'Diseño');
	data.addColumn('number', 'Implantación');
	data.addColumn('number', 'Soporte');
	data.addColumn('number', 'Total');

	const chartData = [];
	$.each( SORTED_DATA_SET, function( key, value ) {
		let parsedDate = new Date(Date.parse(value.statusDate));
		let itemArr = [value.client, parsedDate, value.status, value.cloud, value.phase1Estimate, value.phase2Estimate, value.phase3Estimate, value.phase4Estimate, value.total];
		chartData.push(itemArr);
	});
	data.addRows(chartData);

	const table = new google.visualization.Table(document.getElementById('chart_table_recent_projects'));

	table.draw(data, {
		showRowNumber: false,
		sort: 'enable',
		sortAscending: false,
		sortColumn: 1,
		width: '90%',
		height: '100%'
	});
}
