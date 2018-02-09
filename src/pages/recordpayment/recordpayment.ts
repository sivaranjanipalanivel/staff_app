import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';


@IonicPage()
@Component({
  selector: 'page-recordpayment',
  templateUrl: 'recordpayment.html',
})
export class RecordpaymentPage {
	record:any={};
  submitted = false;
	paymentsmode:any=[];
  today:any;
  dueamount:any;
  constructor(public dbserviceProvider: DBserviceProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
   this.paymentmodelist();
  this.record.amount=navParams.get("Amount")
  this.dueamount=navParams.get("Amount")
  this.record.invoice=navParams.get("invoice_id")
  this.record.fee_id=navParams.get("feeid")
  console.log(navParams.get("feeid"))
  var t1=new Date();
  var m1=t1.getMonth()+1;
  this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
  this.record.date=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());

  }

  ionViewDidLoad() {
  }

  getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
  }

  dismiss(data?: any){
  	this.viewCtrl.dismiss(data);
  }

  paymentmodelist() {
    this.dbserviceProvider.getpaymentmode()
      .then(data => {
        this.paymentsmode = data;
        console.log(data)
      }, error => {
      });
  }
  onSelectpaymentsmode(event){
    console.log(event)
  }
  save_recod(form: NgForm){
    this.submitted = true;
    console.log(this.record)
      if (form.valid){
          if(this.dueamount >= this.record.amount){
        if(this.record.payment != undefined && this.record.payment != ''){
    console.log(this.record)
        
        var paymentdata={
          "id":0,
          "invoiceid":this.record.invoice,
          "amount":this.record.amount,
          "paymentmode":this.record.payment,
          "date":this.record.date,
          "daterecorded":new Date(),
          "note":this.record.description,
          "addedfrom":localStorage.staffId,
          "transactionid":""
        }
         this.dbserviceProvider.addinvoicepaymentrecords(paymentdata)
         .then(data => {
             console.log(data)
             let payment:any=data;
             var feedata={
               "fee_schedule_id":this.record.fee_id,
               "status":1,
               "payment_id":this.record.payment,
               "invoice_id":this.record.invoice
             }
              this.dbserviceProvider.Updatefee_schedule(feedata)
             .then(data => {
             console.log(data)
              this.viewCtrl.dismiss(payment);
            },
          error => {
            console.log(JSON.stringify(error.json()));
         });


           },
          error => {
            console.log(JSON.stringify(error.json()));
         });
      }
    }
    else{
      alert("The amount is greater than invoice amount")
    }
    }
  }
}
