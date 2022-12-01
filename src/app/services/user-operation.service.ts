import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOperationService {

  constructor(private http:HttpClient) { }

  api='http://localhost:3033/feign/user';


  updateUser(data:any , id:number){
    return this.http.put<any>(this.api+'/updateUser/'+id , data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  getUserById(id:number){
    return this.http.get<any>(this.api+'/getUser/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}


