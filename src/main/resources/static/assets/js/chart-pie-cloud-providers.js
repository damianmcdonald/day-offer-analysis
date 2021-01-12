setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartCloudProviders);
}, CSV_LOAD_WAIT_TIME());

function drawChartCloudProviders() {

  const groupByCloudProvider = DATA_SET.reduce((acc, item) => {
    acc[item.cloud] = acc[item.cloud] + 1 || 1;
    return acc;
  }, {});

  const chartData = [];
  // Add headers row
  chartData.push(["Cloud", "Ofertas"]);
  $.each( groupByCloudProvider, function( key, value ) {
    let itemArr = [];
    itemArr.push(key);
    itemArr.push(value);
    chartData.push(itemArr);
  });

  const data = google.visualization.arrayToDataTable(chartData);
  const options = {
    title: '% distributión de Cloud Providers',
    is3D: true,
    chartArea: {'width': '100%', 'height': '80%'},
    legend: {'position': 'bottom'},
    pieSliceText: 'label'
  };
  const chart = new google.visualization.PieChart(document.getElementById('chart_pie_cloud_providers'));
  chart.draw(data, options);
}
