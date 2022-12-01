import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserOperationService } from 'src/app/services/user-operation.service';
import { UsersData } from 'src/app/user-data/usersData.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  currentUser: any;

  // to add new train
  myUserForm!:FormGroup;
  userDataModelObj:UsersData=new UsersData();
  // userDataModelObj:

  constructor(private token: TokenStorageService,private formBuilder:FormBuilder, private userOpService:UserOperationService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();



    this.myUserForm=this.formBuilder.group({
      username:[''],
      email:[''],
      phone:[''],
      password:[''],
      age:[''],
      gender:['']
 
    });
  }


  onEditUser(user:any){

    // this.showAdd=false;
    // this.showEdit=true;
 
    this.userDataModelObj.userId=user.id;
    this.myUserForm.controls['username'].setValue(user.username);
    this.myUserForm.controls['email'].setValue(user.email);
    this.myUserForm.controls['phone'].setValue(user.phone);
    this.myUserForm.controls['password'].setValue(user.password);
    this.myUserForm.controls['age'].setValue(user.age);
    this.myUserForm.controls['gender'].setValue(user.gender);
  }
 

 


  updateUser(){

    this.userDataModelObj.username=this.myUserForm.value.username;
    this.userDataModelObj.email=this.myUserForm.value.email;
    this.userDataModelObj.phone=this.myUserForm.value.phone;
    this.userDataModelObj.password=this.myUserForm.value.password;
    this.userDataModelObj.age=this.myUserForm.value.age;
    this.userDataModelObj.gender=this.myUserForm.value.gender;



    this.userOpService.updateUser(this.userDataModelObj,this.userDataModelObj.userId)
   .subscribe(res=>{
     alert("User Updated Successfully!");

   })


   

  }

  
}

/*
  constructor() { }

  ngOnInit(): void {
  }
*/


