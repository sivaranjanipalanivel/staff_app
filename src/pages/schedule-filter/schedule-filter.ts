import { Component } from '@angular/core';
import { NavParams, ViewController,AlertController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];
  subject:any;
  description:any;
  Visible:any=true;
  groupid:any;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public dbserviceProvider: DBserviceProvider
  ) {
    this.groupid=navParams.get("groupid")

  }

  adddiscussion(){
    console.log(this.subject)
    console.log(this.description)
    console.log(this.Visible)
     if(this.subject != undefined && this.subject != ''){
    
              let postParams={
                id:0,
                subject: this.subject,
                description:this.description || " ",
                datecreated: new Date(),
                last_activity: new Date(),
                show_to_customer:this.Visible,
                project_id:this.groupid,
                staff_id:localStorage.staffId,
                contact_id:0
              }
               this.dbserviceProvider.postdiscussions(postParams)
          .then(data => {
            this.viewCtrl.dismiss(data);
         }, error => {
            console.log(JSON.stringify(error.json()));
        });  
    }
    else{
                  this.alert("vaildsubject");

    }

    
  }

  alert(condition:any){
      let tit: string;
      let subTit: string;

      switch (condition) {
        
  
               case "vaildsubject":
              tit='Alert';
              subTit='This Subject field is required';
              break;
      }
      let alert = this.alertCtrl.create({
          title: tit,
          subTitle: subTit,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                let alertTransition = alert.dismiss();
                alertTransition.then(()=>{
                  // this.navCtrl.pop();
                });
               
                return false;
            }
        }]
    });
       alert.present();
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
