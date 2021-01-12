setTimeout(function(){
	google.charts.setOnLoadCallback(drawChartBarPhaseAverage);
}, CSV_LOAD_WAIT_TIME());

function drawChartBarPhaseAverage() {

	// Requirements gathering phase averages
	const averagePhase1 = DATA_SET.reduce((sum, item) => sum + item.phase1Estimate, 0) / DATA_SET.length;
	// Design phase averages
	const averagePhase2 = DATA_SET.reduce((sum, item) => sum + item.phase2Estimate, 0) / DATA_SET.length;
	// Deploy phase averages
	const averagePhase3 = DATA_SET.reduce((sum, item) => sum + item.phase3Estimate, 0) / DATA_SET.length;
	// Support phase averages
	const averagePhase4 = DATA_SET.reduce((sum, item) => sum + item.phase4Estimate, 0) / DATA_SET.length;
	// Total phase averages
	const averageTotal = DATA_SET.reduce((sum, item) => sum + item.total, 0) / DATA_SET.length;

	var data = google.visualization.arrayToDataTable([
		['Fase', 			'Jornadas promedio'	],
		['Recopliación', 	averagePhase1	],
		['Diseño', 			averagePhase2	],
		['Implantación', 	averagePhase3	],
		['Soporte', 		averagePhase4	],
		['Total', 			averageTotal		]
	]);

	var options = {
		title: 'Jornadas promedio por fase',
		hAxis: {
		  title: 'Jornadas promedio',
		  minValue: 0
		},
		vAxis: {
		  title: 'Fase'
		}
	};

	var chart = new google.visualization.BarChart(document.getElementById('chart_bar_phase_averages'));

	chart.draw(data, options);
  }
