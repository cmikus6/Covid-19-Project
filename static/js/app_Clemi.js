function updateDash(){

    /// route names for different data sets
    var nyt_state="/nyt_covid_state_latest";
    var nyt_covid_county="/nyt_covid_county_latest";

    var time_nyt ="/timeseries_nyt";

    var honey_atlantic="/atlantic_covid_latest";
    var time_atlantic="/timeseries_atlantic";


//////////////////////   T o p  10  c o u n t i e s  i n   t h e   U  S  /////////////////////////
    d3.json(nyt_covid_county).then((data)=>{
        //console.log(data)
        /// State, county  cases, death
        // //console.log(latest_data_county)

        // Sorting dictionary cases
        function compare(a, b) {
            const caseA = a.cases;
            const caseB = b.cases;
            
            let comparison = 0;
            if (caseA > caseB) {
                comparison = 1;
            } else if (caseA < caseB) {
                comparison = -1;
            }
            return comparison * -1;
        }
            
        var sort_cases_desc=data.sort(compare)
        var top_10_counties_us=sort_cases_desc.slice(0,10)
        //console.log("Top to US")
        //console.log(top_10_counties_us)

        var table_county=top_10_counties_us.map(s=>s.County)
        var table_state=top_10_counties_us.map(s=>s.state)
        var table_cases=top_10_counties_us.map(s=>s.cases)
        var table_deaths=top_10_counties_us.map(s=>s.deaths)
        //console.log(table_state)

        ///// Building the table
        var values = [table_county,table_state,table_cases,table_deaths]

        var data = [{
            type: 'table',
            columnwidth: [100,100,100,100],
            
            header: {
              values: [["<b>County</b>"], ["<b>State</b>"],
                           ["<b>Total Cases</b>"], ["<b>Total Deaths</b>"]],
              align: "center",
              line: {width: 1, color: 'black'},
              fill: {color: "grey"},
              font: {family: "Arial", size: 18, color: "white"}
            },
            cells: {
              values: values,
              align: "center",
              line: {color: "black", width: 1},
              font: {family: "Arial", size: 16, color: ["black"]},
              height:50
            }
        }]

        var layout={
            width:500,
            height:650,
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t: 20,
                pad: 0
            }
        }
          
        Plotly.newPlot('top-ten-us-counties', data,layout);


    })

////////////////    Top 10 counties   ///////////////////////////

    d3.json(nyt_covid_county).then((data)=>{
        //console.log("-----N Y T  C O U N T Y  D A T A -----")
        //console.log("Cases by county")
        //console.log(data)

        selectedCovid=data.filter(c=>c.state=="Alaska")
        //console.log("Default Selection")
        //console.log(selectedCovid)

        var stateName=selectedCovid[0].state

        // Sorting dictionary
        function compare(a, b) {
            const deathpopA = a.death_pop_percent;
            const deathpopB = b.death_pop_percent;
        
            let comparison = 0;
            if (deathpopA > deathpopB) {
            comparison = 1;
            } else if (deathpopA < deathpopB) {
            comparison = -1;
            }
            return comparison * -1;
        }
        
        var sort_deathpop_desc=selectedCovid.sort(compare)
        //console.log("Sort by death_pop_percent") 
        //console.log(sort_deathpop_desc);

        var top_ten_counties_death_pop=sort_deathpop_desc.slice(0,10)
        //console.log(top_ten_counties)


        var bar_labels=top_ten_counties_death_pop.map(s=>s.County)
        var bar_values=top_ten_counties_death_pop.map(s=>s.death_pop_percent)

        //console.log(bar_labels);
        //console.log(bar_values);

        //  Create  trace.
        var data = [{
            type: 'bar',
            x: bar_values,
            y: bar_labels,
            orientation: 'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
            }]
        }];
        var layout = {
            title: `Top 10 Counties by COVID Deaths per <br> Population in ${stateName}<br> (New York Times) `,
            xaxis: {title:"Total Deaths per County Population (%)",size: 18},
            yaxis: {title:"counties",automargin: true,},
            autosize: false,
            width: 500,
            height: 500,
            margin: {
                l: 250,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            }
        };
        var config = {responsive: true}           
        Plotly.newPlot('top-death-counties', data,layout,config);


        ///////////////////// Cases per population  ////////////////////
    
        //console.log(selectedCovid)

        // Sorting dictionary
        function compare(a, b) {
            const deathcaseA = a.death_case_percent;
            const deathcaseB = b.death_case_percent;
        
            let comparison = 0;
            if (deathcaseA > deathcaseB) {
            comparison = 1;
            } else if (deathcaseA < deathcaseB) {
            comparison = -1;
            }
            return comparison * -1;
        }
        
        var sort_deathcase_desc=selectedCovid.sort(compare)
        //console.log("Sort by death_case_percent") 
        //console.log(sort_deathcase_desc);

        var top_ten_counties_death_case=sort_deathcase_desc.slice(0,10)
        //console.log(top_ten_counties)


        var bar_labels=top_ten_counties_death_case.map(s=>s.County)
        var bar_values=top_ten_counties_death_case.map(s=>s.death_case_percent)

        //console.log(bar_labels);
        //console.log(bar_values);

        //  Create  trace.
        var data = [{
            type: 'bar',
            x: bar_values,
            y: bar_labels,
            orientation: 'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
            }]
        }];
        var layout = {
            title: `Top 10 Counties by COVID Deaths per Cases <br> in ${stateName} <br> (New York Times) `,
            xaxis: {title:"Total deaths per recorded cases",size: 18},
            yaxis: {title:"counties",automargin: true,},
            autosize: false,
            width: 500,
            height: 500,
            margin: {
                l: 150,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            }
        };
        var config = {responsive: true}           
        Plotly.newPlot('top-cases-counties', data,layout,config);


    })

 //////////////////////////////////////////////////////////////////////////////////////////////
 //                 S E L E C T   S T A T E                ///
    d3.select('form').on('change',function(d){

        ///////// T i m e  S e r i e s  f o r  A t l a n t i c  D a t a ///////////////////////

        /////// Top 10 cases by county
        d3.json(nyt_covid_county).then((data)=>{
            //console.log("-----N Y T  C O U N T Y  D A T A -----")
            //covid_county_data=data
            //console.log("Cases by county")
            console.log(data)

            //console.log(latest_data)
            var userSelection=d3.select("#state-selector").node().value;
            //console.log(userSelection)
            selectedCovid=data.filter(c=>c.state==userSelection)
            console.log("User has made a selection")
            console.log(selectedCovid)


            // Sorting dictionary
            function compare(a, b) {
                const deathpopA = a.death_pop_percent;
                const deathpopB = b.death_pop_percent;
            
                let comparison = 0;
                if (deathpopA > deathpopB) {
                comparison = 1;
                } else if (deathpopA < deathpopB) {
                comparison = -1;
                }
                return comparison * -1;
            }
        
            var sort_deathpop_desc=selectedCovid.sort(compare)
            //console.log("Sort by death_pop_percent") 
            //console.log(sort_deathpop_desc);

            var top_ten_counties_death_pop=sort_deathpop_desc.slice(0,10)
            //console.log(top_ten_counties)


            var bar_labels=top_ten_counties_death_pop.map(s=>s.County)
            var bar_values=top_ten_counties_death_pop.map(s=>s.death_pop_percent)

            //console.log(bar_labels);
            //console.log(bar_values);

            //  Create  trace.
            var data = [{
                type: 'bar',
                x: bar_values,
                y: bar_labels,
                color:'#FB0D0D',
                orientation: 'h',
                transforms: [{
                    type: 'sort',
                    target: 'x',
                    order: 'ascending'
                }]
            }];
            var layout = {
                title: `Top 10 Counties by COVID Deaths per <br> Population in ${stateName}<br> (New York Times) `,
                xaxis: {title:"Total Deaths per County Population (%)",size: 18},
                yaxis: {title:"counties",automargin: true,},
                autosize: false,
                width: 500,
                height: 500,
                margin: {
                    l: 250,
                    r: 50,
                    b: 100,
                    t: 100,
                    pad: 4
                }
            };
            var config = {responsive: true}           
            Plotly.newPlot('top-five-counties', data,layout,config);



         ///////////////////// Deaths per cases ////////////////////
        
            console.log(selectedCovid)

            // Sorting dictionary
            function compare(a, b) {
                const deathcaseA = a.death_case_percent;
                const deathcaseB = b.death_case_percent;
            
                let comparison = 0;
                if (deathcaseA > deathcaseB) {
                comparison = 1;
                } else if (deathcaseA < deathcaseB) {
                comparison = -1;
                }
                return comparison * -1;
            }
            
            var sort_deathcase_desc=selectedCovid.sort(compare)
            //console.log("Sort by death_case_percent") 
            //console.log(sort_deathcase_desc);

            var top_ten_counties_death_case=sort_deathcase_desc.slice(0,10)
            //console.log(top_ten_counties)


            var bar_labels=top_ten_counties_death_case.map(s=>s.County)
            var bar_values=top_ten_counties_death_case.map(s=>s.death_case_percent)

            //console.log(bar_labels);
            //console.log(bar_values);

            //  Create  trace.
            var data = [{
                type: 'bar',
                x: bar_values,
                y: bar_labels,
                orientation: 'h',
                transforms: [{
                    type: 'sort',
                    target: 'x',
                    order: 'ascending'
                }]
            }];
            var layout = {
                title: `Top 10 Counties by COVID Deaths per Cases <br> in ${stateName} <br> (New York Times) `,
                xaxis: {title:"Total deaths per recorded cases",size: 18},
                yaxis: {title:"counties",automargin: true,},
                autosize: false,
                width: 500,
                height: 500,
                margin: {
                    l: 150,
                    r: 50,
                    b: 100,
                    t: 100,
                    pad: 4
                }
            };
            var config = {responsive: true}           
            Plotly.newPlot('county-info', data,layout,config);

                
         })


    })




}
updateDash()