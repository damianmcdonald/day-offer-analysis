$(document).ready(function(){

   $("#execute-query").click(function() {
      const query = $("#textarea-query").val();
      const result = alasql(query,[DATA_SET]);
      // write the query results
      const displayResults = "\nResults ("+result.length+")\n"+JSON.stringify(result, undefined, 4);
      document.getElementById('results-code').innerHTML = displayResults;
      // highlight the code block
      Prism.highlightElement(document.getElementById('results-code'));
      // show the results block
      $("#results-div").show();
    });

    $("#clear-query").click(function() {
       // hide the results block
       $("#results-div").hide();
       // clear the Results
       document.getElementById('results-code').innerHTML="";
     });

     $("#data-schema-show-hide").click(function() {
        $("#data-schema").toggle("slow", "swing");
      });

});
