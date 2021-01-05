!function(){var t={9785:function(t,e,r){"use strict";r(2222),r(8309),r(4916),r(3123),r(3210),Object.defineProperty(e,"__esModule",{value:!0}),e.instructionsChart=e.errorChart=void 0;var n=r(9712),o=function(t){return console.log("Error loading chart to div: "+t),new Highcharts.chart(t,{chart:{zoomType:"x",borderWidth:1},title:{text:""},credits:{text:""},series:null,lang:{noData:"Error loading chart. Please try again later."}})};e.errorChart=o,e.instructionsChart=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"container-instructions";try{return new Highcharts.chart(t,{chart:{borderWidth:1,zoomType:"x"},title:{text:""},credits:{text:""},yAxis:{gridLineWidth:0,minorGridLineWidth:0,title:{text:""}},tooltip:{useHTML:!0,formatter:function(){var t=this.series.name.split("(")[0].trim();return"<b>".concat(this.x,"</b><br>")+'<tr><td> <span style="color: '.concat(this.series.color,'">&#9679</span> ').concat(t,': </td><td style="padding:0"><b>').concat(this.point.y,"</b></td></tr>")}},xAxis:{},legend:{},plotOptions:{series:{pointStart:2013}},annotations:[{labels:[{point:{x:290,y:16},style:{fontWeight:"bold",color:Highcharts.theme&&Highcharts.theme.textColor||"grey"},shape:"rect",backgroundColor:"white",borderColor:n.cerPalette["Dim Grey"],text:"Click on this icon to download chart images/data:"}],draggable:""}],series:[{name:"Data 1 (click to filter)",color:n.cerPalette["Night Sky"],data:[7,8,5,6,4,4,5,4]},{name:"Data 2 (click to filter)",color:n.cerPalette.Sun,data:[1,2,4,3,3,5,6,5]}]})}catch(e){o(t)}}},6949:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.frenchTheme=e.generalTheme=void 0;var n=r(9712);e.generalTheme=function(){Highcharts.transportation={chart:{borderColor:"black",animation:!0},plotOptions:{column:{stacking:"normal"},area:{stacking:"normal",marker:!1,dataLabels:{enabled:!1}}},tooltip:{useHTML:!0,headerFormat:'<span style="font-size:10px;font-weight:bold">{point.key}</span><table>',footerFormat:"</table>"},xAxis:{title:{style:{fontSize:12,color:n.cerPalette["Cool Grey"],fontWeight:"bold",fontFamily:"Arial"}},labels:{style:{fontSize:12,color:n.cerPalette["Cool Grey"]}},plotBands:{color:n.cerPalette.Forecast,label:{align:"center",style:{fontWeight:"bold",color:n.cerPalette["Cool Grey"]}}}},yAxis:{title:{style:{fontSize:12,color:n.cerPalette["Cool Grey"],fontWeight:"bold",fontFamily:"Arial"}},labels:{formatter:function(){return Highcharts.numberFormat(this.value,0,".",",")},style:{fontSize:12,color:n.cerPalette["Cool Grey"]}},stackLabels:{style:{fontWeight:"bold",color:Highcharts.theme&&Highcharts.theme.textColor||"grey"}}},noData:{style:{fontWeight:"bold",fontSize:"15px",color:"#303030"}},title:{text:""},legend:{itemStyle:{font:"12pt Arial",color:"black"}}},Highcharts.setOptions(Highcharts.transportation)},e.frenchTheme=function(){Highcharts.french={lang:{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],weekdays:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],decimalPoint:",",downloadCSV:"Download CSV (FRA)",downloadJPEG:"Download JPEG image (FRA)",downloadPDF:"Download PDF document (FRA)",downloadPNG:"Download PNG image (FRA)",downloadSVG:"Download SVG vector image (FRA)",downloadXLS:"Download XLS (FRA)",printChart:"Print chart (FRA)",resetZoom:"Reset zoom (FRA)",viewData:"View data table (FRA)"}},Highcharts.setOptions(Highcharts.french)}},9712:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r(2222),r(7327),r(1249),r(8309),r(9720),Object.defineProperty(e,"__esModule",{value:!0}),e.tooltipSymbol=e.tooltipPoint=e.creditsClick=e.filterData=e.getUnique=e.checkIfValid=e.currentDate=e.dateFormat=e.cerPalette=void 0,e.cerPalette={"Night Sky":"#054169",Sun:"#FFBE4B",Ocean:"#5FBEE6",Forest:"#559B37",Flame:"#FF821E",Aubergine:"#871455","Dim Grey":"#8c8c96","Cool Grey":"#42464B",hcBlue:"#7cb5ec",hcGreen:"#90ed7d",hcPink:"#f15c80",hcRed:"#f45b5b",hcAqua:"#2b908f",hcPurple:"#8085e9",hcLightBlue:"#91e8e1"},e.dateFormat=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"%b %d, %Y";return Highcharts.dateFormat(e,t)},e.currentDate=function(){var t=new Date;return t.setUTCHours(0),t.setUTCMinutes(0),t.setUTCSeconds(0),t.setUTCMilliseconds(0),t.getTime()},e.checkIfValid=function(t){for(var e=!1,r=0;r<t.length;r++)if(null!=t[r].y&&0!=t[r].y){e=!0;break}return e},e.getUnique=function(t,e){for(var r,n={},o=[],a=0;r=t[a++];){var i=r[e];i in n||(n[i]=1,o.push(i))}return o},e.filterData=function(t,e){if(!1!==e)for(var r=function(){var e,r,i=(e=a[o],r=2,function(t){if(Array.isArray(t))return t}(e)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}}(e,r)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=i[0],u=i[1];Array.isArray(u)?u.map((function(e){t=t.filter((function(t){return t[c]==e}))})):t=t.filter((function(t){return t[c]==u}))},o=0,a=Object.entries(e);o<a.length;o++)r();return t},e.creditsClick=function(t,e){t.credits.element.onclick=function(){window.open(e,"_blank")}};var o=function(t){return{circle:"&#9679",diamond:"&#9670",square:"&#9632",triangle:"&#9650","triangle-down":"&#9660"}[t]};e.tooltipPoint=function(t){return'<tr><td> <span style="color: {series.color}">&#9679</span> {series.name}: </td><td style="padding:0"><b>{point.y} '.concat(t,"</b></td></tr>")},e.tooltipSymbol=function(t,e){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(r)return'<tr><td> <span style="color: '.concat(t.series.color,'">').concat(o(t.point.graphic.symbolName),"</span> ").concat(t.series.name,': </td><td style="padding:0"><b>').concat(t.point.y," ").concat(e,"</b></td></tr>")}},1925:function(t,e,r){"use strict";r(2222),r(7327),r(1249),r(8309),Object.defineProperty(e,"__esModule",{value:!0}),e.cassandraSettlements=void 0;var n,o=r(9712),a=r(9785),i=(n=r(5038))&&n.__esModule?n:{default:n};function c(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||l(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}}(t,e)||l(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){if(t){if("string"==typeof t)return s(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(t,e):void 0}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}e.cassandraSettlements=function(){var t={company:{name:"Active settlement(s)",color:o.cerPalette["Night Sky"]}},e={"Active settlement(s)":o.cerPalette["Night Sky"],"Settlements with fixed end date":o.cerPalette.Ocean,"Settlements without fixed end date":o.cerPalette["Cool Grey"]},r=(0,o.currentDate)();function n(t){return function(e,r){return e[t]>r[t]?1:e[t]<r[t]?-1:0}}var l,s,f;try{s=(l=u(function(t){var e={},a=[],i=[];t=(t=function(t){return t.map((function(t){var e,n=u(null===(e=t["End Date"])?[r,o.cerPalette["Cool Grey"]]:[e,o.cerPalette.Ocean],2),a=n[0],i=n[1];return t.color=i,t.end=a,t}))}(t)).sort(n("start"));var c=function(t){return{name:t["Settlement Name"],id:t["Settlement Name"],parent:t.Company,color:t.color,start:t["Start Date"],end:t.end,onClickLink:t.regdocs,tollOrder:t["Toll Order"]}};t.map((function(t){i.push(t["Start Date"]),i.push(t["End Date"]),e.hasOwnProperty(t.Company)?(e[t.Company].startDate.push(t["Start Date"]),e[t.Company].endDate.push(t.end),a.push(c(t))):(e[t.Company]={startDate:[t["Start Date"]],endDate:[t.end]},a.push(c(t)))}));var l=[],s=function(t,e){return t.hasOwnProperty(e)?t[e]++:t[e]=1,t},f=function(t,e){return t.hasOwnProperty(e)?e+"_"+t[e]:e},d={},p=function(t){m=e[t].startDate,g=e[t].endDate,y=m[0],v=g[0],g.map((function(e,r){e>v&&(v=e),m[r+1]-e>864e5?(l.push({name:t,collapsed:!1,color:o.cerPalette["Night Sky"],id:f(d,t),start:y,end:v}),d=s(d,t),y=m[r+1]):r==g.length-1&&(l.push({name:t,collapsed:!1,color:o.cerPalette["Night Sky"],id:f(d,t),start:y,end:v}),d=s(d,t))}))};for(var h in e){var m,g,y,v;p(h)}return i=i.filter((function(t){return null!==t})),l.sort(n("start")),[[].concat(a,l),i]}(i.default),2))[0],f=l[1],Highcharts.ganttChart("container_settlements",{chart:{type:"gantt",borderWidth:1,plotBackgroundColor:null,plotShadow:!1},credits:{text:""},title:{text:""},plotOptions:{series:{states:{hover:{enabled:!1}},events:{legendItemClick:function(t){t.preventDefault()}}}},legend:{enabled:!0,symbolPadding:0,symbolWidth:0,symbolHeight:0,squareSymbol:!1,useHTML:!0,labelFormatter:function(){var t="";for(var r in e)t+='<span style="font-weight:bold; color: '.concat(e[r],'">&#9679 ').concat(r," &nbsp &nbsp &nbsp </span>");return t}},xAxis:[{min:Math.min.apply(Math,c(f)),max:Math.max.apply(Math,c(f)),currentDateIndicator:{width:2,zIndex:2,dashStyle:"longDash",color:"black",label:{formatter:function(){return Highcharts.dateFormat(o.dateFormat,this.options.value)+" (today, UTC)"}}}}],yAxis:{uniqueNames:!0,labels:{useHTML:!0,formatter:function(){var t=this.value,e=this.axis.series[0].data,r=t;return e.map((function(e){e.name==t&&e.hasOwnProperty("onClickLink")&&(r='<a href="'.concat(e.onClickLink,'" target="_blank">').concat(t,"</a>"))})),r}}},annotations:[{labelOptions:{verticalAlign:"center",align:"center",overflow:"none"},labels:[{point:{x:-150,y:-30},style:{fontWeight:"bold",fontSize:12,color:Highcharts.theme&&Highcharts.theme.textColor||"grey"},backgroundColor:"white",borderColor:"white",text:"Click on a settlement name to open<br>original settlement approval (REGDOCS)"}],draggable:""}],tooltip:{xDateFormat:o.dateFormat,backgroundColor:"rgba(255,255,255,1)",className:"tooltip-settlements",useHTML:!0,formatter:function(){var t=this.point,e=31536e6,r=(t.x2-t.x)/e;if(e=Math.round(100*r)/100,null!==t.tollOrder)var n='<tr><td>Toll Order:</td><td style="padding:0"><b> '.concat(t.tollOrder,"</b>");else n='<tr><td>Toll Order:</td><td style="padding:0"><b></b>';if(this.color==o.cerPalette["Cool Grey"])var a="No set end date";else a=Highcharts.dateFormat(o.dateFormat,this.point.end);return null==this.point.parent?"<b>".concat(this.key,'</b><table> <tr><td> Active settlement(s) start:</td><td style="padding:0"><b> ').concat(Highcharts.dateFormat(o.dateFormat,this.point.start),"</b></td></tr>")+'<tr><td> Active settlement(s) end:</td><td style="padding:0"><b> '.concat(Highcharts.dateFormat(o.dateFormat,this.point.end),"</b></td></tr>")+'<tr><td> Active settlement(s) duration:</td><td style="padding:0"><b> '.concat(e," years</b></table>"):"<b>".concat(this.key,"</b><table>")+n+'<tr><td>Start:</td><td style="padding:0"><b> '.concat(Highcharts.dateFormat(o.dateFormat,this.point.start),"</b>")+'<tr><td>End:</td><td style="padding:0"><b> '.concat(a,"</b>")+'<tr><td>Duration:</td><td style="padding:0"><b> '.concat(e," years</b>")}},series:[{name:t.company.name,data:s,color:t.company.color}]})}catch(t){console.log(t),(0,a.errorChart)("container_settlements")}}},3099:function(t){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},1530:function(t,e,r){"use strict";var n=r(8710).charAt;t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},9670:function(t,e,r){var n=r(111);t.exports=function(t){if(!n(t))throw TypeError(String(t)+" is not an object");return t}},1318:function(t,e,r){var n=r(5656),o=r(7466),a=r(1400),i=function(t){return function(e,r,i){var c,u=n(e),l=o(u.length),s=a(i,l);if(t&&r!=r){for(;l>s;)if((c=u[s++])!=c)return!0}else for(;l>s;s++)if((t||s in u)&&u[s]===r)return t||s||0;return!t&&-1}};t.exports={includes:i(!0),indexOf:i(!1)}},2092:function(t,e,r){var n=r(9974),o=r(8361),a=r(7908),i=r(7466),c=r(5417),u=[].push,l=function(t){var e=1==t,r=2==t,l=3==t,s=4==t,f=6==t,d=7==t,p=5==t||f;return function(h,m,g,y){for(var v,b,x=a(h),S=o(x),w=n(m,g,3),O=i(S.length),C=0,E=y||c,A=e?E(h,O):r||d?E(h,0):void 0;O>C;C++)if((p||C in S)&&(b=w(v=S[C],C,x),t))if(e)A[C]=b;else if(b)switch(t){case 3:return!0;case 5:return v;case 6:return C;case 2:u.call(A,v)}else switch(t){case 4:return!1;case 7:u.call(A,v)}return f?-1:l||s?s:A}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},1194:function(t,e,r){var n=r(7293),o=r(5112),a=r(7392),i=o("species");t.exports=function(t){return a>=51||!n((function(){var e=[];return(e.constructor={})[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},9207:function(t,e,r){var n=r(9781),o=r(7293),a=r(6656),i=Object.defineProperty,c={},u=function(t){throw t};t.exports=function(t,e){if(a(c,t))return c[t];e||(e={});var r=[][t],l=!!a(e,"ACCESSORS")&&e.ACCESSORS,s=a(e,0)?e[0]:u,f=a(e,1)?e[1]:void 0;return c[t]=!!r&&!o((function(){if(l&&!n)return!0;var t={length:-1};l?i(t,1,{enumerable:!0,get:u}):t[1]=1,r.call(t,s,f)}))}},5417:function(t,e,r){var n=r(111),o=r(3157),a=r(5112)("species");t.exports=function(t,e){var r;return o(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!o(r.prototype)?n(r)&&null===(r=r[a])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},4326:function(t){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},9920:function(t,e,r){var n=r(6656),o=r(3887),a=r(1236),i=r(3070);t.exports=function(t,e){for(var r=o(e),c=i.f,u=a.f,l=0;l<r.length;l++){var s=r[l];n(t,s)||c(t,s,u(e,s))}}},8880:function(t,e,r){var n=r(9781),o=r(3070),a=r(9114);t.exports=n?function(t,e,r){return o.f(t,e,a(1,r))}:function(t,e,r){return t[e]=r,t}},9114:function(t){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},6135:function(t,e,r){"use strict";var n=r(7593),o=r(3070),a=r(9114);t.exports=function(t,e,r){var i=n(e);i in t?o.f(t,i,a(0,r)):t[i]=r}},9781:function(t,e,r){var n=r(7293);t.exports=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},317:function(t,e,r){var n=r(7854),o=r(111),a=n.document,i=o(a)&&o(a.createElement);t.exports=function(t){return i?a.createElement(t):{}}},8113:function(t,e,r){var n=r(5005);t.exports=n("navigator","userAgent")||""},7392:function(t,e,r){var n,o,a=r(7854),i=r(8113),c=a.process,u=c&&c.versions,l=u&&u.v8;l?o=(n=l.split("."))[0]+n[1]:i&&(!(n=i.match(/Edge\/(\d+)/))||n[1]>=74)&&(n=i.match(/Chrome\/(\d+)/))&&(o=n[1]),t.exports=o&&+o},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(t,e,r){var n=r(7854),o=r(1236).f,a=r(8880),i=r(1320),c=r(3505),u=r(9920),l=r(4705);t.exports=function(t,e){var r,s,f,d,p,h=t.target,m=t.global,g=t.stat;if(r=m?n:g?n[h]||c(h,{}):(n[h]||{}).prototype)for(s in e){if(d=e[s],f=t.noTargetGet?(p=o(r,s))&&p.value:r[s],!l(m?s:h+(g?".":"#")+s,t.forced)&&void 0!==f){if(typeof d==typeof f)continue;u(d,f)}(t.sham||f&&f.sham)&&a(d,"sham",!0),i(r,s,d,t)}}},7293:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},7007:function(t,e,r){"use strict";r(4916);var n=r(1320),o=r(7293),a=r(5112),i=r(2261),c=r(8880),u=a("species"),l=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),s="$0"==="a".replace(/./,"$0"),f=a("replace"),d=!!/./[f]&&""===/./[f]("a","$0"),p=!o((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));t.exports=function(t,e,r,f){var h=a(t),m=!o((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),g=m&&!o((function(){var e=!1,r=/a/;return"split"===t&&((r={}).constructor={},r.constructor[u]=function(){return r},r.flags="",r[h]=/./[h]),r.exec=function(){return e=!0,null},r[h](""),!e}));if(!m||!g||"replace"===t&&(!l||!s||d)||"split"===t&&!p){var y=/./[h],v=r(h,""[t],(function(t,e,r,n,o){return e.exec===i?m&&!o?{done:!0,value:y.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:s,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),b=v[0],x=v[1];n(String.prototype,t,b),n(RegExp.prototype,h,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}f&&c(RegExp.prototype[h],"sham",!0)}},9974:function(t,e,r){var n=r(3099);t.exports=function(t,e,r){if(n(t),void 0===e)return t;switch(r){case 0:return function(){return t.call(e)};case 1:return function(r){return t.call(e,r)};case 2:return function(r,n){return t.call(e,r,n)};case 3:return function(r,n,o){return t.call(e,r,n,o)}}return function(){return t.apply(e,arguments)}}},5005:function(t,e,r){var n=r(857),o=r(7854),a=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?a(n[t])||a(o[t]):n[t]&&n[t][e]||o[t]&&o[t][e]}},7854:function(t,e,r){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof r.g&&r.g)||function(){return this}()||Function("return this")()},6656:function(t){var e={}.hasOwnProperty;t.exports=function(t,r){return e.call(t,r)}},3501:function(t){t.exports={}},4664:function(t,e,r){var n=r(9781),o=r(7293),a=r(317);t.exports=!n&&!o((function(){return 7!=Object.defineProperty(a("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,e,r){var n=r(7293),o=r(4326),a="".split;t.exports=n((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?a.call(t,""):Object(t)}:Object},2788:function(t,e,r){var n=r(5465),o=Function.toString;"function"!=typeof n.inspectSource&&(n.inspectSource=function(t){return o.call(t)}),t.exports=n.inspectSource},9909:function(t,e,r){var n,o,a,i=r(8536),c=r(7854),u=r(111),l=r(8880),s=r(6656),f=r(5465),d=r(6200),p=r(3501),h=c.WeakMap;if(i){var m=f.state||(f.state=new h),g=m.get,y=m.has,v=m.set;n=function(t,e){return e.facade=t,v.call(m,t,e),e},o=function(t){return g.call(m,t)||{}},a=function(t){return y.call(m,t)}}else{var b=d("state");p[b]=!0,n=function(t,e){return e.facade=t,l(t,b,e),e},o=function(t){return s(t,b)?t[b]:{}},a=function(t){return s(t,b)}}t.exports={set:n,get:o,has:a,enforce:function(t){return a(t)?o(t):n(t,{})},getterFor:function(t){return function(e){var r;if(!u(e)||(r=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}}},3157:function(t,e,r){var n=r(4326);t.exports=Array.isArray||function(t){return"Array"==n(t)}},4705:function(t,e,r){var n=r(7293),o=/#|\.prototype\./,a=function(t,e){var r=c[i(t)];return r==l||r!=u&&("function"==typeof e?n(e):!!e)},i=a.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=a.data={},u=a.NATIVE="N",l=a.POLYFILL="P";t.exports=a},111:function(t){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},1913:function(t){t.exports=!1},7850:function(t,e,r){var n=r(111),o=r(4326),a=r(5112)("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==o(t))}},133:function(t,e,r){var n=r(7293);t.exports=!!Object.getOwnPropertySymbols&&!n((function(){return!String(Symbol())}))},8536:function(t,e,r){var n=r(7854),o=r(2788),a=n.WeakMap;t.exports="function"==typeof a&&/native code/.test(o(a))},3070:function(t,e,r){var n=r(9781),o=r(4664),a=r(9670),i=r(7593),c=Object.defineProperty;e.f=n?c:function(t,e,r){if(a(t),e=i(e,!0),a(r),o)try{return c(t,e,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[e]=r.value),t}},1236:function(t,e,r){var n=r(9781),o=r(5296),a=r(9114),i=r(5656),c=r(7593),u=r(6656),l=r(4664),s=Object.getOwnPropertyDescriptor;e.f=n?s:function(t,e){if(t=i(t),e=c(e,!0),l)try{return s(t,e)}catch(t){}if(u(t,e))return a(!o.f.call(t,e),t[e])}},8006:function(t,e,r){var n=r(6324),o=r(748).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,o)}},5181:function(t,e){e.f=Object.getOwnPropertySymbols},6324:function(t,e,r){var n=r(6656),o=r(5656),a=r(1318).indexOf,i=r(3501);t.exports=function(t,e){var r,c=o(t),u=0,l=[];for(r in c)!n(i,r)&&n(c,r)&&l.push(r);for(;e.length>u;)n(c,r=e[u++])&&(~a(l,r)||l.push(r));return l}},1956:function(t,e,r){var n=r(6324),o=r(748);t.exports=Object.keys||function(t){return n(t,o)}},5296:function(t,e){"use strict";var r={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,o=n&&!r.call({1:2},1);e.f=o?function(t){var e=n(this,t);return!!e&&e.enumerable}:r},4699:function(t,e,r){var n=r(9781),o=r(1956),a=r(5656),i=r(5296).f,c=function(t){return function(e){for(var r,c=a(e),u=o(c),l=u.length,s=0,f=[];l>s;)r=u[s++],n&&!i.call(c,r)||f.push(t?[r,c[r]]:c[r]);return f}};t.exports={entries:c(!0),values:c(!1)}},3887:function(t,e,r){var n=r(5005),o=r(8006),a=r(5181),i=r(9670);t.exports=n("Reflect","ownKeys")||function(t){var e=o.f(i(t)),r=a.f;return r?e.concat(r(t)):e}},857:function(t,e,r){var n=r(7854);t.exports=n},1320:function(t,e,r){var n=r(7854),o=r(8880),a=r(6656),i=r(3505),c=r(2788),u=r(9909),l=u.get,s=u.enforce,f=String(String).split("String");(t.exports=function(t,e,r,c){var u,l=!!c&&!!c.unsafe,d=!!c&&!!c.enumerable,p=!!c&&!!c.noTargetGet;"function"==typeof r&&("string"!=typeof e||a(r,"name")||o(r,"name",e),(u=s(r)).source||(u.source=f.join("string"==typeof e?e:""))),t!==n?(l?!p&&t[e]&&(d=!0):delete t[e],d?t[e]=r:o(t,e,r)):d?t[e]=r:i(e,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&l(this).source||c(this)}))},7651:function(t,e,r){var n=r(4326),o=r(2261);t.exports=function(t,e){var r=t.exec;if("function"==typeof r){var a=r.call(t,e);if("object"!=typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},2261:function(t,e,r){"use strict";var n,o,a=r(7066),i=r(2999),c=RegExp.prototype.exec,u=String.prototype.replace,l=c,s=(n=/a/,o=/b*/g,c.call(n,"a"),c.call(o,"a"),0!==n.lastIndex||0!==o.lastIndex),f=i.UNSUPPORTED_Y||i.BROKEN_CARET,d=void 0!==/()??/.exec("")[1];(s||d||f)&&(l=function(t){var e,r,n,o,i=this,l=f&&i.sticky,p=a.call(i),h=i.source,m=0,g=t;return l&&(-1===(p=p.replace("y","")).indexOf("g")&&(p+="g"),g=String(t).slice(i.lastIndex),i.lastIndex>0&&(!i.multiline||i.multiline&&"\n"!==t[i.lastIndex-1])&&(h="(?: "+h+")",g=" "+g,m++),r=new RegExp("^(?:"+h+")",p)),d&&(r=new RegExp("^"+h+"$(?!\\s)",p)),s&&(e=i.lastIndex),n=c.call(l?r:i,g),l?n?(n.input=n.input.slice(m),n[0]=n[0].slice(m),n.index=i.lastIndex,i.lastIndex+=n[0].length):i.lastIndex=0:s&&n&&(i.lastIndex=i.global?n.index+n[0].length:e),d&&n&&n.length>1&&u.call(n[0],r,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(n[o]=void 0)})),n}),t.exports=l},7066:function(t,e,r){"use strict";var n=r(9670);t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},2999:function(t,e,r){"use strict";var n=r(7293);function o(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=o("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=o("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},4488:function(t){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},3505:function(t,e,r){var n=r(7854),o=r(8880);t.exports=function(t,e){try{o(n,t,e)}catch(r){n[t]=e}return e}},6200:function(t,e,r){var n=r(2309),o=r(9711),a=n("keys");t.exports=function(t){return a[t]||(a[t]=o(t))}},5465:function(t,e,r){var n=r(7854),o=r(3505),a="__core-js_shared__",i=n[a]||o(a,{});t.exports=i},2309:function(t,e,r){var n=r(1913),o=r(5465);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.8.1",mode:n?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},6707:function(t,e,r){var n=r(9670),o=r(3099),a=r(5112)("species");t.exports=function(t,e){var r,i=n(t).constructor;return void 0===i||null==(r=n(i)[a])?e:o(r)}},8710:function(t,e,r){var n=r(9958),o=r(4488),a=function(t){return function(e,r){var a,i,c=String(o(e)),u=n(r),l=c.length;return u<0||u>=l?t?"":void 0:(a=c.charCodeAt(u))<55296||a>56319||u+1===l||(i=c.charCodeAt(u+1))<56320||i>57343?t?c.charAt(u):a:t?c.slice(u,u+2):i-56320+(a-55296<<10)+65536}};t.exports={codeAt:a(!1),charAt:a(!0)}},6091:function(t,e,r){var n=r(7293),o=r(1361);t.exports=function(t){return n((function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t}))}},3111:function(t,e,r){var n=r(4488),o="["+r(1361)+"]",a=RegExp("^"+o+o+"*"),i=RegExp(o+o+"*$"),c=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(a,"")),2&t&&(r=r.replace(i,"")),r}};t.exports={start:c(1),end:c(2),trim:c(3)}},1400:function(t,e,r){var n=r(9958),o=Math.max,a=Math.min;t.exports=function(t,e){var r=n(t);return r<0?o(r+e,0):a(r,e)}},5656:function(t,e,r){var n=r(8361),o=r(4488);t.exports=function(t){return n(o(t))}},9958:function(t){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},7466:function(t,e,r){var n=r(9958),o=Math.min;t.exports=function(t){return t>0?o(n(t),9007199254740991):0}},7908:function(t,e,r){var n=r(4488);t.exports=function(t){return Object(n(t))}},7593:function(t,e,r){var n=r(111);t.exports=function(t,e){if(!n(t))return t;var r,o;if(e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!n(o=r.call(t)))return o;if(!e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},9711:function(t){var e=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++e+r).toString(36)}},3307:function(t,e,r){var n=r(133);t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},5112:function(t,e,r){var n=r(7854),o=r(2309),a=r(6656),i=r(9711),c=r(133),u=r(3307),l=o("wks"),s=n.Symbol,f=u?s:s&&s.withoutSetter||i;t.exports=function(t){return a(l,t)||(c&&a(s,t)?l[t]=s[t]:l[t]=f("Symbol."+t)),l[t]}},1361:function(t){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},2222:function(t,e,r){"use strict";var n=r(2109),o=r(7293),a=r(3157),i=r(111),c=r(7908),u=r(7466),l=r(6135),s=r(5417),f=r(1194),d=r(5112),p=r(7392),h=d("isConcatSpreadable"),m=9007199254740991,g="Maximum allowed index exceeded",y=p>=51||!o((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),v=f("concat"),b=function(t){if(!i(t))return!1;var e=t[h];return void 0!==e?!!e:a(t)};n({target:"Array",proto:!0,forced:!y||!v},{concat:function(t){var e,r,n,o,a,i=c(this),f=s(i,0),d=0;for(e=-1,n=arguments.length;e<n;e++)if(b(a=-1===e?i:arguments[e])){if(d+(o=u(a.length))>m)throw TypeError(g);for(r=0;r<o;r++,d++)r in a&&l(f,d,a[r])}else{if(d>=m)throw TypeError(g);l(f,d++,a)}return f.length=d,f}})},7327:function(t,e,r){"use strict";var n=r(2109),o=r(2092).filter,a=r(1194),i=r(9207),c=a("filter"),u=i("filter");n({target:"Array",proto:!0,forced:!c||!u},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},1249:function(t,e,r){"use strict";var n=r(2109),o=r(2092).map,a=r(1194),i=r(9207),c=a("map"),u=i("map");n({target:"Array",proto:!0,forced:!c||!u},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},8309:function(t,e,r){var n=r(9781),o=r(3070).f,a=Function.prototype,i=a.toString,c=/^\s*function ([^ (]*)/,u="name";n&&!(u in a)&&o(a,u,{configurable:!0,get:function(){try{return i.call(this).match(c)[1]}catch(t){return""}}})},9720:function(t,e,r){var n=r(2109),o=r(4699).entries;n({target:"Object",stat:!0},{entries:function(t){return o(t)}})},4916:function(t,e,r){"use strict";var n=r(2109),o=r(2261);n({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},3123:function(t,e,r){"use strict";var n=r(7007),o=r(7850),a=r(9670),i=r(4488),c=r(6707),u=r(1530),l=r(7466),s=r(7651),f=r(2261),d=r(7293),p=[].push,h=Math.min,m=4294967295,g=!d((function(){return!RegExp(m,"y")}));n("split",2,(function(t,e,r){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,r){var n=String(i(this)),a=void 0===r?m:r>>>0;if(0===a)return[];if(void 0===t)return[n];if(!o(t))return e.call(n,t,a);for(var c,u,l,s=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,g=new RegExp(t.source,d+"g");(c=f.call(g,n))&&!((u=g.lastIndex)>h&&(s.push(n.slice(h,c.index)),c.length>1&&c.index<n.length&&p.apply(s,c.slice(1)),l=c[0].length,h=u,s.length>=a));)g.lastIndex===c.index&&g.lastIndex++;return h===n.length?!l&&g.test("")||s.push(""):s.push(n.slice(h)),s.length>a?s.slice(0,a):s}:"0".split(void 0,0).length?function(t,r){return void 0===t&&0===r?[]:e.call(this,t,r)}:e,[function(e,r){var o=i(this),a=null==e?void 0:e[t];return void 0!==a?a.call(e,o,r):n.call(String(o),e,r)},function(t,o){var i=r(n,t,this,o,n!==e);if(i.done)return i.value;var f=a(t),d=String(this),p=c(f,RegExp),y=f.unicode,v=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(g?"y":"g"),b=new p(g?f:"^(?:"+f.source+")",v),x=void 0===o?m:o>>>0;if(0===x)return[];if(0===d.length)return null===s(b,d)?[d]:[];for(var S=0,w=0,O=[];w<d.length;){b.lastIndex=g?w:0;var C,E=s(b,g?d:d.slice(w));if(null===E||(C=h(l(b.lastIndex+(g?0:w)),d.length))===S)w=u(d,w,y);else{if(O.push(d.slice(S,w)),O.length===x)return O;for(var A=1;A<=E.length-1;A++)if(O.push(E[A]),O.length===x)return O;w=S=C}}return O.push(d.slice(S)),O}]}),!g)},3210:function(t,e,r){"use strict";var n=r(2109),o=r(3111).trim;n({target:"String",proto:!0,forced:r(6091)("trim")},{trim:function(){return o(this)}})},5038:function(t){"use strict";t.exports=JSON.parse('[{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"2009 Final Tolls (pursuant to AUC approved 2008-2009 Revenue Requirement Settlement)","Toll Order":"TG-05-2009","Start Date":1240963200000,"End Date":1262217600000,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/Item/View/587070"},{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"2010-2012 Revenue Requirement Settlement","Toll Order":"TG-05-2010","Start Date":1262304000000,"End Date":1356912000000,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/Item/View/636473"},{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"2013-2014 Revenue Requirement Settlement","Toll Order":"TG-009-2013","Start Date":1356998400000,"End Date":1419984000000,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/Item/View/1058510"},{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"2015 Revenue Requirement Settlement","Toll Order":"TG-001-2015","Start Date":1420070400000,"End Date":1451520000000,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/Item/View/2671303"},{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"2016 and 2017 Revenue Requirement Settlement","Toll Order":"TG-001-2016","Start Date":1451606400000,"End Date":1514678400000,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/Item/View/2938323"},{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"2018-2019 Revenue Requirement Settlement","Toll Order":"TG-004-2018","Start Date":1514764800000,"End Date":1577750400000,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/Item/View/3577754"},{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"2020-2024 Revenue Requirement Settlement ","Toll Order":"TG-009-2020","Start Date":1577836800000,"End Date":1735603200000,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/Item/View/3957206"},{"Company":"NOVA Gas Transmission Ltd.","Commodity":"Gas","Settlement Name":"NGTL System Rate Design and Services (RH-001-2019)","Toll Order":"TG-001-2020","Start Date":1577836800000,"End Date":null,"regdocs":"https://apps.cer-rec.gc.ca/REGDOCS/File/Download/3913153"}]')}},e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),function(){"use strict";var t=r(6949),e=r(1925);(0,t.generalTheme)(),(0,t.frenchTheme)(),(0,e.cassandraSettlements)()}()}();