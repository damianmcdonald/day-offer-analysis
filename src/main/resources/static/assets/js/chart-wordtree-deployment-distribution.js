setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartWordTreeDeploymentDistribution);
}, CSV_LOAD_WAIT_TIME());

const DEPLOYMENT_OPTIONS_WORD_TREE = [];

function collateDeploymentOptionsWordTree(item) {

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
    DEPLOYMENT_OPTIONS_WORD_TREE.push(concatDeploymentOptions.join("+"));
  } else {
    DEPLOYMENT_OPTIONS_WORD_TREE.push("Sin despliegue");
  }
}

function drawChartWordTreeDeploymentDistribution() {

  $.each( DATA_SET, function( key, value ) {
    collateDeploymentOptionsWordTree(value);
  });

	const groupByDeploymentOptions = DEPLOYMENT_OPTIONS_WORD_TREE.reduce((acc, item) => {
	    acc[item] = acc[item] + 1 || 1;
	    return acc;
	}, {});

	const chartData = [];
	// Add headers row
	chartData.push(["Phrases"]);
	$.each( groupByDeploymentOptions, function( key, value ) {
		let itemArr = [];
		itemArr.push("deploy " + key.split("+").join(" "));
		chartData.push(itemArr);
	});

  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    wordtree: {
      format: 'implicit',
      word: 'deploy'
    }
  };

  var chart = new google.visualization.WordTree(document.getElementById('chart_wordtree_deployment_distribution'));
  chart.draw(data, options);
}
