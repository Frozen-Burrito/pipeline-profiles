const getData = (Url) => {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", Url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
};


//gets the unique regions to populate the dropdown
const getUnique = (items, filterColumns) => {
    if (Array.isArray(filterColumns)) {
        var lookup = [];
        var result = {};

        for (f in filterColumns) {
            lookup.push({})
            result[filterColumns[f]] = []
        }

        for (var item, i = 0; item = items[i++];) {
            for (f in filterColumns) {
                var name = item[filterColumns[f]];
                if (!(name in lookup[f])) {
                    lookup[f][name] = 1;
                    result[filterColumns[f]].push(name);
                }
            }
        }
        return result

    } else {
        var lookup = {};
        var result = [];
        for (var item, i = 0; item = items[i++];) {
            var name = item[filterColumns];
            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
            }
        }
        return result
    }
}

const applyId = (data) => {
    data =  data.map((v,i) => {
        v.id = v['Instrument Number']+'_'+v['Condition Number']
        return v
    })
    data = data.filter(row => row['Short Project Name'] !== 'SAM/COM')
    //data = data.filter(row => row.Company == 'NOVA Gas Transmission Ltd.')

    return data
}

const groupBy2 = (data) => {

    var companyResult = []
    var projectResult = []
    var themeResult = []
    const companies = getUnique(data,'Company')
    companies.map((c,ic) => {
        const company = data.filter(row => row.Company == c)
        companyResult.push(
            {
                name: c, 
                y: company.length,
                drilldown: c
            })

        const projects = getUnique(company,'Short Project Name')
        const projectData = []
        projects.map((p,ip) => {

            const project = company.filter(row => row['Short Project Name'] == p)

            projectData.push({
                name: p,
                y: project.length,
                drilldown:p
            })

            const themes = getUnique(company,'Theme(s)')
            const themeData = []
            themes.map((t,it) => {
                const theme = project.filter(row => row['Theme(s)'] == t)

                themeData.push({
                    name: t,
                    y: theme.length
                })
            })

            themeResult.push({
                name: p,
                id: p,
                data: themeData
            })

        })

        projectResult.push({
            name: c,
            id: c,
            data: projectData
        })

        
    })

    const sortResults = (result,level) => {
        if (level == 'Company') {
            result.sort(function (a, b) {
                return b.y - a.y;
            });
        } else if (level == 'Project' || level == 'Theme') {
            result.map((v,i)=> {
                v.data.sort(function (a, b) {
                    return b.y - a.y;
                });
            })
        }
        return result
    }

    companyResult = sortResults(companyResult,'Company')
    projectResult = sortResults(projectResult,'Project')
    themeResult = sortResults(themeResult,'Theme')
    return [companyResult,projectResult,themeResult]

}


const url = 'https://raw.githubusercontent.com/mbradds/HighchartsData/master/conditions.json'
// var liveData = getData('http://www.cer-rec.gc.ca/open/conditions/conditions.csv')
// console.log(liveData)
var githubData = JSON.parse(JSON.stringify(JSON.parse(getData(url))));
idData = applyId(githubData)

//data = groupBy(idData,column='Short Project Name')
//console.log(data)
var companyResult,projectResult;
[companyResult,projectResult,themeResult] = groupBy2(idData)

const chart = new Highcharts.chart('container', {

    chart: {
        height: 800,
        width: 1000,
        type: 'bar', 
        zoomType: 'x', //allows the user to focus in on the x or y (x,y,xy)
        borderColor: 'black',
        borderWidth: 1,
        animation: true,
        events: {
            load: function () {
                this.credits.element.onclick = function () {
                    window.open(
                        'https://www.cer-rec.gc.ca/index-eng.html',
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }
            },
            drilldown: function(e) {
                console.log(e.seriesOptions) //use this to calculate the summary measures that will populate the html
            }
        }
    },

    title: {
        text: null
    },

    plotOptions: {
        series: {
            cropThreshold: 800, //solution to axis getting messed up on drillup: https://www.highcharts.com/forum/viewtopic.php?t=40702
            pointWidth: 20,
            events: {
                legendItemClick: function () {
                    return false; 
                }
            }
        }
    },

    credits: {
        //enabled:false //gets rid of the "Highcharts logo in the bottom right"
        text: 'Canada Energy Regulator',
        href: 'https://www.cer-rec.gc.ca/index-eng.html'
    },

    xAxis: {
        type: 'category',
        title: {
            text: null
        },
        // min: 0,
        // max: 5,
    },

    yAxis: {
        showEmpty: false,
        title: {
            text: 'Number of Conditions'
        }
    },

    series: [{
            name: 'Conditions by Company',
            colorByPoint: false,
            data: companyResult
        }],

    drilldown: {
        series: projectResult.concat(themeResult)
    }

})
