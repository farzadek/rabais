
var app = angular.module('costWebApp', ['ui.bootstrap', 'ngResource', 'ngRoute']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/report", {templateUrl: "partials/report.html", controller: "reportCtrl"})
    .when("/indt", {templateUrl: "partials/indt.html", controller: "indtCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "LogCtrl"})
    .when("/register", {templateUrl: "partials/register.html", controller: "regCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "contactCtrl"})
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

//======= CONTACT ===================================================================================
app.controller('contactCtrl', function ($scope, $http) {
  $scope.emptyName = false;
  $scope.emptyEmail = false;
  $scope.emptyMessage = false;
  $scope.correctMess = true;
  mailCorrect = false;

$scope.conName = function(){
  if($scope.contact_name.length<3){$scope.emptyName = true;}else{$scope.emptyName = false;}
  if($scope.contact_name.length>2 && $scope.contact_message.length>9 && mailCorrect){
      $scope.correctMess = false;
  }
  else{$scope.correctMess = true;}

}

$scope.conMessage = function(){
  if($scope.contact_message.length<10){$scope.emptyMessage = true;}else{$scope.emptyMessage = false;}
  if($scope.contact_name.length>2 && $scope.contact_message.length>9 && mailCorrect){
      $scope.correctMess = false;
  }
  else{$scope.correctMess = true;}

}

$scope.conEmail = function(){
  mailCorrect = /\S+@\S+\.\S+/.test($scope.contact_email);

  if(!mailCorrect){$scope.emptyEmail = true;}else{$scope.emptyEmail = false;}
  if($scope.contact_name.length>2 && $scope.contact_message.length>9 && mailCorrect){
      $scope.correctMess = false;
  }
  else{
    if($scope.contact_name.length<3){$scope.emptyName = true;}else{$scope.emptyName = false;}
      $scope.correctMess = true;
  }

}

$scope.sendMail = function(){
  alert('send');
  $http({
        url: "http://farzadkamali12.net76.net/cityloft/js/contct.php",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({cname:$scope.contact_name, cemail:$scope.contact_email, cphone:$scope.contact_phone, cmessage:$scope.contact_message})
    })
      
      .success(function(data, status, headers, config) { 
          $scope.contact_name='';
          $scope.contact_message='';
          $scope.contact_email='';
          $scope.contact_phone=''; 
      })
      .error(function(data, status, headers, config) {alert('Something wrong, Email not sent!'); });

}


});

//======= REPORTS ===================================================================================
app.controller('reportCtrl', function ($scope, $http) {


  $scope.showChart1 = true;
  $scope.showChart2 = false;
  $scope.showChart3 = false;
  $scope.showChart4 = false;

  $scope.chart1 = function(){ //  =========== CHART1 =============================================================
    $scope.showChart1 = true;
    $scope.showChart2 = false;
    $scope.showChart3 = false;
    $scope.showChart4 = false; 
    $( "#c1" ).addClass( "active" );   
    $( "#c2" ).removeClass( "active" );   
    $( "#c3" ).removeClass( "active" );   
    $( "#c4" ).removeClass( "active" ); 
    node = document.getElementById('chart1');
    while (node.hasChildNodes()) {
     node.removeChild(node.lastChild);
    }

      $http.get("http://farzadkamali12.net76.net/cityloft/js/actions.php")
    .then(function(response) {$scope.actionData = response.data.records;});


  $("#chart1").append("<svg class='chart1'></svg>");

  var el = new Array(12);
  for(i=0;i<12;i++)
    el[i]=new Array(2);

  for(i=0; i<12; i++){el[i][0]=0; el[i][1]=0;}

  for(i=0; i<$scope.actionData.length; i++){
      var mnt = Number($scope.actionData[i].dates.charAt(5)+$scope.actionData[i].dates.charAt(6))-1;
      if($scope.actionData[i].expense==0)
          el[mnt][0]+=Number($scope.actionData[i].price1);
      else
          el[mnt][1]+=Number($scope.actionData[i].price1);        
  }

for(i=0; i<12; i++){el[i][0]=el[i][0].toFixed(1); el[i][1]=el[i][1].toFixed(1);}

var data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    { label: 'Incomes',
      values: [el[0][0], el[1][0], el[2][0], el[3][0], el[4][0], el[5][0], el[6][0], el[7][0], el[8][0], el[9][0], el[10][0], el[11][0]]},    
    { label: 'Expenses',
      values: [el[0][1], el[1][1], el[2][1], el[3][1], el[4][1], el[5][1], el[6][1], el[7][1], el[8][1], el[9][1], el[10][1], el[11][1]]}
    ]};

var chartWidth       = 650,
    barHeight        = 20,
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 35,
    spaceForLegend   = 115;

var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}

// Color scale
var color = d3.scale.category20();
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var chart = d3.select("#chart1 .chart1")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);

// Draw legend
var legendRectSize = 15,
    legendSpacing  = 5;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });





  }

  $scope.chart2 = function(){ //  =========== CHART2 =============================================================
    $scope.showChart1 = false;
    $scope.showChart2 = true;
    $scope.showChart3 = false;
    $scope.showChart4 = false;    
    $( "#c1" ).removeClass( "active" );   
    $( "#c2" ).addClass( "active" );   
    $( "#c3" ).removeClass( "active" );   
    $( "#c4" ).removeClass( "active" );   

    node = document.getElementById('chart2');
    while (node.hasChildNodes()) {
     node.removeChild(node.lastChild);
    }

    //$http.get("./js/actions.php")
    $http.get("http://farzadkamali12.net76.net/cityloft/js/actions.php")
       .then(function(response) {$scope.actionData = response.data.records;});

  var barColor = 'steelblue';
  function segColor(c){ return {quebec:"#807dba", canada:"#e08214",college:"#41ab5d",job:"#918b5d",etc:"#f18b5d"}[c]; }

  function dashboard(id, fData){

    fData.forEach(function(d){d.total=d.freq.quebec+d.freq.canada+d.freq.college+d.freq.job+d.freq.etc;});
    
    // compute total for each state.
    
    // function to handle histogram.
    function histoGram(fD){
        var hG={},    hGDim = {t: 15, r: 0, b: 30, l: 0};
        hGDim.w =  800 - hGDim.l - hGDim.r, 
        hGDim.h = 300 - hGDim.t - hGDim.b;
            
        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");
        
        //create the rectangles.
        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined below.
            .on("mouseout",mouseout);// mouseout is defined below.
            
        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle");
        
        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected state.
            var st = fData.filter(function(s){ return s.month == d[0];})[0],
                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
               
            // call update functions of pie-chart and legend.    
            pC.update(nD);
            leg.update(nD);
        }
        
        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.    
            pC.update(tF);
            leg.update(tF);
        }
        
        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color){
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
            
            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);
            
            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d[1])})
                .attr("y", function(d) {return y(d[1])-5; });            
        }        
        return hG;
    }
    
    // function to handle pieChart.
    function pieChart(pD){
        var pC ={},    pieDim ={w:300, h: 300};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                
        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }        
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){ 
                return [v.month,v.freq[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram with all data.
            hG.update(fData.map(function(v){
                return [v.month,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }    
        return pC;
    }
    
    // function to handle legend.
    function legend(lD){
        var leg = {};
            
        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');
        
        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
            
        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
      .attr("fill",function(d){ return segColor(d.type); });
            
        // create the second column for each segment.
        tr.append("td").text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

            // update the percentage column.
            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
        }
        
        function getLegend(d,aD){ // Utility function to compute percentage.
            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }
    
    // calculate total frequency by segment for all state.
    var tF = ['quebec','canada','college','job','etc'].map(function(d){ 
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
    });    
    
    // calculate total frequency by state for all segment.
    var sF = fData.map(function(d){return [d.month,d.total];});

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(tF);  // create the legend.
}

    var a = new Array(12);
    for(i=0;i<12;i++)
      a[i]=new Array(5);

    for(i=0;i<12;i++)
      for(j=0;j<5;j++)
        a[i][j] = 0;


      for(j=0;j<$scope.actionData.length;j++){
        var str = Number($scope.actionData[j].dates.charAt(5)+$scope.actionData[j].dates.charAt(6));
        if($scope.actionData[j].expense==0){ 
          grp=$scope.actionData[j].mgroup;
          a[str-1][grp]+=Number($scope.actionData[j].price1);
        }
      }



var freqData=[
{month:'Jan',freq:{quebec:a[0][0], canada:a[0][1], college:a[0][2], job:a[0][3], etc:a[0][4]}}
,{month:'Feb',freq:{quebec:a[1][0], canada:a[1][1], college:a[1][2], job:a[1][3], etc:a[1][4]}}
,{month:'Mar',freq:{quebec:a[2][0], canada:a[2][1], college:a[2][2], job:a[2][3], etc:a[2][4]}}
,{month:'Apr',freq:{quebec:a[3][0], canada:a[3][1], college:a[3][2], job:a[3][3], etc:a[3][4]}}
,{month:'May',freq:{quebec:a[4][0], canada:a[4][1], college:a[4][2], job:a[4][3], etc:a[4][4]}}
,{month:'Jun',freq:{quebec:a[5][0], canada:a[5][1], college:a[5][2], job:a[5][3], etc:a[5][4]}}
,{month:'Jul',freq:{quebec:a[6][0], canada:a[6][1], college:a[6][2], job:a[6][3], etc:a[6][4]}}
,{month:'Aug',freq:{quebec:a[7][0], canada:a[7][1], college:a[7][2], job:a[7][3], etc:a[7][4]}}
,{month:'Sep',freq:{quebec:a[8][0], canada:a[8][1], college:a[8][2], job:a[8][3], etc:a[8][4]}}
,{month:'Oct',freq:{quebec:a[9][0], canada:a[9][1], college:a[9][2], job:a[9][3], etc:a[9][4]}}
,{month:'Nov',freq:{quebec:a[10][0], canada:a[10][1], college:a[10][2], job:a[10][3], etc:a[10][4]}}
,{month:'Dec',freq:{quebec:a[11][0], canada:a[11][1], college:a[11][2], job:a[11][3], etc:a[11][4]}}
];

dashboard('#chart2',freqData);



}

  $scope.chart3 = function(){ //  =========== CHART3 =============================================================
    $scope.showChart1 = false;
    $scope.showChart2 = false;
    $scope.showChart3 = true;
    $scope.showChart4 = false;    
    $( "#c1" ).removeClass( "active" );   
    $( "#c2" ).removeClass( "active" );   
    $( "#c3" ).addClass( "active" );   
    $( "#c4" ).removeClass( "active" );   
    node = document.getElementById('chart3');
    while (node.hasChildNodes()) {
     node.removeChild(node.lastChild);
    }


//$http.get("./js/actions.php")
    $http.get("http://farzadkamali12.net76.net/cityloft/js/actions.php")
      .then(function(response) {$scope.actionData = response.data.records;});

  var barColor = '#b03454';
  function segColor(c){ return {House:"gold", Egg_Dairy:"BlueViolet ",Transportation:"BurlyWood",Governmental:"CadetBlue",Dairies:"Chocolate",
                                Meat:"Chartreuse",Hygienic:"coral",Meat:"brown",Rice_Bread:"red",Hygienic:"DarkGoldenRod",Fruits:"darkgray",
                                Drinks:"darkgreen",Restaurant:"DarkKhaki",Other_foods:"DarkMagenta",Baby:"DarkOrange",Clothes:"DeepPink",
                                Medication:"#420060",Car:"DeepSkyBlue",Other:"blue"}[c]; }

  function dashboard3(id, fData){

    fData.forEach(function(d){d.total=d.freq.House+d.freq.Transportation+d.freq.Governmental+d.freq.Dairies+d.freq.Meat+d.freq.Rice_Bread+
                              d.freq.Hygienic+d.freq.Meat+d.freq.Fruits+d.freq.Fruits+d.freq.Drinks+d.freq.Restaurant+d.freq.Other_foods
                              +d.freq.Baby+d.freq.Clothes+d.freq.Medication+d.freq.Car+d.freq.Other});
    
    // compute total for each state.
    
    // function to handle histogram.
    function histoGram(fD){
        var hG={},    hGDim = {t: 15, r: 0, b: 30, l: 0};
        hGDim.w =  700 - hGDim.l - hGDim.r, 
        hGDim.h = 300 - hGDim.t - hGDim.b;
            
        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");
        
        //create the rectangles.
        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined below.
            .on("mouseout",mouseout);// mouseout is defined below.
            
        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle");
        
        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected state.
            var st = fData.filter(function(s){ return s.month == d[0];})[0],
                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
               
            // call update functions of pie-chart and legend.    
            pC.update(nD);
            leg.update(nD);
        }
        
        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.    
            pC.update(tF);
            leg.update(tF);
        }
        
        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color){
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
            
            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);
            
            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d[1])})
                .attr("y", function(d) {return y(d[1])-5; });            
        }        
        return hG;
    }
    
    // function to handle pieChart.
    function pieChart(pD){
        var pC ={},    pieDim ={w:550, h: 550};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                
        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }        
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){ 
                return [v.month,v.freq[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram with all data.
            hG.update(fData.map(function(v){
                return [v.month,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }    
        return pC;
    }
    
    // function to handle legend.
    function legend(lD){
        var leg = {};
            
        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');
        
        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
            
        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
      .attr("fill",function(d){ return segColor(d.type); });
            
        // create the second column for each segment.
        tr.append("td").text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

            // update the percentage column.
            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
        }
        
        function getLegend(d,aD){ // Utility function to compute percentage.
            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }
    
    // calculate total frequency by segment for all state.
    var tF = ['House','Transportation','Governmental','Dairies','Meat','Rice_Bread','Hygienic','Fruits','Drinks','Restaurant',
              'Other_foods','Baby','Clothes','Medication','Car','Other'].map(function(d){ 
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
    });    

    
    // calculate total frequency by state for all segment.
    var sF = fData.map(function(d){return [d.month,d.total];});

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(tF);  // create the legend.
}

    var a = new Array(12);
    for(i=0;i<12;i++)
      a[i]=new Array(16);

    for(i=0;i<12;i++)
      for(j=0;j<16;j++)
        a[i][j] = 0;


      for(j=0;j<$scope.actionData.length;j++){
        var str = Number($scope.actionData[j].dates.charAt(5)+$scope.actionData[j].dates.charAt(6));
        if($scope.actionData[j].expense==1){ 
          grp=$scope.actionData[j].mgroup;
          a[str-1][grp]+=Number($scope.actionData[j].price1);
        }
      }



var freqData=[
{month:'Jan',freq:{House:a[0][0], Transportation:a[0][1], Governmental:a[0][2], Dairies:a[0][3], Meat:a[0][4], Rice_Bread:a[0][5],
              Hygienic:a[0][6], Fruits:a[0][7], Drinks:a[0][8], Restaurant:a[0][9], Other_foods:a[0][10], Baby:a[0][11], Clothes:a[0][12], 
              Medication:a[0][13], Car:a[0][14], Other:a[0][15]}}

,{month:'Feb',freq:{House:a[1][0], Transportation:a[1][1], Governmental:a[1][2], Dairies:a[1][3], Meat:a[1][4], Rice_Bread:a[1][5],
              Hygienic:a[1][6], Fruits:a[1][7], Drinks:a[1][8], Restaurant:a[1][9], Other_foods:a[1][10], Baby:a[1][11], Clothes:a[1][12], 
              Medication:a[1][13], Car:a[1][14], Other:a[1][15]}}

,{month:'Mar',freq:{House:a[2][0], Transportation:a[2][1], Governmental:a[2][2], Dairies:a[2][3], Meat:a[2][4], Rice_Bread:a[2][5],
              Hygienic:a[2][6], Fruits:a[2][7], Drinks:a[2][8], Restaurant:a[2][9], Other_foods:a[2][10], Baby:a[2][11], Clothes:a[2][12], 
              Medication:a[2][13], Car:a[2][14], Other:a[2][15]}}

,{month:'Apr',freq:{House:a[3][0], Transportation:a[3][1], Governmental:a[3][2], Dairies:a[3][3], Meat:a[3][4], Rice_Bread:a[3][5],
              Hygienic:a[3][6], Fruits:a[3][7], Drinks:a[3][8], Restaurant:a[3][9], Other_foods:a[3][10], Baby:a[3][11], Clothes:a[3][12], 
              Medication:a[3][13], Car:a[3][14], Other:a[3][15]}}

,{month:'May',freq:{House:a[4][0], Transportation:a[4][1], Governmental:a[4][2], Dairies:a[4][3], Meat:a[4][4], Rice_Bread:a[4][5],
              Hygienic:a[4][6], Fruits:a[4][7], Drinks:a[4][8], Restaurant:a[4][9], Other_foods:a[4][10], Baby:a[4][11], Clothes:a[4][12], 
              Medication:a[4][13], Car:a[4][14], Other:a[4][15]}}

,{month:'Jun',freq:{House:a[5][0], Transportation:a[5][1], Governmental:a[5][2], Dairies:a[5][3], Meat:a[5][4], Rice_Bread:a[5][5],
              Hygienic:a[5][6], Fruits:a[5][7], Drinks:a[5][8], Restaurant:a[5][9], Other_foods:a[5][10], Baby:a[5][11], Clothes:a[5][12], 
              Medication:a[5][13], Car:a[5][14], Other:a[5][15]}}

,{month:'Jul',freq:{House:a[6][0], Transportation:a[6][1], Governmental:a[6][2], Dairies:a[6][3], Meat:a[6][4], Rice_Bread:a[6][5],
              Hygienic:a[6][6], Fruits:a[6][7], Drinks:a[6][8], Restaurant:a[6][9], Other_foods:a[6][10], Baby:a[6][11], Clothes:a[6][12], 
              Medication:a[6][13], Car:a[6][14], Other:a[6][15]}}

,{month:'Aug',freq:{House:a[7][0], Transportation:a[7][1], Governmental:a[7][2], Dairies:a[7][3], Meat:a[7][4], Rice_Bread:a[7][5],
              Hygienic:a[7][6], Fruits:a[7][7], Drinks:a[7][8], Restaurant:a[7][9], Other_foods:a[7][10], Baby:a[7][11], Clothes:a[7][12], 
              Medication:a[7][13], Car:a[7][14], Other:a[7][15]}}

,{month:'Sep',freq:{House:a[8][0], Transportation:a[8][1], Governmental:a[8][2], Dairies:a[8][3], Meat:a[8][4], Rice_Bread:a[8][5],
              Hygienic:a[8][6], Fruits:a[8][7], Drinks:a[8][8], Restaurant:a[8][9], Other_foods:a[8][10], Baby:a[8][11], Clothes:a[8][12], 
              Medication:a[8][13], Car:a[8][14], Other:a[8][15]}}

,{month:'Oct',freq:{House:a[9][0], Transportation:a[9][1], Governmental:a[9][2], Dairies:a[9][3], Meat:a[9][4], Rice_Bread:a[9][5],
              Hygienic:a[9][6], Fruits:a[9][7], Drinks:a[9][8], Restaurant:a[9][9], Other_foods:a[9][10], Baby:a[9][11], Clothes:a[9][12], 
              Medication:a[9][13], Car:a[9][14], Other:a[9][15]}}

,{month:'Nov',freq:{House:a[10][0], Transportation:a[10][1], Governmental:a[10][2], Dairies:a[10][3], Meat:a[10][4], Rice_Bread:a[10][5],
              Hygienic:a[10][6], Fruits:a[10][7], Drinks:a[10][8], Restaurant:a[10][9], Other_foods:a[10][10], Baby:a[10][11], Clothes:a[10][12], 
              Medication:a[10][13], Car:a[10][14], Other:a[10][15]}}

,{month:'Dec',freq:{House:a[11][0], Transportation:a[11][1], Governmental:a[11][2], Dairies:a[11][3], Meat:a[11][4], Rice_Bread:a[11][5],
              Hygienic:a[11][6], Fruits:a[11][7], Drinks:a[11][8], Restaurant:a[11][9], Other_foods:a[11][10], Baby:a[11][11], Clothes:a[11][12], 
              Medication:a[11][13], Car:a[11][14], Other:a[11][15]}}
];

dashboard3('#chart3',freqData);



}



});


//======= ENTER/EDIT DATA ===================================================================================
app.controller('indtCtrl', function ($scope, $http) {

  $scope.predicate = 'dates';  
  $scope.reverse = true;  
  $scope.currentPage = 1;  
  $scope.isIncome = true;

  $scope.saveData = function(){
    var tmp_exp = (document.getElementById("exin1").checked)?true:false; 
    var tmp_grp = (tmp_exp)?document.getElementById("exgrp").selectedIndex:document.getElementById("ingrp").selectedIndex;
    var tmp_prc1 = $scope.amnt1; tmp_prc1 = parseFloat(tmp_prc1).toFixed(2);
    var tmp_prc2 = $scope.amnt2; tmp_prc2 = parseFloat(tmp_prc2).toFixed(2);
    $http({
        //url: "./js/savedata.php",
        url: "http://farzadkamali12.net76.net/cityloft/js/savedata.php",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({id:isNew, title:$scope.title, price1:tmp_prc1, price2:tmp_prc2, tax:$scope.tx, expense:tmp_exp,
                      group:tmp_grp, date:$scope.iDate})
    })
      
      .success(function(data, status, headers, config) { 

          $http.get("http://farzadkamali12.net76.net/cityloft/js/actions.php")
            .then(function(response) {$scope.actionData = response.data.records;});
          $scope.NeEd = false; 
          document.getElementById("exin2").checked = false;
      })
      .error(function(data, status, headers, config) {alert('Something wrong in system!'); });

    

  }

  $scope.order = function (predicate) {  
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
    $scope.predicate = predicate;  
  };  

  $http.get("http://farzadkamali12.net76.net/cityloft/js/actions.php")
  //$http.get("./js/actions.php")
    .then(function(response) {$scope.actionData = response.data.records;});
    

  $scope.numPerPage = 8;  

  $scope.paginate = function (value) {  
    $scope.totalItems = $scope.actionData.length; 
    var begin, end, index;  
    begin = ($scope.currentPage - 1) * $scope.numPerPage;  
    end = begin + $scope.numPerPage;  
    index = $scope.actionData.indexOf(value);  
    return (begin <= index && index < end);  
  };  
     
  $scope.inex1 = function(){
    $scope.incm = true;
    document.getElementById("exin1").checked = true;
    document.getElementById("exin2").checked = false;
    $scope.isIncome = true;}  

  $scope.inex2 = function(){
    $scope.incm = false;  
    document.getElementById("exin1").checked = false;
    document.getElementById("exin2").checked = true;
    $scope.tx = false;
    $scope.isIncome = false;
    $scope.amnt2 = $scope.amnt1;}  

  $scope.dtEdit = function(x){
    $scope.NeEd = true;
    if(x == 'new'){
      isNew = null;
      if($scope.amnt1Err){$scope.amnt1Err = false;}
      $scope.incm = true;
      document.getElementById("exin1").checked = true;
      document.getElementById("exgrp").selectedIndex = 0;
      document.getElementById("ingrp").selectedIndex = 0;
      $scope.costItem = 0;
      $scope.tx = false;
      $scope.amnt1 = 0;
      $scope.amnt2 = 0;
      $scope.title = "";
      var myDate = new Date();
      $scope.iDate = myDate.getFullYear()+'-'+(myDate.getMonth() + 1)+'-'+myDate.getDate();
    }
    else{
      for(i=0; i<$scope.actionData.length; i++){
        if( $scope.actionData[i].id == x ){
        
          isNew = x;  arrayItem = i;
          $scope.amnt1Err = false;
          if($scope.actionData[i].expense == 1){
              $scope.incm = true;
              document.getElementById("exin1").checked = true;
              document.getElementById("exin2").checked = false;
              document.getElementById("exgrp").selectedIndex = $scope.actionData[i].mgroup;
              document.getElementById("ingrp").selectedIndex = 0;
          }
          else{
              $scope.incm = false;
              document.getElementById("exin1").checked = false;
              document.getElementById("exin2").checked = true;
              document.getElementById("exgrp").selectedIndex = 0;
              document.getElementById("ingrp").selectedIndex = $scope.actionData[i].mgroup;
          }
        
          if($scope.actionData[i].tax == 1){document.getElementById("tx").checked = true;}else{document.getElementById("tx").checked = false;}
          $scope.amnt1 = $scope.actionData[i].price;
          $scope.title = $scope.actionData[i].title;
          $scope.iDate = $scope.actionData[i].dates;
          $scope.amnt2 = $scope.actionData[i].price1;
          break;
        }


      } 
    }
  };

  $scope.txCh = function(){
    if($scope.tx){$scope.amnt2 = $scope.amnt1*115/100;}else{$scope.amnt2 = $scope.amnt1;};
  };

  $scope.amntCh = function(){
      amntCorrect = /(?:\d*\.)?\d+/.test($scope.amnt1);
      if(amntCorrect){
        $scope.amnt1Err = false;
        if($scope.tx){$scope.amnt2 = $scope.amnt1*115/100;}
        else{$scope.amnt2 = $scope.amnt1;}
      }  
      else{$scope.amnt1Err = true;}
  };

  $scope.closeEditBox = function(){
    $scope.NeEd = false;
  }


});


//==========================================================================================
app.controller('PageCtrl', function () {

  $('.carousel').carousel({
    interval: 5000
  });

  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});


//======= LOGIN ===================================================================================
app.controller('LogCtrl', function ($scope, $http) {
  
  $scope.unFound = true;

  $http.get("http://farzadkamali12.net76.net/cityloft/js/users.php")
  //$http.get("./js/users.php")
    .then(function(response) {$scope.userData = response.data.records;});

  $scope.lUserTest = function(){
    a = document.getElementById('luname').value;
    b = document.getElementById('lpassword').value;
    
    var tempVar = false;
    var tempVarP = false;

    for(i=0; i<$scope.userData.length; i++){
      if( $scope.userData[i].username == a ){ 
        tempVar = true;
        if( $scope.userData[i].password == b ){ tempVarP = true; }
      }
    }

    if(tempVar && tempVarP){$scope.unFound = true;alert('USER LOGGEDIN');} else {$scope.unFound = false;}
  };  

});


//======= REGISTER ===================================================================================
app.controller('regCtrl', function ($scope, $http) {
  
  $scope.unExist = false;
  $scope.unMinLen = false;
  $scope.unMinPass1 = false;
  $scope.unMinPass2 = false;
  $scope.regNotOk = true;
  $scope.sMlOk = true;

  $http.get("http://farzadkamali12.net76.net/cityloft/js/users.php")
  //$http.get("./js/users.php")
    .then(function(response) {$scope.userData = response.data.records;});

  $scope.lUserTest = function(){
    a = document.getElementById('sUname').value;
    b = document.getElementById('spassword1').value;
    
    $scope.unMinLen = false;
    if(a.length>5){
      $scope.unMinLen = false;
      }  
    else{$scope.unMinLen = true;}
    
    if($scope.unMinLen || $scope.unExist || $scope.unMinPass1 || $scope.unMinPass2 || $scope.sMlOk)
      {$scope.regNotOk = true;}else{$scope.regNotOk = false;}
  }; 

  $scope.lPass1Test = function(){
    b = document.getElementById('spassword1').value;
    if(b.length>7){$scope.unMinPass1 = false;}  
    else{$scope.unMinPass1 = true;}
    if($scope.unMinLen || $scope.unExist || $scope.unMinPass1 || $scope.unMinPass2 || $scope.sMlOk)
      {$scope.regNotOk = true;}else{$scope.regNotOk = false;}

  }; 

  $scope.lPass2Test = function(){
    b = document.getElementById('spassword1').value;
    c = document.getElementById('spassword2').value;
    if(b == c){$scope.unMinPass2 = false;}  
    else{$scope.unMinPass2 = true;}
    if($scope.unMinLen || $scope.unExist || $scope.unMinPass1 || $scope.unMinPass2 || $scope.sMlOk)
      {$scope.regNotOk = true;}else{$scope.regNotOk = false;}
  }; 

  $scope.sMailTest = function(){
    d = document.getElementById('semail').value;
    mailCorrect = /\S+@\S+\.\S+/.test(d);
    var tempVar = false;

    if(mailCorrect){
      for(i=0; i<$scope.userData.length;i++){
        if($scope.userData[i].email == d){
          tempVar = true;
          break;
        }
      }
      $scope.sMlOk = false;
    }  
    else{$scope.sMlOk = true;}

    if(tempVar){$scope.unExist = true;} else{$scope.unExist = false;}
    if($scope.unMinLen || $scope.unExist || $scope.unMinPass1 || $scope.unMinPass2 || $scope.sMlOk)
      {$scope.regNotOk = true;}
    else{$scope.regNotOk = false;}
  }; 


  $scope.lUserReg = function(){
    
    var a = document.getElementById('sUname').value;
    var b = document.getElementById('spassword1').value;
    var c = document.getElementById('semail').value;
    
      $http({
        //url: "http://farzadkamali12.net76.net/cityloft/js/register.php",
        url: "./js/register.php",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({username:a, password:b, email:c})
        })
      .success(function(data, status, headers, config) {   
        window.location.assign('#/login');
      })
      .error(function(data, status, headers, config) {alert('Something wrong in system! '+status);
    });

    }


});

