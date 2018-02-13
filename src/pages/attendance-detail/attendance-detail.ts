import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,ModalController } from 'ionic-angular';
import { AttendancePage } from '../attendance/attendance';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-attendance-detail',
  templateUrl: 'attendance-detail.html',
  providers: [DBserviceProvider] 
})
export class AttendanceDetailPage {
Studentlist:any;
Studentlistitem:any;
	isCheck:any=true;
	batchid:any;
  batchnme:any;
	attendance:any;
	todaydate:any;
	ipObj1:any;
	response:any;
  studentvisible:any;
  today:any;
  absentStudentlist:any;
  constructor(public dbserviceProvider: DBserviceProvider,public modalCtrl: ModalController,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams,  public storage: Storage) {
  let item=this.navParams.get("item")
  console.log(item)
  this.batchid=item.parent;
  this.batchnme=item.parent;
  var t1=new Date();
  var m1=t1.getMonth()+1;
  this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
  this.todaydate=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
  this.studentvisible=true;
  this.getstudentlist();
  }



changedate(changedate){
   this.studentvisible=true;
        this.dbserviceProvider.getAttendance(this.batchid)
          .subscribe(data => {
            let attendanc:any=data;
            for(var i=0;i< attendanc.length;i++)
            {
              var date1=new Date(attendanc[i].attendanace_date);
            var m1=date1.getMonth()+1;
            attendanc[i].todaydate1=date1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(date1.getDate());
             if(attendanc[i].todaydate1 == changedate && attendanc[i].batch_id == this.batchid){
               this.studentvisible=false;
               this.absentstudent(attendanc[i].att_id);
            }
            }
            this.isCheck=false;
            this.resetFilters();  
            
          }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
}
 getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
  }

  ionViewDidLoad() {
      var date=new Date();
            var m=date.getMonth()+1;
            var todaydate=date.getFullYear()+"-"+m+"-"+date.getDate();
          this.dbserviceProvider.getAttendance(this.batchid)
          .subscribe(data => {
            let attendance:any=data;
            for(var i=0;i< attendance.length;i++)
            {
              var date1=new Date(attendance[i].attendanace_date);
            var m1=date1.getMonth()+1;
            attendance[i].todaydate1=date1.getFullYear()+"-"+m1+"-"+date1.getDate();
             if(attendance[i].todaydate1 == todaydate && attendance[i].batch_id == this.batchid){
                 this.studentvisible=false;
                 this.absentstudent(attendance[i].att_id);
            }  
            }
          }, error => {
            console.log(JSON.stringify(error.json()));
        });  

  	 
  }

  getstudentlist(){
    this.Studentlist = [];
    this.Studentlistitem=[];
    this.dbserviceProvider.getstudentsfrombatch(this.batchid)
      .subscribe(data => {
        console.log(data);
        let assignment: any = data.data;
        console.log(data.data);
         for (var i = 0; i < assignment.length; ++i) {
            var d = assignment[i].student;
         this.storage.set('student_name', assignment[i].student);
         localStorage.staffId=assignment[i].student;
         this.dbserviceProvider.getdetail(assignment[i].student)
      .subscribe(data => {
        console.log(data.data);
       this.Studentlistitem[i] = data.data;
 this.Studentlist.push(this.Studentlistitem[i]);
         }, error => {
        console.log(JSON.stringify(error.json()));
      });
    }
      console.log(this.Studentlist);
       }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  absentstudent(attendanceid){
    this.dbserviceProvider.getattendancestudent(attendanceid)
    .then(data =>{
      console.log(data)
      let attenstudent:any=[];
      attenstudent=data;
      console.log(attenstudent)
      for(var i = 0; i < this.absentStudentlist.length; ++i)
   {
     for(var j=0;j< attenstudent.length; ++j)
     {
       if(attenstudent[j].student_id == this.absentStudentlist[i].userid)
       {
        this.absentStudentlist[i].isChecked = false;                   
       }
     }
   }
    },
    error =>{
            console.log(JSON.stringify(error.json()));
    });
  }

  resetFilters() {
    if(this.isCheck==true)
    {
   for(var i = 0; i < this.Studentlist.length; ++i)
   {
      this.Studentlist[i].isChecked = false;
      this.isCheck=false;
   }
 }
 else{
    for(var i = 0; i < this.Studentlist.length; ++i)
   {
      this.Studentlist[i].isChecked = true;
      this.isCheck=true;
   }
 }
     }

     present(track,index){
       console.log(this.Studentlist)
       if(this.Studentlist[index].isChecked == true)
       {
       this.Studentlist[index].isChecked = false;
     }else{
       this.Studentlist[index].isChecked = true; 
     }

       this.isCheck=false;
     }

     Gotest()
{
if(this.todaydate !="" && this.todaydate != undefined)
{
this.attendance=[];
  let alert = this.alertCtrl.create({
    title: 'Alert',
    message: 'Do you really want to submit the Attendance?',
     
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: data => {
          let alertTransition = alert.dismiss();
                alertTransition.then(()=>{
  let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Attendance submit successfully',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                let alertTransition = alert.dismiss();

                alertTransition.then(()=>{
           var j=0;

                          for(var i = 0; i < this.Studentlist.length; ++i)
   {
      if(this.Studentlist[i].isChecked == false)
      {
        this.attendance[j]=this.Studentlist[i];
        j++;
      }
   }

              let postParams={
              	att_id:0,
            	attendanace_date:this.todaydate,
            	batch_id:this.batchid,
            	remarks:"",
            	task_id:"",
              total_students:this.Studentlist.length,
              total_present:this.Studentlist.length-this.attendance.length,
              total_absent:this.attendance.length,
              staff_id:localStorage.staffId 
              }
                   this.dbserviceProvider.postattendance(postParams)
                  .then(data =>{
        console.log(data);
        this.response=data;
         for(var i = 0; i < this.attendance.length; ++i)
   {
            let postParams={
              	att_id:this.response.att_id,
            	is_present:"absent",
            	student_id:this.attendance[i].userid,
            	class_id:1,
            	m_id:0
              }
                   this.dbserviceProvider.postattendancemapping(postParams)
                  .then(data =>{
              console.log(data);
        
       }, error => {
        console.log(error);// Error getting the data
      });
            }

       }, error => {
        console.log(error);// Error getting the data
      });
        console.log(this.attendance)

this.navCtrl.setRoot(AttendancePage)

                });
        

                 return false;
            }
        }]
    });
       alert.present();
                });
              
                return false;
        }
      }
    ]
  });
  alert.present();

}

else
{
	let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'please select date',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                let alertTransition = alert.dismiss();

                alertTransition.then(()=>{
                	});
        

                 return false;
            }
        }]
    });
       alert.present();
}
}

}
