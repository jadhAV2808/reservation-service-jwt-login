import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HomeTrainsListService } from 'src/app/services/home-trains-list.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { TicketData } from 'src/app/ticket-data/ticketData.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  // constructor() { }

  // constructor(private userService: UserService) { }
/*
  ngOnInit(): void {
  }

  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
  }
  */


  // to store trains list
  trainsList :any=null;

  // search train by source and destination
  source;
  destination;


  // for ticket booking form
  ticketBookingForm!:FormGroup;


  // object for ticket booking
  ticketBookingModelObj:TicketData=new TicketData();
  ticketDetailsObject;


  constructor(private trainsListServcie:HomeTrainsListService ,private router:Router, private formBuilder:FormBuilder,private ticketService:TicketService) {

    this.getTrainsList();

   }

  // get all trains
  getTrainsList(){
    this.trainsListServcie.getTrainsList().subscribe(
      (resp) => {
        console.log(resp);
        this.trainsList=resp;
      },
      (error) =>{
        console.log(error);
      }
    );
  }


  //search train by source and destination
  searchTrain(){
    this.trainsListServcie.searchTrain(this.source,this.destination).subscribe(
      (resp) => {
        console.log(resp);
        this.trainsList=resp;
      },
      (error) =>{
        console.log(error);
      }
    )
  }
  



  ngOnInit(): void {

    this.ticketBookingForm=this.formBuilder.group({
      passangerName:[''],
      passangerContact:[''],
      passangerEmail:[''],
      trainId:[''],
      trainName:[''],
      source:[''],
      destination:[''],
      price:[''],
      time:[''],
      date:['']

  })

  }


  goBack(){
    this.router.navigate(['/home']);
  }


  goToBooking(){
    this.router.navigate(['/booking']);
  }


  onBooking(data:any){
    this.ticketBookingForm.controls['trainId'].setValue(data.trainId);
    this.ticketBookingForm.controls['trainName'].setValue(data.trainName);
    this.ticketBookingForm.controls['source'].setValue(data.source);
    this.ticketBookingForm.controls['destination'].setValue(data.destination);
    this.ticketBookingForm.controls['price'].setValue(data.price);
    this.ticketBookingForm.controls['time'].setValue(data.time);
   
  }


  // for booking the ticket
  onSubmitOfTicket(){
    this.ticketBookingModelObj.passangerName=this.ticketBookingForm.value.passangerName
    this.ticketBookingModelObj.passangerContact=this.ticketBookingForm.value.passangerContact
    this.ticketBookingModelObj.passangerEmail=this.ticketBookingForm.value.passangerEmail
    this.ticketBookingModelObj.trainId=this.ticketBookingForm.value.trainId;
    this.ticketBookingModelObj.trainName=this.ticketBookingForm.value.trainName;
    this.ticketBookingModelObj.source=this.ticketBookingForm.value.source;
    this.ticketBookingModelObj.destination=this.ticketBookingForm.value.destination;
    this.ticketBookingModelObj.price=this.ticketBookingForm.value.price;
    this.ticketBookingModelObj.time=this.ticketBookingForm.value.time;
    this.ticketBookingModelObj.date=this.ticketBookingForm.value.date;


    this.ticketService.bookTicket(this.ticketBookingModelObj)
    .subscribe(res=>{
     console.log(res);
     alert("Train Added SuccessFully! Your Ticket Id is "+res.ticketId +"  Please Remember your ticketId");
     this.ticketDetailsObject=res;
     this.ticketBookingForm.reset();
    
   },
   error=>{
     alert("Something went Wrong!!!");
   }
   )

    
    
    // .subscribe(res=>{
    //   console.log(res);
    //   alert("ticket booking Successful!");
    //   this.ticketBookingForm.reset();
    // },
    // err=>{
    //   alert("something went wrong!");
    // }
    // )



  }

}
