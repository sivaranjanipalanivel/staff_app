import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';

@IonicPage()
@Component({
  selector: 'page-sendmessage',
  templateUrl: 'sendmessage.html',
  providers: [DBserviceProvider]
})
export class SendmessagePage {
  assignmentid:any;
  batchid:any;
  skillInput:any;
  staffcomments=[];
  constructor(public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  this.assignmentid=navParams.get("assignmentid")
  this.batchid=navParams.get("batchid")
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SendmessagePage');
  }

  savecomments(){
              let postParams={
                id:0,
                student_id:"",
                assignment_id:this.assignmentid,
                description:this.skillInput,
                datecreated:new Date(),
                batch_id:this.batchid,
                staff_id:localStorage.staffId
              }             
                 this.dbserviceProvider.postAssignmentcomments(postParams)
    			.then(data => {  
                  this.staffcomments.push(data)
  				  this.skillInput="";
                }),error =>{
                  console.log(JSON.stringify(error.json()))
                }
   }

}
