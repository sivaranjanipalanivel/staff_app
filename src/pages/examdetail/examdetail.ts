import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { ExamschedulePage } from '../examschedule/examschedule';

@IonicPage()
@Component({
  selector: 'page-examdetail',
  templateUrl: 'examdetail.html',
})
export class ExamdetailPage {
  examdetail:any ={};
  today:any;
  subject:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbserviceProvider: DBserviceProvider) {
    var t1=new Date();
    var m1=t1.getMonth()+1;
    this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
    this.getexamschedule();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ExamdetailPage');
    this.examdetail=this.navParams.get('data');
    // var startdate=this.examdetail.StartDate.split(" ");
    // this.examdetail.StartDate=startdate[1];
    // var enddate=this.examdetail.EndDate.split(" ");
    // this.examdetail.EndDate=enddate[1];
    console.log(this.examdetail)
  }
   getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
  }

  getexamschedule(){
this.dbserviceProvider.getstaffs()
    .then(data =>{
      this.subject=data;
      console.log(data)
    }, error => {
      console.log(JSON.stringify(error.json()));
      });
  }
     onSelectChange(event){
       console.log(event)
  }

  onSelectexam(event){
    console.log(event)
  }

  save_examschedule(){
    console.log(this.examdetail)
    var data={
      "id":this.examdetail.id,
      "exam_id":this.examdetail.exam_id,
      "batch_id":this.examdetail.batch_id,
      "ExamDate":this.examdetail.ExamDate,
      "StartDate":this.examdetail.ExamDate +" "+this.examdetail.StartDate,
      "EndDate":this.examdetail.ExamDate +" "+this.examdetail.EndDate,
      "supervisor_id":this.examdetail.supervisor_id,
      "examiner_id":this.examdetail.examiner_id,
      "room_no":this.examdetail.room_no  
    }
    this.dbserviceProvider.patchtblexam_schedules(data)
    .then(data =>{
      console.log(data)
      this.navCtrl.setRoot(ExamschedulePage,{data:data});
    }, error => {
      console.log(JSON.stringify(error.json()));
      });

  }

  }
