setTimeout(function(){
  google.charts.setOnLoadCallback(drawChartPhaseComparison);
}, CSV_LOAD_WAIT_TIME());

function drawChartPhaseComparison() {

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
    ['Fase', 'Calculadora', '', 'Desviación'],
    ['Recompilación', parseFloat(averagePhase1Pre), parseFloat(averagePhase1), parseFloat(averagePhase1Deviation)],
    ['Diseño', parseFloat(averagePhase2Pre), parseFloat(averagePhase2), parseFloat(averagePhase2Deviation)],
    ['Implantación', parseFloat(averagePhase3Pre), parseFloat(averagePhase3), parseFloat(averagePhase3Deviation)],
    ['Soporte', parseFloat(averagePhase4Pre), parseFloat(averagePhase4), parseFloat(averagePhase4Deviation)],
    ['Total', parseFloat(averageTotalPre), parseFloat(averageTotal), parseFloat(averageTotalDeviation)]
  ]);

  var options = {
    chart: {
      title: 'Precisión de la calculadora',
      chartArea: {'width': '80%', 'height': '100%'}
    }
  };

  var chart = new google.charts.Bar(document.getElementById('chart-column-phase-comparison'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}
