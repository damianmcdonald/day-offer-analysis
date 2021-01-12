setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartDeploymentDistribution);
}, CSV_LOAD_WAIT_TIME());

const DEPLOYMENT_OPTIONS = [];

function collateDeploymentOptions(item) {

  let concatDeploymentOptions = [];

  if(item.virtualMachines > 0) {
    concatDeploymentOptions.push("MV");
  }

  if(item.buckets > 0) {
    concatDeploymentOptions.push("Buckets");
  }

  if(item.databases > 0) {
    concatDeploymentOptions.push("BBDD");
  }

  if(item.hasElb) {
    concatDeploymentOptions.push("ELB");
  }

  if(item.hasAutoScripts) {
    concatDeploymentOptions.push("IaC");
  }

  if(concatDeploymentOptions.length > 0) {
    DEPLOYMENT_OPTIONS.push(concatDeploymentOptions.join("+"));
  } else {
    DEPLOYMENT_OPTIONS.push("Sin despliegue");
  }
}

function drawChartDeploymentDistribution() {

  $.each( DATA_SET, function( key, value ) {
    collateDeploymentOptions(value);
  });

	const groupByDeploymentOptions = DEPLOYMENT_OPTIONS.reduce((acc, item) => {
	    acc[item] = acc[item] + 1 || 1;
	    return acc;
	}, {});

	const chartData = [];
	// Add headers row
	chartData.push(["Opcion despliegue", "# en ofertas"]);
	$.each( groupByDeploymentOptions, function( key, value ) {
		let itemArr = [];
		itemArr.push(key);
		itemArr.push(value);
		chartData.push(itemArr);
	});

  const data = google.visualization.arrayToDataTable(chartData);

	var options = {
	  title: 'Opciones de despliegue en ofertas',
    chartArea: {'width': '100%', 'height': '80%'},
    legend: {'position': 'bottom'},
	  pieHole: 0.4,
	};

	var chart = new google.visualization.PieChart(document.getElementById('chart-donut-deployment-distribution'));
	chart.draw(data, options);
}
