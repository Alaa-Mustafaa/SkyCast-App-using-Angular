import { Component ,OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  Weather:any[]=[]
  weatherDayOne:any;
  path:string='assets/'
  userLatitude: any;
  userLongitude: any;
  userCity: any;
  cityName:any;
  searchValue:any;
  error:any;
  Fourdays: any;
  constructor(private _DataService:DataService){
  }

  ngOnInit(): void {
          this.getCurrentLocation();
    } 

 // Get  Current Location from user automatically 
getCurrentLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLatitude = position.coords.latitude;
      this.userLongitude = position.coords.longitude;
      // Now call the function to get the city name from latitude and longitude
       this.getCityName(this.userLatitude, this.userLongitude);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }}

  // Get full information about the weather
  getWeather(city:any){
    return this._DataService.GetWeather(city).subscribe({
      next:(res)=>{
        this.weatherDayOne=res.daily.data[0]
         this.Weather=res.hourly.data
         this.Fourdays=res.daily.data.slice(1,5)
         console.log(this.Fourdays.slice(1,5))

    },
      error:(err)=>{
        console.log(err)
        this.error="Invalid City Name , Please enter a valid one"
      }
    })
  }

// Owl carousel for sliders
  customOptions: OwlOptions = {
    loop: true,
    margin:15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 6
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

// Get city name and send it to getWeather function to get full information about the weather
  getCityName(lat: number, lon: number) {
    return this._DataService.getCityName(lat,lon).subscribe((data)=>{
      console.log(data)
      this.cityName=data.results[0].components.city
      this.getWeather(data.results[0].components.city)
    })   
  }

  // Search function
  search(){
    this.getWeather(this.searchValue)
  }

}
