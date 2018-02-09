import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,ModalController,ItemSliding } from 'ionic-angular';
import { AttendancePage } from '../attendance/attendance';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { EditassignstudentPage } from '../editassignstudent/editassignstudent';

@IonicPage()
@Component({
  selector: 'page-assignmentdetail',
  templateUrl: 'assignmentdetail.html',
  providers: [ DBserviceProvider ]
})
export class AssignmentdetailPage {
	Studentlist=[];
	batchid:any;
  title:any;
  assigmentid:any;
  constructor(public dbserviceProvider: DBserviceProvider,public modalCtrl: ModalController,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
 let item=this.navParams.get("assdetail")
 console.log(item)
 this.title=item.title;
 this.batchid=item.assignment_id;
 this.assigmentid=item.group_id;
 this.studentlist();
 this.presentLoadingDefault();
  }
  
  ionViewDidLoad() {
    
  }
 presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading Please Wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 50);
  }
  studentlist(){
  this.Studentlist=[];
       this.dbserviceProvider.getassignmentdetail(this.batchid)
          .then(data => {
            let assignmentdetail:any=data;
            console.log(assignmentdetail)
          for (var i = 0; i < assignmentdetail.length; ++i) {
            var d=assignmentdetail[i].student.company;
             d= d.replace(" ",""); 
            assignmentdetail[i].letter=d[0];
            assignmentdetail[i].tracks="Communication"
            if(assignmentdetail[i].student.branch_id == localStorage.staffbranch_id)
            {       
            this.Studentlist.push(assignmentdetail[i]);
          }
    }
         }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
  }

  sendmessage(){
  let alert = this.alertCtrl.create({
    title: 'Message',
    subTitle: 'Send message to all in '+this.title,
    inputs: [
      {
        name: 'message',
        placeholder: 'Message',
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send',
        handler: data => {
          if (data.message) {
            var message=data.message;
             this.dbserviceProvider.getStudents(this.assigmentid)
          .then(data => {
            let assignment:any=data;
            for(var i=0;i < assignment.length;i++){
            let postParams={
                id:0,
                student_id:assignment[i].userid,
                assignment_id:this.batchid,
                description:message,
                datecreated:new Date(),
                batch_id:this.assigmentid,
                staff_id:localStorage.staffId,
                PostedBy:localStorage.staffname,
                Isstudent:"staff"
              }             
                 this.dbserviceProvider.postAssignmentcomments(postParams)
          .then(data => {  
      
                }),error =>{
                  console.log(JSON.stringify(error.json()))
                }
              }
             }),error =>{
                  console.log(JSON.stringify(error.json()))
                }
            
          } else {
            return false;
          }
        }
      }
    ]
  });
  alert.present();
  }

  editassignstudent(slidingItem: ItemSliding,id:any,studentid:any,index:any){
       let modal = this.modalCtrl.create(EditassignstudentPage, {assignmentid:id,studentid:studentid});
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
    this.studentlist();
      }
    });                 
  }

}
