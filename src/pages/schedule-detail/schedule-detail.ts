import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { ScheduleStatusPage } from '../schedule-status/schedule-status';

@IonicPage()
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {
  session: any;
  today_schedule: any;
  subjects: any;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public dbserviceProvider: DBserviceProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams) {

    this.session = this.navParams.get('schdule_detail');
    console.log(this.session)
    this.dbserviceProvider.getsubject()
      .then(data => {
        this.subjects = data;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }
  changestatus(list) {
    var pencheck=false;
    var comcheck=false;
    if(this.session.finished == 1)
    {
      comcheck=true;
  }
  else{
    pencheck=true;
  }
    let alert = this.alertCtrl.create({
      title: 'Status',
      subTitle: 'Want status to complete',
      inputs: [
         {
   type:'radio',
   label:'Pending',
   value:'0',
   checked: pencheck
 },
 {
   type:'radio',
   label:'Completed',
   value:'1',
   checked:comcheck
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
          text: 'Save',
          handler: data => {
             console.log(data)
             this.session.finished=data;
             var d=new Date(list.dateadded);
            list.dateadded=d.getFullYear()+"-"+this.getPaddedComp(d.getMonth()+1) + "-" + this.getPaddedComp(d.getDate());
            list.finished = data;
            this.dbserviceProvider.updateschedule(list)
              .then(data => {
                console.log(data);
                let schedule:any=data;
                this.session.finished=schedule.finished;
              }, error => {
                console.log(JSON.stringify(error.json()));
              });
          }
        }
      ]
    });
    alert.present();
  }
  // change_statusModal(list){
   
  //   let modal = this.modalCtrl.create(ScheduleStatusPage,{data:list});
  //     modal.present();
  //     modal.onWillDismiss((data: any[]) => {
  //       if (data) {
  //         // this.assignmentlist();
  //       }
  //     });
    
  // }

 getPaddedComp(comp) {
  return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ScheduleDetailPage');
  }

}
