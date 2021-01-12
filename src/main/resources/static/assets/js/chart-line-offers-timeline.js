setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartLineOfferTimeline);
}, CSV_LOAD_WAIT_TIME());

function drawChartLineOfferTimeline() {

  const groupByOffersPerMonth = DATA_SET.sort((a, b) => a.statusDateYYYYMM - b.statusDateYYYYMM)
      .reduce((acc, item) => {
        acc[item.statusDateYYYYMM] = acc[item.statusDateYYYYMM] + 1 || 1;
        return acc;
  }, {});

  const chartData = [];
  // Add headers row
  chartData.push(["Fechas", "Ofertas recibidos"]);
  $.each( groupByOffersPerMonth, function( key, value ) {
    let itemArr = [];
    let parsedDate = new Date(Date.parse(key));
    let formattedDate = parsedDate.getFullYear() + "-" + (parsedDate.getMonth() + 1);
    itemArr.push(formattedDate);
    itemArr.push(value);
    chartData.push(itemArr);
  });

  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    title: 'Linea temporal de ofertas',
    curveType: 'function',
    chartArea: {'width': '90%', 'height': '80%'},
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_line_offers_timeline'));

  chart.draw(data, options);
}
