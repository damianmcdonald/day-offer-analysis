// Load the dataset and parse csv to json
const DATA_SET = parseCsvtoJson();

const CSV_LOAD_WAIT_TIME = function () {
  if(DATA_SET.length > 0) {
    let MAX_WAIT_TIME = 200;
    let MIN_WAIT_TIME = 25;
    return Math.floor(Math.random() * (MAX_WAIT_TIME - MIN_WAIT_TIME + 1)) + MIN_WAIT_TIME;
  }
  let MAX_WAIT_TIME = 2000;
  let MIN_WAIT_TIME = 750;
  return Math.floor(Math.random() * (MAX_WAIT_TIME - MIN_WAIT_TIME + 1)) + MIN_WAIT_TIME;
}

google.charts.load('current', {'packages':['corechart', 'table', 'bar', 'gauge', 'wordtree']});