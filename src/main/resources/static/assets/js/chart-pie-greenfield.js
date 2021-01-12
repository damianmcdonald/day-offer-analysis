setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartGreenfield);
}, CSV_LOAD_WAIT_TIME());

function drawChartGreenfield() {

  const groupByGreenfield = DATA_SET.reduce((acc, item) => {
    acc[item.greenfield] = acc[item.greenfield] + 1 || 1;
    return acc;
  }, {});

  const groupByAdministered = DATA_SET.reduce((acc, item) => {
    acc[item.administered] = acc[item.administered] + 1 || 1;
    return acc;
  }, {});

  const chartData = [];
  // Add headers row
  chartData.push(["Tipo", "Ofertas"]);
  chartData.push(["Greenfield", groupByGreenfield.true]);
  chartData.push(["Non Greenfield", groupByGreenfield.false]);
  chartData.push(["Administrado", groupByAdministered.true]);
  chartData.push(["Non Administrado", groupByAdministered.false]);

  const data = google.visualization.arrayToDataTable(chartData);
  const options = {
    title: 'Greenfield y Administrado',
    is3D: true,
    chartArea: {'width': '100%', 'height': '80%'},
    legend: {'position': 'bottom'},
    pieSliceText: 'label'
  };
  const chart = new google.visualization.PieChart(document.getElementById('chart_pie_greenfield'));
  chart.draw(data, options);
}
