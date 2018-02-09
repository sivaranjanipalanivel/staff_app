import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { RecordpaymentPage } from '../recordpayment/recordpayment';


@IonicPage()
@Component({
  selector: 'page-fee-detail',
  templateUrl: 'fee-detail.html',
})
export class FeeDetailPage {
Feedetail:any;
   payments:any=[];
   invoice:any=[];
   invoicecheck:any;
   dueamount:any;
   studentdetail:any;
  constructor(public modalCtrl: ModalController,public loadingCtrl: LoadingController,public DBservice:DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  	 this.Feedetail = navParams.get("FeeDetail");
  	console.log(navParams.get("FeeDetail"))
    this.studentdetail=navParams.get("student")
    console.log(this.studentdetail)
    this.getpaymentId();
    this.invoicecheck=false;
    this.presentLoadingDefault();
  }

  ionViewDidLoad() {
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

   getpaymentId()
 {
     if(this.Feedetail.invoice_id != undefined || this.Feedetail.invoice_id != null){
       this.DBservice.getpaymentId(this.Feedetail.invoice_id)
        .then(data => {
        this.payments=data;
        this.dueamount=0;
        for(var i=0; i < this.payments.length;i++)
        {
          this.dueamount=this.dueamount+this.payments[i].amount;
          this.invoice=this.payments[i].invoice;
          this.invoicecheck=true;
          console.log(this.invoice)
        }
        if(this.payments.length != 0)
        {   
        this.dueamount=this.invoice.total-this.dueamount;
        console.log(this.dueamount)
      }

      if(!this.invoicecheck){
      	this.DBservice.getinvoiceId(this.Feedetail.invoice_id)
      	.then(data =>{
      		this.invoice=data[0];
      	}, error => {
            console.log(JSON.stringify(error.json()));
        })
      
      }
        console.log(data)        
        }, error => {
            console.log(JSON.stringify(error.json()));
        });  
        }
      else{
        this.DBservice.getinvoicenumber()
        .then(data =>{
          this.Feedetail.number=data[0].value;

          this.DBservice.getinvoiceyear()
        .then(data =>{
          this.Feedetail.year=data[0].value;
          this.DBservice.getcourse(this.studentdetail.course_id)
        .then(data =>{
          this.Feedetail.coursename=data[0].description;
          this.Feedetail.degree_id=data[0].degree_id;
          console.log(this.Feedetail.coursename)
           var invoicesdata={
          "addedfrom":localStorage.staffId,
          "adjustment":null,
          "adminnote":"",
          "allowed_payment_modes":"a:0:{}",
          "billing_city": null,
          "billing_country": null,
          "billing_state": null,
          "billing_street": null,
          "billing_zip": null,
          "branch_id": localStorage.staffbranch_id,
          "degree": null,
          "clientid": this.Feedetail.user_id,
          "clientnote": "",
          "currency": 1,
          "date": "2017-07-28T00:00:00.000Z",
          "datecreated": "2017-07-28T17:53:34.000Z",
          "datesend": null,
          "discount_percent": "0",
          "discount_total": "0",
          "discount_type": "",
          "duedate": this.Feedetail.due_date,
          "id":0,
          "include_shipping": 0,
          "is_recurring_from": null,
          "last_overdue_reminder": null,
          "last_recurring_date": null,
          "number": this.Feedetail.number,
          "project_id": this.studentdetail.group_id,
          "recurring": 0,
          "sale_agent": 0,
          "sent": 0,
          "shipping_city": null,
          "shipping_country": null,
          "shipping_state": null,
          "shipping_street": null,
          "shipping_zip": null,
          "show_quantity_as": 1,
          "show_shipping_on_invoice": 1,
          "status": 1,
          "subtotal": this.Feedetail.amount,
          "terms": "",
          "token": null,
          "total": this.Feedetail.amount,
          "total_tax": "0",
          "year": this.Feedetail.year,
          "hash": ""
        }
        console.log(invoicesdata)
        this.DBservice.postinvoice(invoicesdata)
        .then(data =>{
          console.log(data)
          let invoices:any=data;
          this.Feedetail.invoice_id=invoices.id;
          var invoiceitemlist={
           "description": this.Feedetail.coursename,
           "id": 0,
          "invoiceid": invoices.id,
          "item_order": null,
          "long_description": this.Feedetail.term_id,
          "qty": 1,
          "rate": this.Feedetail.amount,
          "degree_id": this.Feedetail.degree_id
          }
          this.DBservice.postinvoiceitems(invoiceitemlist)
        .then(data =>{
          console.log(data)
          var feedata={
               "fee_schedule_id":this.Feedetail.fee_schedule_id,
               "status":1,
               "invoice_id":this.Feedetail.invoice_id
             }
              this.DBservice.Updatefee_schedule(feedata)
             .then(data => {
             console.log(data)
          this.getpaymentId();
            },
          error => {
            console.log(JSON.stringify(error.json()));
         });
        }, error => {
            console.log(JSON.stringify(error.json()));
        })

        }, error => {
            console.log(JSON.stringify(error.json()));
        })
          
        }, error => {
            console.log(JSON.stringify(error.json()));
        })

          console.log(this.Feedetail.year)
        }, error => {
            console.log(JSON.stringify(error.json()));
        })

          console.log(this.Feedetail.number)
        }, error => {
            console.log(JSON.stringify(error.json()));
        })

        

        

        // if(this.Feedetail.due_date )
       

      }
 }

 Gofee(){
     let modal = this.modalCtrl.create(RecordpaymentPage,{Amount: this.dueamount, invoice_id:this.Feedetail.invoice_id, feeid:this.Feedetail.fee_schedule_id});
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        console.log(data)
        this.getpaymentId();
        // this.payments.push(data);
        let invoice:any= data;
        let amount=this.dueamount - invoice.amount;
        if(amount == 0){
          var invoicedata={
            "id":invoice.invoiceid,
            "status":2
          }
          this.DBservice.Updateinvoice(invoicedata)
          .then(data =>{
          console.log(data)
          let status:any=data;
          this.invoice.status=status.status
           }, error => {
            console.log(JSON.stringify(error.json()));
        });
        }
        else if(amount != 0)
        {
          var invoicedata={
            "id":invoice.invoiceid,
            "status":3
          }
          this.DBservice.Updateinvoice(invoicedata)
          .then(data =>{
          console.log(data)
          let status:any=data;
          this.invoice.status=status.status
           }, error => {
            console.log(JSON.stringify(error.json()));
        });
        }
      }
    });
 }

}
