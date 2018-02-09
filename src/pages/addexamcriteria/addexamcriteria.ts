import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-addexamcriteria',
  templateUrl: 'addexamcriteria.html',
})
export class AddexamcriteriaPage {
  addcriteria: {name?: string, weightage?: string} = {};
  submitted = false;

  constructor(public alertCtrl: AlertController,public viewCtrl: ViewController,public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddexamcriteriaPage');

  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
  
  addexamcriteria(form: NgForm){
  	 this.submitted = true;
      if (form.valid){
  		 let postParams={
  		   id:0,	
         name:this.addcriteria.name,
         weightage:this.addcriteria.weightage
    }
    this.dbserviceProvider.addexamcriteria(postParams)
    .then(data => {
      this.viewCtrl.dismiss(data);
      console.log(data);
    	},
      error => {console.log(JSON.stringify(error.json()))
    });
  }
} 
}
