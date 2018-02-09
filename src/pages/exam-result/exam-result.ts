import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';


@IonicPage()
@Component({
  selector: 'page-exam-result',
  templateUrl: 'exam-result.html',
})
export class ExamResultPage {
  examresult:any;
  Isexamresult:any=false;
  examid:any;
  constructor(public loadingCtrl: LoadingController,public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  	this.examid=navParams.get("examid");
  	this.examreult();
  }

  ionViewDidLoad() {

  }

  examreult(){
  	 let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading Please Wait...'
    });

    loading.present();
     this.dbserviceProvider.getexamresultId(this.examid)
      .then(data => {
        this.examresult = data;
        console.log(this.examresult)
      loading.dismiss();
      if(this.examresult != undefined)
      {
      if(this.examresult.length == 0)
      {
        this.Isexamresult=true;
      }
    }
    else{
        this.Isexamresult=true;
    }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

}
