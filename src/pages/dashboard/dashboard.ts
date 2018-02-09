import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { BatcheslistPage } from '../batcheslist/batcheslist';
import { ExamquestionPage } from '../examquestion/examquestion';
import { SchedulePage } from '../schedule/schedule';
import { BatchesPage } from '../Batches/Batches';
import { AttendancePage } from '../attendance/attendance';
import { DatePipe } from '@angular/common'; 
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { ScheduleDetailPage } from '../schedule-detail/schedule-detail';
import { StudentlistPage } from '../studentlist/studentlist';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [DatePipe]
})
export class DashboardPage {
  staffimage: any;
  name: any;
  today_schedule: any;
  IStoday:any;
  
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams,  public dbserviceProvider: DBserviceProvider) {
    this.staffimage = localStorage.staffimagepath;
    this.name = localStorage.staffname;
    this.IStoday=true;
    this.presentLoadingDefault();
    this.dbserviceProvider.getcourseschedule(localStorage.instructor)
      .then(data => {
        this.today_schedule = data;
        console.log(this.today_schedule)
        if(this.today_schedule.length == 0)
        {
          this.IStoday=false;
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  
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
  goto_batchDetail(schdule_detail) {
    this.navCtrl.push(ScheduleDetailPage, { schdule_detail: schdule_detail });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  Gobatch() {
    this.navCtrl.setRoot(BatcheslistPage);
  }
  Goeschedule() {
    this.navCtrl.setRoot(SchedulePage);
  }

  Goattandence() {
    this.navCtrl.setRoot(AttendancePage);
  }
  Goexam() {
    this.navCtrl.setRoot(ExamquestionPage);
  }
  Gofee() {
    this.navCtrl.push(StudentlistPage);
  }

}
