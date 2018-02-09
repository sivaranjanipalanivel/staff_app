import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController,AlertController,MenuController,LoadingController,Platform } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { DashboardPage } from '../dashboard/dashboard';

var globalUrl="http://192.168.0.132:8000/"

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})

export class LoginPage {
   login: { username: string, password: string } = {
    username: '',
    password: ''
  };
  submitted = false;
  // deviceid:any;
  constructor(public platform: Platform,public dbserviceProvider: DBserviceProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public menu:MenuController,public navCtrl: NavController, public userData: UserData) {
  // this.deviceid =localStorage.staffdeviceid;
  //  this.dbserviceProvider.getdeviceId(localStorage.staffdeviceid)
  //                    .then(data => {
  //                 //var id=data[0].id
  //                 //this.deviceid =data[0].DeviceId;
  //                 var id=0
  //                 this.deviceid=0
  //         this.dbserviceProvider.deletedeviceId(id)
  //         .then(data => {
  //              localStorage.clear();
  //               localStorage.staffdeviceid =this.deviceid;
  //              // window.location.reload();
  //         },error =>{

  //         })
  //         },error =>{

  //         })
 
  // console.log(localStorage.staffdeviceid)
   }

presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 50);
}

   ionViewDidLoad() {
    this.menu.enable(false);

  }
  ionViewDidLeave(){
   this.menu.enable(true);
 }

 onLogin() {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading Please Wait...'
    });
    if(this.login.username == "" || this.login.password == ""){
      alert("The username or password fields cannot be blank");
    }
    else{ 
    loader.present().then(() => {
      this.dbserviceProvider.getLogin(this.login).subscribe(
        data => {
        console.log(data);
        
          this.dbserviceProvider.getCurrentUser().subscribe(
            data => {
              console.log(data);

              // this.storage.set('logged_user', data.message);
              this.dbserviceProvider.getCurrentUserName(data.message).subscribe(
                data => {
                  console.log(data);
                  //emailid:name;
                   localStorage.staffId=data.msg[0].name;
                      localStorage.staffname=data.msg[0].employee_name;
                      localStorage.staffemail=data.msg[0].user_id;
                      localStorage.staffstatus=data.msg[0].status;
                        localStorage.staffbranch=data.msg[0].branch;
                
                 localStorage.staffimagepath="assets/img/person.jpg";
                
                  localStorage.currusername=this.login.username;
                  localStorage.currpassword=this.login.password;
                  // console.log(localStorage.currusername)
                  // console.log(localStorage.currpassword)
                  this.dbserviceProvider.getCurrentinstructorDetail(data.data[0].user_id).subscribe(
                    data1 => {
                      console.log(data1);
     
                       localStorage.staffbatch=data1.msg[0].parent;
                       localStorage.empname=data1.msg[0].instructor;
        this.dbserviceProvider.getCurrentbatchDetail(data1.data[0].parent).subscribe(
                    data => {
                      console.log(data);
     
                       localStorage.batchstart=data.msg[0].expected_start_date;
                       localStorage.batchend=data.msg[0].expected_end_date;
                       localStorage.term=data.msg[0].academic_term;
                       localStorage.year=data.msg[0].academic_year;
                       localStorage.program=data.msg[0].program;
                       localStorage.section=data.msg[0].section;
                        localStorage.status=data.msg[0].status;
                         localStorage.course=data.msg[0].course;
                      let loading = this.loadingCtrl.create({
                  spinner: 'bubbles',
                  content: 'Loading Please Wait...'
                  });
                  loading.present();
                  
                  this.navCtrl.setRoot(DashboardPage);
                     
                    },
                    err => {
                      console.error(err);
                      loader.dismiss();
                      }
                  )
             
                  loader.dismiss();    
                    },
                    err => {
                      console.error(err);
                      loader.dismiss();
                      }
                  )
             
                  loader.dismiss();
                },
                err => {
                  console.error(err);
                  alert('Check Email/Password');
                  loader.dismiss();
                }
              )


              loader.dismiss();
            },
            err => {
              console.error(err);
              // alert(err);
              alert('Check Email/Password');
              
              loader.dismiss();
            }
          )

          loader.dismiss();
        },
        err => {
          console.error(err);
          // alert(err);
          alert('Check Email/Password');
          
          loader.dismiss();
        }
      )
    });
  }
  }

//  alert(condition:any){
//       let tit: string;
//       let subTit: string;
//       switch (condition) {
//               case "Invalid Email":
//               tit='Alert';
//               subTit='Invalid Email';
//               break;
//                case "Password wrong !":
//               tit='Alert';
//               subTit='Password wrong !';
//               break;
//               case "Please vaild User":
//               tit='Alert';
//               subTit='Please vaild User';
//               break;
//       }
//       let alert = this.alertCtrl.create({
//           title: tit,
//           subTitle: subTit,
//           buttons: [
//             {
//               text: 'OK',
//               handler: () => {
//                 let alertTransition = alert.dismiss();
//                 alertTransition.then(()=>{
//                 });
//                 return false;
//             }
//         }]
//     });
//        alert.present();
//   }
 }