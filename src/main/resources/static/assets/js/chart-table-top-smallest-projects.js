setTimeout(function(){
	google.charts.setOnLoadCallback(drawChartTopSmallestProjects);
}, CSV_LOAD_WAIT_TIME());


function drawChartTopSmallestProjects() {
	const data = new google.visualization.DataTable

  const SORTED_DATA_SET = DATA_SET.sort((a, b) => parseFloat(a.total) - parseFloat(b.total)).slice(0,10);

	data.addColumn('string', 'Cliente');
	data.addColumn('string', 'Cloud');
	data.addColumn('number', 'Recompilación');
	data.addColumn('number', 'Diseño');
	data.addColumn('number', 'Implantación');
	data.addColumn('number', 'Soporte');
	data.addColumn('number', 'Total');

	const chartData = [];
	$.each( SORTED_DATA_SET, function( key, value ) {
		const itemArr = [value.client, value.cloud, value.phase1Estimate, value.phase2Estimate, value.phase3Estimate, value.phase4Estimate, value.total];
		chartData.push(itemArr);
	});
	data.addRows(chartData);

	const table = new google.visualization.Table(document.getElementById('chart-table-top-smallest-projects'));

	table.draw(data, {showRowNumber: false, sort: 'enable', sortAscending: true, sortColumn: 6, width: '100%', height: '100%'});
}
