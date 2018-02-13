import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { AttendanceDetailPage } from '../attendance-detail/attendance-detail';

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
  Batchlist:any=[];
  staffid: any;
  staffimage: any;
  staffemail: any;
  name: any;
  currentdate: any;
  Isbatches:any=false;
  constructor(public dbserviceProvider: DBserviceProvider,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.Batcheslist();
    this.presentLoadingDefault();
   this.name= localStorage.staffname
    this.staffid = localStorage.staffId;
    this.staffemail = localStorage.staffemail;
     this.staffimage = localStorage.staffimagepath;
    this.currentdate=new Date();
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


Batcheslist(){
    this.dbserviceProvider.getstaffbatches(localStorage.inst_name)
            .subscribe(data => {
            console.log(data);
            console.log(data.data);
            this.Batcheslist=data.data;
            if(this.Batcheslist.length ==0)
            {
            this.Isbatches=true
          }
           
         }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
}
  ionViewDidLoad() {
    
  }

     Goattendancedetail(item){
       this.navCtrl.push(AttendanceDetailPage,{item:item});              
     }

}
