setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartGaugeMonthlyOffers);
}, CSV_LOAD_WAIT_TIME());

function drawChartGaugeMonthlyOffers() {

  const TARGET_OFFERS = 8;

  const CURRENT_DATE = new Date();

  const MONTHLY_OFFERS =
    DATA_SET
    .filter(item => item.statusDate.getFullYear() === CURRENT_DATE.getFullYear())
    .filter(item => item.statusDate.getMonth() === CURRENT_DATE.getMonth())
    .map(item => item).length;

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Ofertas mes', MONTHLY_OFFERS]
  ]);

  var options = {
    width: 500, height: 375,
    redFrom: 0, redTo: parseInt(TARGET_OFFERS/3),
    yellowFrom: parseInt(TARGET_OFFERS/3), yellowTo: parseInt((TARGET_OFFERS/3)*2),
    greenFrom: parseInt((TARGET_OFFERS/3)*2), greenTo: TARGET_OFFERS,
    max: TARGET_OFFERS,
    minorTicks: 0,
    majorTicks: TARGET_OFFERS
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_gauge_monthly_offers'));

  chart.draw(data, options);

}
