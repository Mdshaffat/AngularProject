import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpazilaAndDistrictService {
  dividion: IDivision[];
  district: IDistrict[];
  upazila: IUpazila[];

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getAllDivision(){
    return this.http.get<IDivision[]>(this.baseUrl + 'UpazilaAndDistrict/division').pipe(
     map(response => {
       this.dividion = response;
       return response;
     })
   );
   }
  getAllDistrict(){
   return this.http.get<IDistrict[]>(this.baseUrl + 'upazilaanddistrict/district').pipe(
    map(response => {
      this.district = response;
      return response;
    })
  );
  }
  getAllDistrictByDivisionId(id: number){
    return this.http.get<IDivision[]>(this.baseUrl + 'upazilaanddistrict/divisionwisedistrict/' + id).pipe(
     map(response => {
       this.dividion = response;
       return response;
     })
   );
   }

  getAllUpazila(){
   return this.http.get<IUpazila[]>(this.baseUrl + 'upazilaanddistrict/upazila').pipe(
    map(response => {
      this.upazila = response;
      return response;
    })
  );
  }
  getAllUpazilaByDistrictId(id: number){
   return this.http.get<IUpazila[]>(this.baseUrl + 'upazilaanddistrict/districtwiseupazila/' + id).pipe(
    map(response => {
      this.upazila = response;
      return response;
    })
  );
  }

}
