mapboxgl.accessToken = 'pk.eyJ1IjoiaXNtYWlsaGVybyIsImEiOiJjbDFxOWUwYTYwYWxhM2VvM3l1NXhiYjM3In0.WGh-jFaUsTAu7KLUzS351Q';
const url = "https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIStations?StationId=377e1216-bcc7-42c0-aad8-4d5b3d602b78"


//Mapbox kütüphanesi kullanılarak altlık harita oluşturuldu
var map = new mapboxgl.Map({ 
	container: 'map',
	style: 'mapbox://styles/ismailhero/cl1qaq8r000lu15qs6veq9qm2',
	zoom: 0,
	center: [28.979530, 41.015137],
	zoom: 8,
	antialias:true,
	attributionControl:false})
		.addControl(new mapboxgl.AttributionControl({
			customAttribution  : 'Created by CityAble'
			
	}));
	map.addControl(new mapboxgl.FullscreenControl());
	

const layerList = document.getElementById('menu'); // Harita Altlığı
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
};
}
// Hava durumu kalitesi bilgisi ve emoji
const stateValue = document.getElementById("stateValue");
const image = document.getElementById("resim");

// Hava Durumu ölçüm istasyonlarına API istediği atan fonksiyon
async function getStations(url){
	const response = await fetch(url)
	const data = await response.json()
	return data;
}
//Harita üzerine tüm noktalar ve pop-up ları eklenir.
getStations(url)
.then(data => data.forEach(element => {
	const el = document.createElement('div');
	el.className = 'marker';
	const marker = new mapboxgl.Marker(el)
		.setLngLat([((((((JSON.stringify(element.Location)).slice(8,-2)))).substring(0,6)).trim()),((((((JSON.stringify(element.Location)).slice(8,-2)))).substring(18,25)).trim())])
		.setPopup(
			new mapboxgl.Popup({ offset: 25 })
				.setHTML(
					`<h3> ${element.Name}</h3>
			<ul>
			<small><li class = mapboxgl-popup-content>İstasyon Adress: ${element.Adress}</li></small>
			</ul>
			`
				))
		.addTo(map)
		// Ölçüm istasyonuna tıklayınca bu fonksiyon çalışır.
		marker.getElement().addEventListener('click', () =>{
			const clickId=element.Id
			// Ölçüm istasyonu sonucunu almak için seçilen ölçüm istasyonunun
			// stationID si alınır ve diğer API 'a istekte bulunur.
			getResult(clickId)
		})
		
}))
.catch(err => console.log(err));

// API 00:00:00 saat dakika ve saniye tipinde veri gönderir.
// Alınan saat değeri 06 ise js tarafında 6 olarak okunur ve API de istekte bulunamaz
// Bunun önüne geçmek için fonksiyon çalışır.
function pad(n) {
	return n<10 ? '0'+n : n
}

// Her istasyonda 'click' eventi gerçekleşince çalışır.
// Bir önceki API dan dönen ID bu sefer istasyon sonuçlarını almak için istekte bulunur.
async function getResult (stationId){
	
	var today = new Date();
	
	var date = pad(today.getDate())+'.'+pad(today.getMonth()+1)+'.'+pad(today.getFullYear());
	var timeHour=today.getHours()

	let query = `https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=${stationId}&StartDate=${date}%20${(pad(timeHour - 1))}:00:00&EndDate=${date}%20${(pad(timeHour - 1))}:00:00`
	const response = await fetch(query)
	const data = await response.json()
	hava_kalite=(data[0].AQI.State)
	hava_indeks=(data[0].AQI.AQIIndex)
	
	// HAVA KALİTESİ İNDEKSİ KOŞULLU İFADELERİ

	if(hava_indeks <=50){
		image.innerHTML = `<img src="images/0_50.svg" alt="" width="50px" height="50px">`
		stateValue.innerHTML = ` 
		<ul>
      		<li><p4 class="text-primary">${hava_kalite}</p4</li>
      		<li>Ölçüm Tarihi<br>${data[0].ReadTime}</li>
			<li><img src="images/0_50.svg" alt="" width="50px" height="50px"></li>
			  
    	</ul>`
		
	}
	else if(hava_indeks <=100 && hava_indeks >=51){
		image.innerHTML = `<img src="images/51_100.svg" alt="" width="50px" height="50px">`
		stateValue.innerHTML = `
		<ul>
			<li><p4 class="text-success">${hava_kalite}</p4</li>
			<li>Ölçüm Tarihi<br>${data[0].ReadTime}</li>
			<li><img src="images/51_100.svg" alt="" width="50px" height="50px"></li>
  		</ul>`
		
	}
	else if(hava_indeks <=150 && hava_indeks >=101){
		image.innerHTML = `<img src="images/101_150.svg" alt="" width="50px" height="50px">`
		stateValue.innerHTML = `
		<ul>
			<li><p4 class="text-warning">${hava_kalite}</p4</li>
			<li>Ölçüm Tarihi<br>${data[0].ReadTime}</li>
			<li><img src="images/101_150.svg" alt="" width="50px" height="50px"></li>
  		</ul>`
		
	}
	else if(hava_indeks <=200 && hava_indeks >=151){
		image.innerHTML = `<img src="images/151_200.svg" alt="" width="50px" height="50px">`
		stateValue.innerHTML = `
		<ul>
			<li><p4 class="text-danger">${hava_kalite}</p4</li>
			<li>Ölçüm Tarihi<br>${data[0].ReadTime}</li>
			<li><img src="images/151_200.svg" alt="" width="50px" height="50px"></li>
  		</ul>`
		
	}
	else if(hava_indeks <=300 && hava_indeks >=201){
		image.innerHTML = `<img src="images/300_201.svg" alt="" width="50px" height="50px">`
		stateValue.innerHTML = `
		<ul>
			<li><p4 class="text-danger">${hava_kalite}</p4</li>
			<li>Ölçüm Tarihi<br>${data[0].ReadTime}</li>
			<li><img src="images/300_201.svg" alt="" width="50px" height="50px"></li>
  		</ul>`
		
	}
	else if(hava_indeks <=500 && hava_indeks >=301){
		image.innerHTML = `<img src="images/500_301.svg" alt="" width="50px" height="50px">`
		stateValue.innerHTML = `
		<ul>
			<li><p4 class="text-danger">${hava_kalite}</p4</li>
			<li>Ölçüm Tarihi<br>${data[0].ReadTime}</li>
			<li><img src="images/500_301.svg" alt="" width="50px" height="50px"></li>
  		</ul>`
		
	}
	
	// GRAFİK EKSEN DEĞERLERİ
	
	var xValue = ['PM10', 'SO2', 'O3','NO2','CO'];

	var yValue = [data[0].Concentration.PM10, data[0].Concentration.SO2, data[0].Concentration.O3, data[0].Concentration.NO2 ,data[0].Concentration.CO];

	var yValue2 = [data[0].AQI.PM10, data[0].AQI.SO2, data[0].AQI.O3, data[0].AQI.NO2 ,data[0].AQI.CO];

	// BAR GARAFİK 
	var concentration = {
		name :"Concentration" ,
		x: xValue,
		y: yValue,
		type: 'bar',
		text: yValue.map(String),
		textposition: 'auto',
		hoverinfo: 'none',
		opacity: 0.4,
		marker: {
			color: 'rgb(158,202,225)',
			line: {
				color: 'rgb(8,48,107)',
				width: 1.5
			}
		}
	};

	var AQI = {
		name : "AQI",
		x: xValue,
		y: yValue2,
		type: 'bar',
		text: yValue2.map(String),
		textposition: 'auto',
		hoverinfo: 'none',
		marker: {
			color: 'rgba(58,200,225,.5)',
			line: {
				color: 'rgb(8,48,107)',
				width: 1.0
			}
		}
	};

	var BarChart = [concentration, AQI];

	var BarChartLayout = {
		title: 'Hava Kalitesi Değerleri',
		paper_bgcolor:"#F1EEE9",
		plot_bgcolor:"F1EEE9"
	};

	Plotly.newPlot('myDiv', BarChart, BarChartLayout);



	var trace1 = {
		x: xValue,
		y: yValue2,
		mode: 'markers',
		marker: {
		  color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
		  size: [data[0].AQI.PM10, data[0].AQI.SO2, data[0].AQI.O3, data[0].AQI.NO2 ,data[0].AQI.CO],
		//   sizeref : 0.2
		
		}
	  };
	  
	  var BubbleChart = [trace1];
	  
	  var BubbleChartLayout = {
		title: 'Hava Kalitesi İndeksi Balon Grafik',
		showlegend: false,
		font: {size: 15,
			color: '#15133C',
			
		
		},
		paper_bgcolor:"#F1EEE9",
		plot_bgcolor:"F1EEE9",
		// sizeref : 0.5
		
	  };
	  
	  Plotly.newPlot('myDiv2', BubbleChart, BubbleChartLayout);


	  var Indicator = [
		{
		  domain: { x: xValue, y: yValue2 },
		  value: data[0].AQI.PM10,
		  title: { text: "AQI" },
		  type: "indicator",
		  mode: "gauge+number",
		  delta: { reference: 150 },
		  gauge: { axis: { range: [0, 100] } }
		  
		}
	  ];
	  
	  var IndicatorLayout = {
		font: {size: 15,
			color: '#15133C'
			
		},
		paper_bgcolor:"#F1EEE9"	
	//   title : "AQI Indeks" 
		
	  };
	  Plotly.newPlot('IndicatorChart', Indicator, IndicatorLayout);




};


