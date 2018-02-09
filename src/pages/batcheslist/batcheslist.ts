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
    console.log(name);
    this.dbserviceProvider.getCurrentbatchDetail(name)
          .then(data => {
            console.log(data);
            this.Batcheslist=data;
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
