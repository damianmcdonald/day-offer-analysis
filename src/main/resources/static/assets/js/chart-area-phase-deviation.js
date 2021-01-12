setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartAreaDeviation);
}, CSV_LOAD_WAIT_TIME());

function drawChartAreaDeviation() {

  // Requirements gathering phase averages
  const averagePhase1Pre = DATA_SET.reduce((sum, item) => sum + item.phase1EstimatePre, 0) / DATA_SET.length;
  const averagePhase1 = DATA_SET.reduce((sum, item) => sum + item.phase1Estimate, 0) / DATA_SET.length;
  const averagePhase1Deviation = DATA_SET.reduce((sum, item) => sum + item.phase1Deviation, 0) / DATA_SET.length;

  // Design phase averages
  const averagePhase2Pre = DATA_SET.reduce((sum, item) => sum + item.phase2EstimatePre, 0) / DATA_SET.length;
  const averagePhase2 = DATA_SET.reduce((sum, item) => sum + item.phase2Estimate, 0) / DATA_SET.length;
  const averagePhase2Deviation = DATA_SET.reduce((sum, item) => sum + item.phase2Deviation, 0) / DATA_SET.length;

  // Deploy phase averages
  const averagePhase3Pre = DATA_SET.reduce((sum, item) => sum + item.phase3EstimatePre, 0) / DATA_SET.length;
  const averagePhase3 = DATA_SET.reduce((sum, item) => sum + item.phase3Estimate, 0) / DATA_SET.length;
  const averagePhase3Deviation = DATA_SET.reduce((sum, item) => sum + item.phase3Deviation, 0) / DATA_SET.length;

  // Support phase averages
  const averagePhase4Pre = DATA_SET.reduce((sum, item) => sum + item.phase4EstimatePre, 0) / DATA_SET.length;
  const averagePhase4 = DATA_SET.reduce((sum, item) => sum + item.phase4Estimate, 0) / DATA_SET.length;
  const averagePhase4Deviation = DATA_SET.reduce((sum, item) => sum + item.phase4Deviation, 0) / DATA_SET.length;

  // Total phase averages
  const averageTotalPre = DATA_SET.reduce((sum, item) => sum + item.totalPre, 0) / DATA_SET.length;
  const averageTotal = DATA_SET.reduce((sum, item) => sum + item.total, 0) / DATA_SET.length;
  const averageTotalDeviation = DATA_SET.reduce((sum, item) => sum + item.totalDeviation, 0) / DATA_SET.length;

  var data = google.visualization.arrayToDataTable([
    ['Fase',          'Calc',                            ''                         ],
    ['Recopilación',  parseFloat(averagePhase1Pre),      parseFloat(averagePhase1) ],
    ['Diseño',        parseFloat(averagePhase2Pre),      parseFloat(averagePhase2) ],
    ['Implantación',  parseFloat(averagePhase3Pre),      parseFloat(averagePhase3) ],
    ['Soporte',       parseFloat(averagePhase4Pre),      parseFloat(averagePhase4) ],
    ['Total',         parseFloat(averageTotalPre),       parseFloat(averageTotal)  ]
  ]);

  var options = {
    title: 'Comparación de Calculadora y  estimación por fase',
    hAxis: {title: 'Fase',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0},
    chartArea: {'width': '80%', 'height': '80%'}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_area_phase_deviation'));
  chart.draw(data, options);
}
