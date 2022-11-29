import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeTrainsListService } from 'src/app/services/home-trains-list.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }


  // to store trains list
 trainsList :any=null;

 // search train by source and destination
 source;
 destination;


 constructor(private trainsListServcie:HomeTrainsListService ,private router:Router) {

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

}


goBack(){
  this.router.navigate(['/home']);
}

}
