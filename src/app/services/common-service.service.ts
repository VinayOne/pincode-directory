import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }

  getStateList() {
    return this.http.get(`${environment.application.apiUrl}/getstates`);
  }

  getsDistrictList(state: string) {
    const payLoad = {'stateName' : state};
    return this.http.post(`${environment.application.apiUrl}/getdistricts`, payLoad);
  }

  getsPostOfficeList(district: string) {
    const payLoad = {'districtName' : district}
    return this.http.post(`${environment.application.apiUrl}/getpostoffices`, payLoad);
  }

  getPincodeByPo(postOffice: string) {
    const payLoad = {'po' : postOffice}
    return this.http.post(`${environment.application.apiUrl}/getpincode`, payLoad);
  }

  getPincodeLocation(pin: number) {
    const payload = {'pc' : pin}
    return this.http.post(`${environment.application.apiUrl}/getpincodedetails`, payload);
  }

  mailService(mailObj: any) {
    const payLoad = mailObj;
    return this.http.post(`${environment.application.apiUrl}/getpincodedetails`, payLoad);
  }

  getVisitorIpDetail() {
    return this.http.get('https://api.ipgeolocation.io/ipgeo?apiKey=f620de073d29432194a9841daed4b538');
  }

  captureVisitorData(visitorData: any) {
    const payLoad = visitorData;
    return this.http.post(`${environment.application.apiUrl}/trafficCapture`, payLoad);
  }
}
