import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient:HttpClient) { }

  // Get all information about the weather 
GetWeather(city:string):Observable<any>{
return this._HttpClient.get(`https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=all&timezone=UTC&language=en&units=metric&key=6zrt1h0j0yfymnsjhd3ko7uxo6fiwyjvnve194zp`)
}

// Get city name by using longitude and latitude
getCityName(lat: number, lon: number):Observable<any>{
  return this._HttpClient.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=388e604c2af647c9b29e0e007a10b476`)
}

}
