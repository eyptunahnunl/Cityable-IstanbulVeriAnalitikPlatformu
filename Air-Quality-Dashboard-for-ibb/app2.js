// Zaman serisi için API da istekde bulunmak için app2.js çalışır.
// Zaman aralıkları girildikten sonra butona tıklandığında API ye istek atılır.

// İstenilen Ay Yıl ve saat aralığında zaman serisi grafiği çizdirilerek hava kalitesi indeksi takibi yapılır.
// Örn : 01.04.2021 ve 30.04.2021 tarihleri aralığında ... istasyonundaki hava kalitesini döndürür.

async function GetIntervalResult(){
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;
    Station = document.getElementById("Stations").value;
    // console.log(startDate);
    // console.log(endDate);
    
    let query2 = 
`https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=${Station}
&StartDate=${startDate.slice(8,10)}.${startDate.slice(5,7)}.${startDate.slice(0,4)}
%20${startDate.slice(11,13)}:00:00
&EndDate=${endDate.slice(8,10)}.${endDate.slice(5,7)}.${endDate.slice(0,4)}
%20${endDate.slice(11,13)}:00:00`;

    const response = await fetch(query2)
	  const data = await response.json()
    
    const dataReadDate = [];
    const dataAQI = [];
    const dataReadTime = [];

    for(let i=0; i<data.length; i++){
      dataReadDate.push(data[i].ReadTime.slice(8,10));
      dataAQI.push(data[i].AQI.AQIIndex); 
      dataReadTime.push(data[i].ReadTime.slice(11,16))

    }

      // Zaman Serisi Grafiği

    var data2 = [
      {
              
        x: dataReadDate, //seçilen başlangıç tarihi ve bitiş tarihi günleri gelecek
        y: dataAQI, // Her ay için dönen AQI indeks değerleri,
        type: 'scatter',
        text : dataReadTime     
      }];

    var layout = {
      
      title : "Hava Kalitesi Zaman Serisi",
      yaxis:{
        title : "Hava Kalitesi İndeksi",
        
      },
      plot_bgcolor:"F1EEE9",
      paper_bgcolor:"#F1EEE9",
      xaxis : {
        title : "Gün"
      }
    }


	  Plotly.newPlot('myDiv3', data2, layout);
    

}