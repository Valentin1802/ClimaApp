window.addEventListener('load', ()=> {
    let lon
    let lat
    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 
    let vientoVelocidad = document.getElementById('viento-velocidad') 
    let humedad = document.getElementById("humedad")
    let tempMaxValor = document.getElementById("tempMax")
    let tempMinValor = document.getElementById("tempMin")


    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude

            //ubicación actual    
            const apiKey = "7c739f9294ab5e06e64b824bda3ad966";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es`;
            console.log(url);
            

            function cambiarFondo(weather) {
              let bodyClass = '';
              switch (weather) {
                  case 'Clear':
                      bodyClass = 'body-soleado';
                      break;
                  case 'Rain':
                  case 'Drizzle':
                      bodyClass = 'body-lluvia';
                      break;
                  case 'Clouds':
                      bodyClass = 'body-nublado';
                      break;
                  default:
                      bodyClass = 'body-nublado';
              }
              document.body.className = bodyClass;
            }
          
           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                // temperatura
                let temp = Math.round(data.main.temp - 273.15);
                temperaturaValor.textContent = `${temp} ° C`;
              
                // descripción
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                
                // velocidad
                vientoVelocidad.textContent = `${data.wind.speed} m/s`

                // humedad
                humedad.textContent = `${data.main.humidity} %`

                // temperatura max y min
                let tempMax = Math.round(data.main.temp_max - 273.15);
                tempMaxValor.textContent = `${tempMax} ° C`;

                let tempMin = Math.round(data.main.temp_min - 273.15);
                tempMinValor.textContent = `${tempMin} ° C`;

                console.log(data.weather[0].main)
                cambiarFondo(data.weather[0].main);

                //iconos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})
