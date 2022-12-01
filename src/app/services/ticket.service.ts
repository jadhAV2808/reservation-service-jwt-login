import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  api='http://localhost:3032/tickets/';

  constructor( private http:HttpClient) { }

  bookTicket(data:any){
    return this.http.post<any>('http://localhost:3032/tickets/bookTicket',data);
    // .pipe(map((res:any)=>{
    //   return res;
    // }))
  }

/*
  postTicket(ticket: any): Observable<any[]>
  {
    return this.http.post<any[]>('http://localhost:3032/tickets/bookTicket',ticket)
  }
*/

  //to get all tickets
  getTickets(){
  }


  // fing ticket by id
  getTicketById(id:number){
    return this.http.get('http://localhost:3032/tickets/getTicket/'+id);
  }




}
