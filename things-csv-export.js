function csv(device,keys){

    // any kind of extension (.txt,.cpp,.cs,.bat)
    var filename = "";
    var name = "";
    var content = "";
    var date = new Date();
    var now = date.getTime();



    $.ajaxSetup({
        headers:{
            'Content-Type': "application/json",
            'X-Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXJlZEBzZmlncm91cC5jby56YSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYzk1OTFmZTAtMjQzNS0xMWViLWE2ZjAtMjU4OGU5MDdjODVkIiwiZmlyc3ROYW1lIjoiSmFyZWQiLCJsYXN0TmFtZSI6IkNocmlzdGlhbnMiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiMTc2OGVlZjAtMjM1NC0xMWViLWE2ZjAtMjU4OGU5MDdjODVkIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjA2ODE1MTkzLCJleHAiOjE2MDY4MjQxOTN9.DKH3X0IvqSJEPb9dXip8c-KHefPZwSAHn4THRrfwMf-AaLWEvohp5-v3pzOkgBA3dClXPDMeB7qOtxihG9ZUKQ"
        }
    });
    
    var url = "https://things.sfigroup.co.za/api/device/"+device;
    $.get(url, function(data){
        name = data.name;
        filename = name+".csv";
        
    });

    if (keys == 'temp'){
        var url = "https://things.sfigroup.co.za/api/plugins/telemetry/DEVICE/"+device+"/values/timeseries?keys="+keys+"&startTs=0&endTs="+now+"&interval=60000&agg=NONE&limit=50000";
        $.get(url, function(data){

            for (var key in data.temp){
                var date = new Date(data.temp[key].ts).toLocaleDateString("en-ZA");
                var time = new Date(data.temp[key].ts).toLocaleTimeString("en-ZA");
                //document.write('"'+name+'"'+";"+'"'+date + ' ' + time +'";"'+data.temp[key].value+'"'+"<br>");
                content += name+';'+data.temp[key].value+';'+date + ' ' + time+'\n';
            }

            var blob = new Blob([content], {
                type: "text/plain;charset=utf-8"
            });

            saveAs(blob, filename);
        });
    }
    
    if (keys == 'humid'){
        var url = "https://things.sfigroup.co.za/api/plugins/telemetry/DEVICE/"+device+"/values/timeseries?keys="+keys+"&startTs=0&endTs="+now+"&interval=60000&agg=NONE&limit=50000";
        $.get(url, function(data){

            for (var key in data.humid){
                var date = new Date(data.humid[key].ts).toLocaleDateString("en-ZA");
                var time = new Date(data.humid[key].ts).toLocaleTimeString("en-ZA");
                //document.write('"'+name+'"'+";"+'"'+date + ' ' + time +'";"'+data.humid[key].value+'"'+"<br>");
                content += name+';'+data.humid[key].value+';'+date + ' ' + time+'\n';
            }

            var blob = new Blob([content], {
                type: "text/plain;charset=utf-8"
            });

            saveAs(blob, filename);
        });
    }

}

//csv("c5edfa50-23e6-11eb-a6f0-2588e907c85d","temp");
//csv("15720a30-24c3-11eb-a6f0-2588e907c85d","temp");

