import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { FeeDetailPage } from '../fee-detail/fee-detail';

@IonicPage()
@Component({
  selector: 'page-studentview',
  templateUrl: 'studentview.html',
})
export class StudentviewPage {
  studentprofile: any;
  studentguard:any;
  guard:any;
  pet: any;
  branchname: any;
  billingcountryname: any;
  shillingcountryname: any;
 
 
  academicyear: any;
  guardians: any;
  studentdetail: any;
  firstname: any;
  userid: any;
  stu: any;
  studentacademicprofile:any;
  coursedetails:any;
  guar_flag: any;
  invoi_flag: any;
  cou_flag: any;
  visible: any = true;
  invoice: any = [];
  Isinvoice:any=false;
  constructor(public loadingCtrl: LoadingController, public DBservice: DBserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.studentdetail = this.navParams.get("student")
    console.log(this.studentdetail)
    // localStorage.studentdetail=this.navParams.get("student");
    this.pet = this.navParams.get("pet");
    if(this.pet == "fee"){
    this.iovoicelist();
    }
    else{
    this.presentLoadingDefault();      
    }
    this.stu = "students";
    this.firstname = "";
    this.branchname = "";
    this.userid = "";
    this.guar_flag =false;
    this.invoi_flag =false;
    this.cou_flag =false;
    this.getprofile();
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

  getprofile() {
    this.DBservice.getcontact(this.studentdetail.name)
      .subscribe(data => {
        this.studentprofile = data.data[0];
        this.firstname = this.studentprofile.first_name;
        this.userid = this.studentprofile.name;
        console.log(this.studentprofile);
        this.DBservice.getacademicdetails(this.studentdetail.name)
      .subscribe(data => {
        this.studentacademicprofile = data.data[0];
        console.log(this.studentacademicprofile);
     this.DBservice.getcoursedetails(this.studentdetail.name)
      .subscribe(data => {
   
        this.coursedetails=data.data[0];
        console.log(this.coursedetails);
        }, error => {
        console.log(JSON.stringify(error.json()));
      });
        }, error => {
        console.log(JSON.stringify(error.json()));
      });
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }
  getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
  }

  feeList() {

    this.iovoicelist();



  }
  addressList() {
    // this.stu="fee";
    this.addresslist();


    // this.visible=false;
  }
  studentList() {
    this.visible = true;
  }
  guardianList() {
   
    this.DBservice.getgaurdian(this.studentdetail.name)
    .subscribe(data => {
      this.guardians = data.data;
     console.log(this.guardians);
       this.DBservice.getgaurdiandetails(data.data[0].guardian)
    .subscribe(data => {
      console.log(data.data);
      this.guard = data.data;
     
      
      // console.log(this.guardians)
    }, error => {
      console.log(JSON.stringify(error.json()));
    });
      // console.log(this.guardians)
    }, error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  iovoicelist() {
    if(!this.invoi_flag)
      this.presentLoadingDefault();
    this.DBservice.getinvoicelist(this.studentdetail.name)
      .subscribe(data => {
        var t2=new Date();
        this.invoice = data.data;
        console.log(this.invoice);
        this.invoi_flag =true;
        if(this.invoice.length == 0){
          this.Isinvoice=true;
        }
        console.log(this.invoice)
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  GopaymentDetail(fee){
     this.navCtrl.push(FeeDetailPage,{FeeDetail: fee, student:this.studentdetail});
  }
  addresslist() {
    if(!this.cou_flag)
      
    this.DBservice.getcountry(this.studentprofile)
      .then(data => {
        this.billingcountryname = data[0];
        this.shillingcountryname = data[0];
        this.cou_flag =true;
        
        // console.log(this.billingcountryname)
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    
  }
}
