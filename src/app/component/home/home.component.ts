import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeTrainsListService } from 'src/app/services/home-trains-list.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
/*
content?: string;

constructor(private userService: UserService) { }

ngOnInit(): void {
  this.userService.getPublicContent().subscribe(
    data => {
      this.content = data;
    },
    err => {
      this.content = JSON.parse(err.error).message;
    }
  );
}
*/


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