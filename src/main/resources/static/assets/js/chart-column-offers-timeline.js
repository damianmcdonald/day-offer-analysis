setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartColumnOfferTimeline);
}, CSV_LOAD_WAIT_TIME());

function drawChartColumnOfferTimeline() {

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
    title: 'Ofertas por mes',
    chartArea: {'width': '80%', 'height': '100%'},
    legend: { position: 'none' }
  };

  var chart = new google.charts.Bar(document.getElementById('chart_column_offers_timeline'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}
