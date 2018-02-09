import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-editexamcriteria',
  templateUrl: 'editexamcriteria.html',
})
export class EditexamcriteriaPage {
  editcriteria: {name?: string, weightage?: string, id?:any} = {};
  submitted = false;
  constructor(public alertCtrl: AlertController,public viewCtrl: ViewController,public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  let examcriteria=navParams.get("examcriteriaid")
  this.getexamcriteriaid(examcriteria);	
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditexamcriteriaPage');
  }

  getexamcriteriaid(id){
  	this.dbserviceProvider.getexamcriteriaByid(id)
    .then(data => {
      console.log(data[0]);
      this.editcriteria=data[0];
      console.log(this.editcriteria);
    	},
      error => {console.log(JSON.stringify(error.json()))
    });
  }

   dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
  
  updateexamcriteriaByid(form: NgForm){
  	 this.submitted = true;
      if (form.valid){
    this.dbserviceProvider.updateexamcriteria(this.editcriteria)
    .then(data => {
      this.viewCtrl.dismiss(data);
      console.log(data);
    	},
      error => {console.log(JSON.stringify(error.json()))
    });
  }
}

}
