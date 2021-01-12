google.charts.load('current', {'packages':['table']});

setTimeout(function(){
  google.charts.setOnLoadCallback(drawTableMain);
}, CSV_LOAD_WAIT_TIME());

function drawTableMain() {
  var data = new google.visualization.DataTable();

  // generate colum types and names
  data.addColumn('string', 'Client');
  data.addColumn('string', 'Status');
  data.addColumn('date', 'Status Date');
  data.addColumn('date', 'Status Date YYYY');
  data.addColumn('date', 'Status Date YYYY-MM');
  data.addColumn('number', 'Status Date Timestamp');
  data.addColumn('string', 'Cloud');
  data.addColumn('boolean', 'isGreenfield');
  data.addColumn('number', '# Regions');
  data.addColumn('number', '# Accounts');
  data.addColumn('number', '# Applications');
  data.addColumn('number', '# VPCs');
  data.addColumn('number', '# Subredes');
  data.addColumn('boolean', 'Conect On-Prem');
  data.addColumn('boolean', 'VPC Peering');
  data.addColumn('boolean', 'Directory Service');
  data.addColumn('boolean', 'Seguridad avanzada');
  data.addColumn('boolean', 'Logging avanzada');
  data.addColumn('boolean', 'Monitoring avanzada');
  data.addColumn('boolean', 'Backup avanzada');
  data.addColumn('number', '# Máquinas virtuales');
  data.addColumn('number', '# Buckets');
  data.addColumn('number', '# BBDD');
  data.addColumn('boolean', 'Load balancer');
  data.addColumn('boolean', 'hasAutomatización');
  data.addColumn('boolean', 'Otros servcios');
  data.addColumn('string', 'Servicio 1');
  data.addColumn('string', 'Servicio 2');
  data.addColumn('string', 'Servicio 3');
  data.addColumn('string', 'Servicio 4');
  data.addColumn('string', 'Servicio 5');
  data.addColumn('number', 'Recop. Pre');
  data.addColumn('number', 'Recop.');
  data.addColumn('number', 'Recop. Deviation');
  data.addColumn('number', 'Diseño Pre');
  data.addColumn('number', 'Diseño');
  data.addColumn('number', 'Diseño Deviation');
  data.addColumn('number', 'Impl. Pre');
  data.addColumn('number', 'Impl.');
  data.addColumn('number', 'Impl. Deviation');
  data.addColumn('number', 'Soporte Pre');
  data.addColumn('number', 'Soporte');
  data.addColumn('number', 'Soporte Deviation');
  data.addColumn('number', 'Total Pre');
  data.addColumn('number', 'Total');
  data.addColumn('number', 'Total Deviation');
  data.addColumn('number', 'Viajes');
  data.addColumn('boolean', 'Administrado');
  data.addColumn('string', 'Ubicación');
  data.addColumn('boolean', 'Validez calc');

  // generate table row data
  const tableRowData = [];
  $.each( DATA_SET, function( elem_key, elem_value ) {
    let singleRowData = [];
    $.each( elem_value, function( item_key, item_value ) {
      singleRowData.push(item_value);
    });
    tableRowData.push(singleRowData);
  });
  data.addRows(tableRowData);

  // render the table
  const table = new google.visualization.Table(document.getElementById('chart_main_table_div'));
  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}
