import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';


@IonicPage()
@Component({
  selector: 'page-schedule-status',
  templateUrl: 'schedule-status.html',
})
export class ScheduleStatusPage {
  session: any;
  description: any ={};
  admin_schedule: any = {};
  today_schedule: any;
  subjects: any;
  comments:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbserviceProvider: DBserviceProvider, public viewCtrl: ViewController) {
    this.admin_schedule= this.navParams.get('data');
    
    this.dbserviceProvider.getsubject()
      .then(data => {
        // let sched: any = data;
        this.subjects = data;
        // console.log(this.today_schedule);



      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleStatusPage');
  }
 
  save_schedule(dec){
  console.log(dec)
   console.log(this.admin_schedule)
    this.admin_schedule.finished = 1;
    this.admin_schedule.description = this.admin_schedule.description + ' <br> <br>  ' + this.comments;
    this.dbserviceProvider.updateschedule(this.admin_schedule)
      .then(data => {
        console.log(data);
        this.viewCtrl.dismiss(data);
    
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

}
