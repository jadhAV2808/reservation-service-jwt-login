import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeTrainsListService } from 'src/app/services/home-trains-list.service';
import { UserService } from 'src/app/services/user.service';
import { TrainsData } from 'src/app/trains-data/trainsData.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  
 
  // content?: string;

  // // constructor() { }

  // constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   this.userService.getAdminBoard().subscribe(
  //     data => {
  //       this.content = data;
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }

 
  // to add new train
  addTrainForm:FormGroup;
  trainsDataModelObj:TrainsData=new TrainsData();


  // to check for form submission
  submitted=false;


  // to edit and add
  showAdd!:boolean;
  showEdit!:boolean;


  // to store trains list
  trainsList :any=null;



  // search train by source and destination
  source;
  destination;

  constructor(private trainsListServcie:HomeTrainsListService ,private router:Router, private formBuilder:FormBuilder) {

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

  

   // to new train to the list
   this.addTrainForm=this.formBuilder.group({
    trainName:['' , [Validators.required,Validators.minLength(3) , Validators.maxLength(20)]],
  
    source:['' , [Validators.required,Validators.minLength(3) , Validators.maxLength(20)]],
    destination:[''  , [Validators.required,Validators.minLength(3) , Validators.maxLength(20)]],
    price:['' , Validators.required],
    seats:['', Validators.required],
    time:['', Validators.required]


  });
  

   /*
   // to new train to the list
   this.addTrainForm=this.formBuilder.group({
    trainName:[''],
   
    source:[''],
    destination:[''],
    price:[''],
    seats:[''],
    time:['']

  });
  */

 }

 

onSubmit(){

  if (this.addTrainForm.invalid) {
    return;
}


  console.log(this.addTrainForm.value);
  // this.addTrain()
 
 }

 clickAddTrain(){
   this.addTrainForm.reset();
   this.showAdd=true;
   this.showEdit=false;
 }


 //now subscribing data
 addTrain(){
   this.trainsDataModelObj.trainName=this.addTrainForm.value.trainName;
   this.trainsDataModelObj.source=this.addTrainForm.value.source;
   this.trainsDataModelObj.destination=this.addTrainForm.value.destination;
   this.trainsDataModelObj.price=this.addTrainForm.value.price;
   this.trainsDataModelObj.seats=this.addTrainForm.value.seats;
   this.trainsDataModelObj.time=this.addTrainForm.value.time;

   this.trainsListServcie.addTrain(this.trainsDataModelObj)
   .subscribe(res=>{
     console.log(res);
     alert("Train Added SuccessFully!");
     this.addTrainForm.reset();
     this.getTrainsList();
   },
   error=>{
     alert("Something went Wrong!!!");
   }
   )
   
 }


 /*Delete the trains by id */
 deleteTrain(train){
   this.trainsListServcie.deleteTrainById(train.trainId)
   .subscribe(res=>{
     console.log(res);
     alert("Train Deleted Successfully!")
     this.getTrainsList();
   })
   
   
  
  
     // alert("Train Deleted Successfully!");
     // this.getTrainsList();
  
 }


 /*Delete the trains by id *
 deleteTrain(train){
   this.trainsListServcie.deleteTrainById(train.trainId)
   .subscribe(
     (resp) =>{
       console.log(resp);
     },
     (error)=>{
       console.log(error);
     }
   );
 } 
*/
 onEditTrain(train:any){

   this.showAdd=false;
   this.showEdit=true;

   this.trainsDataModelObj.trainId=train.trainId;
   this.addTrainForm.controls['trainName'].setValue(train.trainName);
   this.addTrainForm.controls['source'].setValue(train.source);
   this.addTrainForm.controls['destination'].setValue(train.destination);
   this.addTrainForm.controls['price'].setValue(train.price);
   this.addTrainForm.controls['seats'].setValue(train.seats);
   this.addTrainForm.controls['time'].setValue(train.time);
 }

 updateTrain(){

   
   this.trainsDataModelObj.trainName=this.addTrainForm.value.trainName;
   this.trainsDataModelObj.source=this.addTrainForm.value.source;
   this.trainsDataModelObj.destination=this.addTrainForm.value.destination;
   this.trainsDataModelObj.price=this.addTrainForm.value.price;
   this.trainsDataModelObj.seats=this.addTrainForm.value.seats;
   this.trainsDataModelObj.time=this.addTrainForm.value.time;

   this.trainsListServcie.updateTain(this.trainsDataModelObj,this.trainsDataModelObj.trainId)
   .subscribe(res=>{
     alert("Train Updated Successfully!");

     this.addTrainForm.reset();
     this.getTrainsList();

   })

 }


 // to deletee train
/* removeTrain(id:number){
   let resp=this.trainsListServcie.deleteTrain(id);
   resp.subscribe((data)=>
     this.trainsList=data
   );
 }*/
 


/* for froms validation  */
letterOnly(event:any) : Boolean{
  const charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
    return false;
  }
  return true;
}

keyPressNumbers(event: any) {
  var charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode < 48 || charCode > 57))
  {
    event.preventDefault();
    return false;
  } else
   {
    return true;
  }

}


/* getters for form validation */

//getters for passangerName
get passangerName(){
  return this.addTrainForm.get('passangerName');
}

//getters for passangerContact
get passangerContact(){
  return this.addTrainForm.get('passangerContact');
}

//getters for passangerEmail
get passangerEmail(){
  return this.addTrainForm.get('passangerEmail');
}

//getters for trainId
get trainId(){
  return this.addTrainForm.get('trainId');
}

//getters for trainName
get trainName(){
  return this.addTrainForm.get('trainName');
}

//getters for source
get sources(){
  return this.addTrainForm.get('source');
}

//getters for destination
get destinations(){
  return this.addTrainForm.get('destination');
}

//getters for price
get price(){
  return this.addTrainForm.get('price');
}

//getters for seats
get seats(){
  return this.addTrainForm.get('seats');
}

//getters for time
get time(){
  return this.addTrainForm.get('time');
}





}
  

  

