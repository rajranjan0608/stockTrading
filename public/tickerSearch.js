var host=location.origin.replace(/^http/,"http");

socket = io.connect(host);

//DOM
var searchBox = document.getElementById("searchBox");
var tickerSearchResult = document.getElementById("tickerSearchResult");

//EMIT EVENTS : TO THE SERVER
searchBox.addEventListener("keypress",function(){
    socket.emit("tickerSearch",{
        tickerName : searchBox.value
    });
});

socket.on("tickerSearch", function(data) {
    resultObject = "";
    data.forEach((quote) => {
        if(quote.longname != undefined) {
            resultObject += `<div class="card shadow dropDown" style="margin: 5px; cursor: pointer;">
                                <font size = 2 style="margin-left: 5px; margin-top: 5px; letter-spacing: 1px;">
                                    <b>${quote.longname}</b>
                                    <font size = 2 color="#26a69a">${quote.symbol}</font>
                                </font>
                                <br>
                            </div>`
        }
    });
    tickerSearchResult.innerHTML = resultObject;
});