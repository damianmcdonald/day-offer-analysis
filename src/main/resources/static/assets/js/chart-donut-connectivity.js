setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartConnectivity);
}, CSV_LOAD_WAIT_TIME());

function drawChartConnectivity() {

  const groupByConnectivityOnPrem = DATA_SET.reduce((acc, item) => {
    acc[item.hasConnectivity] = acc[item.hasConnectivity] + 1 || 1;
    return acc;
  }, {});

  const groupByVpcPeering = DATA_SET.reduce((acc, item) => {
    acc[item.hasPeerings] = acc[item.hasPeerings] + 1 || 1;
    return acc;
  }, {});

  const chartData = [];
  // Add headers row
  chartData.push(["Conectividad", "Ofertas"]);
  chartData.push(["On-Prem", groupByConnectivityOnPrem.true]);
  chartData.push(["Internet público", groupByConnectivityOnPrem.false]);
  chartData.push(["VPC Peering", groupByVpcPeering.true]);

  const data = google.visualization.arrayToDataTable(chartData);
  const options = {
    title: 'Tipo de conectividad',
    pieHole: 0.4,
    chartArea: {'width': '100%', 'height': '80%'},
    legend: {'position': 'bottom'},
    pieSliceText: 'label'
  };
  const chart = new google.visualization.PieChart(document.getElementById('chart_donut_connectivity'));
  chart.draw(data, options);
}
