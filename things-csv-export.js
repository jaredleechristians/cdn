function csv(device,keys){
    var token = "Bearer ";
    var filename = "";
    var name = "";
    var content = "";
    var date = new Date();
    var now = date.getTime();


    let xhr = new XMLHttpRequest();

    // Set the request URL and request method
    xhr.open("POST", "https://things.sfigroup.co.za/api/auth/login");

    // Set the `Content-Type` Request header
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    // Send the requst with Data
    xhr.send('{"username":"jared@sfigroup.co.za", "password":"SfiJc01$"}');

    xhr.onreadystatechange = function() {
        // 	Check if request is completed
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //	Do what needs to be done here
            token += JSON.parse(xhr.response).token;

            $.ajaxSetup({
                headers:{
                    'Content-Type': "application/json",
                    'X-Authorization': token
                }
            });        
        
            var url = "https://things.sfigroup.co.za/api/device/"+device;
            $.get(url, function(data){
                name = data.name;
                filename = name+".csv";
                
            });

            var url = "https://things.sfigroup.co.za/api/plugins/telemetry/DEVICE/"+device+"/values/timeseries?keys="+keys+"&startTs=0&endTs="+now+"&interval=60000&agg=NONE&limit=5000";
            $.get(url, function(data){

                for (var key in data[keys]){
                    var date = new Date(data[keys][key].ts).toLocaleDateString("en-ZA");
                    var time = new Date(data[keys][key].ts).toLocaleTimeString("en-ZA");
                    //document.write('"'+name+'"'+";"+'"'+date + ' ' + time +'";"'+data.temp[key].value+'"'+"<br>");
                    content += name+';'+data[keys][key].value+';'+date + ' ' + time+'\n';
                }

                var blob = new Blob([content], {
                    type: "text/plain;charset=utf-8"
                });

                saveAs(blob, filename);
            });
            
        }

    }

}

//csv("c5edfa50-23e6-11eb-a6f0-2588e907c85d","temp");
//csv("15720a30-24c3-11eb-a6f0-2588e907c85d","temp");

