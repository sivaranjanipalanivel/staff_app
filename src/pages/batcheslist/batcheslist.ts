import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { BatchesPage } from '../Batches/Batches';

@IonicPage()
@Component({
  selector: 'page-batcheslist',
  templateUrl: 'batcheslist.html',
})
export class BatcheslistPage {
 Batcheslist:any; 
 Isbatches:any=false;
  constructor(public dbserviceProvider: DBserviceProvider,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
   this.batchlist();
  }

  ionViewDidLoad() {
           
  }

  batchlist(){
    let loading = this.loadingCtrl.create({
     spinner: 'bubbles',
     content: 'Loading Please Wait...'
  });
    loading.present();
    console.log(localStorage.inst_name);

    this.dbserviceProvider.getstaffbatches(localStorage.inst_name)
          .subscribe(data => {
            console.log(data);
            console.log(data.data);
            this.Batcheslist=data.data;
            if(this.Batcheslist.length ==0)
            {
            this.Isbatches=true
          }
            loading.dismiss();
         }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
  }

  Gobatchesdetail(item:any){
  	this.navCtrl.push(BatchesPage,{detail:item})
  }
}
