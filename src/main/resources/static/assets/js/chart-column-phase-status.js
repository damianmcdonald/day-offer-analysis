setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartPhaseStatus);
}, CSV_LOAD_WAIT_TIME());

function drawChartPhaseStatus() {

  const groupByStatus = DATA_SET.reduce((acc, item) => {
    acc[item.status] = acc[item.status] + 1 || 1;
    return acc;
  }, {});

  // check if there are missing status and add them if necessary
  let hasAcceptedStatus = false;
  let hasOfferReceivedStatus = false;
  let hasCompletedStatus = false;
  let hasInProgressStatus = false;

  $.each( groupByStatus, function( key, value ) {
    if(key === "Oferta recibido") {
      hasOfferReceivedStatus = true;
    }
    if(key === "Aceptado") {
      hasAcceptedStatus = true;
    }
    if(key === "Completado") {
      hasCompletedStatus = true;
    }
    if(key === "En marcha") {
      hasInProgressStatus = true;
    }
	});

  if(!hasOfferReceivedStatus) {
    groupByStatus["Oferta recibido"] = 0;
  }
  if(!hasAcceptedStatus) {
    groupByStatus["Aceptado"] = 0;
  }
  if(!hasCompletedStatus) {
    groupByStatus["Completado"] = 0;
  }
  if(!hasInProgressStatus) {
    groupByStatus["En marcha"] = 0;
  }

  const chartData = [];
  // Add headers row
  chartData.push(["Estados", "# ofertas"]);
  $.each( groupByStatus, function( key, value ) {
    let itemArr = [];
    itemArr.push(key);
    itemArr.push(value);
    chartData.push(itemArr);
  });

  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    chart: {
      title: 'Estados de ofertas',
      chartArea: {'width': '80%', 'height': '80%'}
    }
  };

  var chart = new google.charts.Bar(document.getElementById('chart-column-phase-status'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}
