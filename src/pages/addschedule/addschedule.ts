import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { SchedulePage } from '../schedule/schedule';

/**
 * Generated class for the AddschedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addschedule',
  templateUrl: 'addschedule.html',
})
export class AddschedulePage {
  schedule: any = {};
  Batchlist: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbserviceProvider: DBserviceProvider) {


   
    this.Batcheslist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddschedulePage');
  }
  Batcheslist() {
    this.Batchlist = [];
    this.dbserviceProvider.getstaffbatcheslist(localStorage.staffId)
      .then(data => {
        this.Batchlist = data;
      },
      error => {
      })

  }
  save_schedule() {
   
    this.schedule.course_id =1;
    this.schedule.repeat_type =1;
    this.schedule.subject_id =1;
    this.schedule.repeat_value =0;
    this.schedule.finished =0;
    this.schedule.dateadded =this.schedule.start_time;
    this.schedule.staff_id =localStorage.staffId;
    this.dbserviceProvider.addschedule(this.schedule)
      .then(data => {
        this.navCtrl.setRoot(SchedulePage);

      }, error => {
      });
    }
  edit_schedule() {
    this.dbserviceProvider.addschedule(this.schedule)
      .then(data => {

      }, error => {
      });
    }
  delete_schedule() {
    this.dbserviceProvider.deleteschedule(this.schedule)
      .then(data => {

      }, error => {
      });
  }

}
