import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,LoadingController,AlertController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { EditexamcriteriaPage } from '../editexamcriteria/editexamcriteria';
import { AddexamcriteriaPage } from '../addexamcriteria/addexamcriteria';

@IonicPage()
@Component({
  selector: 'page-examcriteria',
  templateUrl: 'examcriteria.html',
})
export class ExamcriteriaPage {
 examcriterialist:any;
  constructor(public alertCtrl: AlertController,public modalCtrl: ModalController,public loadingCtrl: LoadingController,public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
   this.presentLoadingDefault();
   this.examcriteria();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ExamcriteriaPage');
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

examcriteria(){
	  this.dbserviceProvider.getexamcriteria()
          .then(data => {
    		this.examcriterialist=data;
            console.log(this.examcriterialist)        
         }, error => {
            console.log(JSON.stringify(error.json()));
        });
}

deleteexamcriteria(item,index){
	// console.log(index)
	let alert = this.alertCtrl.create({
    title: 'Alert',
    message: 'Do you want to delete the Examcriteria?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: data => {
          let alertTransition = alert.dismiss();
                alertTransition.then(()=>{
   
                });
                        
      this.dbserviceProvider.deleteexamcriteria(item.id)
         .then(data => {
        this.examcriterialist.splice(index, 1);
       }, error => {
        console.log(error);// Error getting the data
      });
                return false;
        }
      }
    ]
  });
  alert.present();
}

editexamcriteria(item){
	console.log(item)
	 let modal = this.modalCtrl.create(EditexamcriteriaPage, {examcriteriaid:item.id});
     modal.present();
     modal.onWillDismiss((data: any[]) => {
      if (data) {
       this.examcriteria();
      }
    });
}

addexamcriteria(){
	let modal = this.modalCtrl.create(AddexamcriteriaPage);
     modal.present();
     modal.onWillDismiss((data: any[]) => {
      if (data) {
       this.examcriteria();
      }
    });
}

}
