const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


d3.json(url).then (data => {
   
   // Populate drop down list with samples id
    var droplist = data.names;
    droplist.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    })

    
    // Setup opening page data
    function init() {
        // Read dropdown list id
        getData();
    }

    // Retrieve selected id from drop down list
    d3.selectAll("#selDataset").on("change", getData);

    function getData() {
        var dropdownMenu = d3.select("#selDataset");
        var sel_id = dropdownMenu.property("value");

        dataset_sample = data.samples.filter(data_id => data_id.id === sel_id)[0];

        for (let i = 0; i < data.metadata.length; i++) {
            if (data.metadata[i].id == sel_id){
                meta_data = data.metadata[i];
            };
        }
        var demo_info = d3.select("#sample-metadata");
        demo_info.html("");
        Object.entries(meta_data).forEach(([key, value]) => {
            demo_info.append("h6").text(`${key}: ${value}`)
        })
        updatePlotly(dataset_sample);
        updateGauge(meta_data);
    }

    function updatePlotly(dataset_sample) {

        var otu_labels = dataset_sample.otu_labels;
        var otu_ids = dataset_sample.otu_ids;
        var sample_values = dataset_sample.sample_values;

        var top_labels = otu_labels.slice(0,10);
        var top_ids = otu_ids.slice(0,10);
        var top_val = sample_values.slice(0,10).reverse();

        var otu_lab = top_ids.map(top_ids =>"OTU " + top_ids).reverse();

        // Bar Chart
        bardata=[{
            y: otu_lab,
            x: top_val,
            labels: otu_lab,
            type: "bar",
            orientation: 'h'
        }];
        Plotly.newPlot("bar", bardata);
    
        // Bubble Graph
        var trace1 = {
            x: otu_ids,
            y: sample_values,   
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
            }         
        };

        var bubbledata = [trace1];

        var layout = {
            showlegend: false,
            xaxis: {title: "OTU ID"}
        };
        
        Plotly.newPlot('bubble', bubbledata, layout);
    // }

    // function updateGauge(meta_data) {
        var wfnum = (meta_data.wfreq) ;

        // console.log(wfnum)
        // console.log(wfnum = 1 );
        if (wfnum == '1' ) {
            pathX = 0.15;
            pathY = 0.65;
            // console.log('1 ' + pathX + ' ' + pathY)
        }
        else if (wfnum == '1.5') {
            pathX = 0.25;
            pathY = 0.65;
            // console.log('2 ' + pathX + ' ' + pathY)
        }
        else if (wfnum == '2') {
            pathX = 0.25;
            pathY = 0.75;
            // console.log('2 ' + pathX + ' ' + pathY)
        }
        else if (wfnum == '3') {
            pathX = 0.35;
            pathY = 0.75;
            // console.log('3 ' + pathX + ' ' + pathY)
        }
        else if (wfnum == '3.5') {
            pathX = 0.4;
            pathY = 0.75;
            // console.log('3 ' + pathX + ' ' + pathY)
        }
        else if (wfnum == '4') {
            pathX = 0.45;
            pathY = 0.85;
            // console.log('4 ' + pathX + ' ' + pathY)
        }
        else if (wfnum == '4.5') {
            pathX = 0.5;
            pathY = 0.85;
            // console.log('4 ' + pathX + ' ' + pathY)
        }
        else if (wfnum == '5') {
            pathX = 0.55;
            pathY = 0.85;
            // console.log('5')            
        }
        else if (wfnum == '6') {
            pathX = 0.65;
            pathY = 0.85;
            // console.log('6')            
        }
        else if (wfnum == '7') {
            pathX = 0.9;
            pathY = 0.8;
            // console.log('7');
        }
        else if (wfnum == '8') {
            pathX = .95;
            pathY = 0.7;
            // console.log('OK');
        }
        else if (wfnum == '9') {
            pathX = .95;
            pathY = 0.7;
            // console.log('OK');
        }
        else {
            pathX = .001;
            pathY = .5;
            console.log("0")
        }

        var mainPath = 'M .48 .5 L ';
             space = ' ',
             pathEnd = ' L 0.52 .5 Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
        // var path = mainPath;
        console.log(path)
        gaugedata = [
        {
        //set the values and labels and marker colors
        "values": [9,1,1,1,1,1,1,1,1,1],
        "labels": [' ','0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        'marker':{
            'colors':[
                'rgba(255, 255, 255, 0.5)',
                'rgba(232, 226, 202, 0.5)',
                'rgba(216, 212, 174, 0.5)',
                'rgba(198, 198, 147, 0.5)',
                'rgba(177, 186, 121, 0.5)',
                'rgba(154, 173, 97, 0.5)',
                'rgba(129, 162, 74, 0.5)',
                'rgba(101, 150, 51, 0.5)',
                'rgba(68, 139, 29, 0.5)',
                'rgba(14, 127, 0, 0.5)'
            ]
        },
        "name": "Gauge",
        "hole": .4,
        "type": "pie",
        "direction": "clockwise",
        "rotation": 90,
        "showlegend": false,
        "textinfo": "label",
        "textposition": "inside",
        "hoverinfo": "label"
        }]
    
     var layout = {
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 600,
        width: 600,
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }]
     }
     Plotly.newPlot('gauge', gaugedata, layout);
    }
    init();

});