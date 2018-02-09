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
  pet: any;
  branchname: any;
  billingcountryname: any;
  shillingcountryname: any;
  batchname: any;
  degreename: any;
  academicyear: any;
  guardians: any;
  studentdetail: any;
  firstname: any;
  Profileimage: any;
  lastname: any;
  middle_name: any;
  userid: any;
  stu: any;
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
    this.middle_name = "";
    this.lastname = "";
    this.batchname = "";
    this.branchname = "";
    this.Profileimage = "";
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
    this.DBservice.getcontact(this.studentdetail.userid)
      .then(data => {
        var t1 = new Date(data[0].user.app_date);
        var m1 = t1.getMonth() + 1;
        data[0].app_date1 = t1.getFullYear() + "-" + this.getPaddedComp(m1) + "-" + this.getPaddedComp(t1.getDate());
        var t = new Date(data[0].user.date_of_birth);
        var m = t.getMonth() + 1;
        data[0].date_of_birth = t.getFullYear() + "-" + this.getPaddedComp(m) + "-" + this.getPaddedComp(t.getDate());
        this.studentprofile = data[0];
        this.firstname = this.studentprofile.firstname;
        this.Profileimage = this.studentprofile.user.upload_photo_choose_file;
        this.userid = this.studentprofile.userid;
        this.middle_name = this.studentprofile.middle_name;
        this.lastname = this.studentprofile.lastname;
       
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
    if(!this.guar_flag)
    this.DBservice.getguardians(this.studentdetail.userid)
    .then(data => {
      this.guardians = data;
      this.guar_flag =true;
      
      // console.log(this.guardians)
    }, error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  iovoicelist() {
    if(!this.invoi_flag)
      this.presentLoadingDefault();
    this.DBservice.getinvoicelist(this.studentdetail.userid)
      .then(data => {
        this.invoice = data;
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
      
    this.DBservice.getcountry(this.studentprofile.user.billing_country)
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
