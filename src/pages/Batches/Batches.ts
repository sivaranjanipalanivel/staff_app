import { Component, ViewChild } from '@angular/core';
import { AlertController, NavParams, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { AssignmentdetailPage } from '../assignmentdetail/assignmentdetail';
import { AddassignmentPage } from '../addassignment/addassignment';
import { EditassignmentPage } from '../editassignment/editassignment';
import { DiscussiondetailPage } from '../discussiondetail/discussiondetail';
import { StudentviewPage } from '../studentview/studentview';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';

@Component({
  selector: 'page-Batches',
  templateUrl: 'Batches.html'
})
export class BatchesPage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'Students';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  currState: any;
  batches: any;
  Studentlist: any;
  Studentlistitem:any;
  disussionlist: any=[];
  assignment: any=[];
  discuss_flag: any;
  assign_flag: any;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public user: UserData,
    public navParams: NavParams,
    public dbserviceProvider: DBserviceProvider,
    public storage: Storage

  ) {
    this.batches = navParams.get("detail");
    this.studentgrouplist();
    this.discuss_flag =false;
    this.assign_flag =false;
    this.presentLoadingDefault();
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

  ionViewDidLoad() {
    
  }

  goToStudentDetail(student) {
    this.navCtrl.push(StudentviewPage, { student: student,pet:"Personal" })
  }


  studentgrouplist() {
    this.Studentlist = [];
    this.Studentlistitem=[];
    this.dbserviceProvider.getstudentsfrombatch(this.batches.parent)
      .subscribe(data => {
        console.log(data);
        let assignment: any = data.data;
        console.log(data.data);
         for (var i = 0; i < assignment.length; ++i) {
            var d = assignment[i].student;
         this.storage.set('student_name', assignment[i].student);
         localStorage.staffId=assignment[i].student;
         this.dbserviceProvider.getdetail(assignment[i].student)
      .subscribe(data => {
        console.log(data);
        console.log(data.data);
       this.Studentlistitem[i] = data.data;
 this.Studentlist.push(this.Studentlistitem[i]);
         }, error => {
        console.log(JSON.stringify(error.json()));
      });
    }
      console.log(this.Studentlist);
       }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }


  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, { groupid: this.batches.parent });
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.discussions();
      }
    });
  }

  addassignment() {
    let modal = this.modalCtrl.create(AddassignmentPage, { groupid: this.batches.parent });
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.assignmentlist();
      }
    });
  }

  get_assignment() {
    if(!this.assign_flag){
             this.assign_flag =true;
            this.presentLoadingDefault();
            
            this.assignmentlist();
          }
  }
  get_discussion() {
    if(!this.discuss_flag){
       this.discuss_flag =true;
      this.presentLoadingDefault();
      this.discussions();
    }
  }

  goToSessionDetail(sessionData: any) {
    this.navCtrl.push(DiscussiondetailPage, { discussion: sessionData });
  }

  editassignment(slidingItem: ItemSliding, id: any, index: any) {
     slidingItem.close();
            let modal = this.modalCtrl.create(EditassignmentPage, { assignmentid: id });
            modal.present();
            modal.onWillDismiss((data: any[]) => {
              if (data) {
                this.assignmentlist();
              }
            });
  }

  deleteassignment(slidingItem: ItemSliding, id: any, index: any) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Do you want to delete the Assignment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            slidingItem.close();
          }
        },
        {
          text: 'Yes',
          handler: data => {
            let alertTransition = alert.dismiss();
            alertTransition.then(() => {
              slidingItem.close();

            });

               var deletedata={
               "assignmentid":id
             }           
      this.dbserviceProvider.deleteassignmentId(deletedata)
         .then(data => {
          this.assignment.splice(index, 1);
       }, error => {
        console.log(error);// Error getting the data
      });
                return false;
        }
              // this.dbserviceProvider.deleteassignment(id)
              // .then((ok) => {
              //   this.assignment.splice(index, 1);
              // }, error => {
              //   console.log(error);// Error getting the data
              // });
            // return false;
          // }
        }
      ]
    });
    alert.present();
  }

  discussions() {
     this.dbserviceProvider.getdiscusslist(this.batches.parent)
          .then(data => {
            this.disussionlist=data;
         }, error => {
            console.log(JSON.stringify(error.json()));
        });
  }

  assignmentlist() {
    this.dbserviceProvider.getassignmentlist(this.batches.project.id)
          .then(data => {
            this.assignment=data;
         }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
  }

  getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
  }

  goToassignmentDetail(item: any) {
    this.navCtrl.push(AssignmentdetailPage, { assdetail: item })
  }


  doRefresh(refresher: Refresher) {
    this.assignmentlist();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
