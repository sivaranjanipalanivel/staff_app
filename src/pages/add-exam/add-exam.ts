import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { ExamquestionPage } from '../examquestion/examquestion';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-exam',
  templateUrl: 'add-exam.html',
})
export class AddExamPage {
  examname: any;
  noofquestion: any;
  maximumscore: any;
  duration: any;
  startdate: any;
  enddate: any;
  pet: any;
  course: any;
  exam: any = {};
  courses: any;
  branches:any;
  Batchlist: any;
  examiners: any;
  supervisors: any;
  examcriteria: any;
  submitted = false;
  subject:any;
  today:any;
  examcriterialist:any=[];
  count:any;
  scorecount:any;
  questioncount:any;

  constructor(public dbserviceProvider: DBserviceProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.pet = "Exam";
    this.courselist();
    this.branchlist();
    this.exam.checked=true;
    this.Batcheslist();
    this.getstaffs();
    this.subjectlist();
    this.getexamcriteria();
    this.scorecount=0;
    this.questioncount=0;
    var t1=new Date();
    var m1=t1.getMonth()+1;
    this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
  }

  getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
  }
  ionViewDidLoad() {

  }
  examlist() {
    this.pet = "Exam";
  }

  courselist() {
    this.courses = [];
    this.dbserviceProvider.getcourses()
      .then(data => {
        this.courses = data;
      }, error => {
      });
  }

  clickbatch(cheked){
  console.log(cheked)
  this.Batcheslist();
  // this.subjectlist();
}
onSelectsubject(event){
  this.dbserviceProvider.getquestionId(event)
      .then(data => {
        let questioncount:any=data;
        this.exam.no_of_available_question = questioncount.length;
       this.count=this.exam.no_of_available_question;
        console.log(data)
      }, error => {
      });
}
   branchlist() {
    this.courses = [];
    this.dbserviceProvider.getbranches()
      .then(data => {
        this.branches = data;
        console.log(data)
      }, error => {
      });
  }
  getexamcriteria() {
    this.examcriteria = [];
    this.dbserviceProvider.getexamcriteria()
      .then(data => {
        this.examcriteria = data;
        console.log(this.examcriteria)
      }, error => {
      });
  }

  onSelectChange(event){
    this.Batcheslist();
    console.log(event)
    this.dbserviceProvider.getsubjectId(event)
      .then(data => {
        this.subject=data;
         },
      error => {
        console.log(JSON.stringify(error.json()));
      })
  }

  onSelectbranch(event){
    console.log("branch"+event)
    this.Batcheslist();
  }

  getstaffs() {

    this.dbserviceProvider.getstaffs()
      .then(data => {
        this.supervisors = data;
        this.examiners = data;
      }, error => {
      });
  }
  Batcheslist() {
    if(this.exam.branch != undefined && this.exam.course != undefined)
    {
    this.Batchlist = [];
    this.dbserviceProvider.getstaffbatchesId(localStorage.staffId,this.exam.branch,this.exam.course)
      .then(data => {
        let batch:any=[];
        batch=data;
        for(var i=0;i< batch.length;i++)
        {
          if(batch[i].project){
              this.Batchlist.push(batch[i])            
          }
        console.log("Batch"+data)
      }
      },
      error => {
        console.log(JSON.stringify(error.json()));
      })
    }
    else{
      this.Batchlist = [];
    this.dbserviceProvider.getstaffbatcheslist(localStorage.staffId)
      .then(data => {
          let batch:any=[];
        batch=data;
        for(var i=0;i< batch.length;i++)
        {
          if(batch[i].project){
              this.Batchlist.push(batch[i])            
          }
        console.log("Batch"+data)
      }
        },
      error => {
        console.log(JSON.stringify(error.json()));
      })
    }
    }

  subjectlist(){
     this.dbserviceProvider.getsubject()
      .then(data => {
        this.subject=data;
         },
      error => {
        console.log(JSON.stringify(error.json()));
      })
  }
deleteexamcriteria(data,index){
  console.log(data)
  this.count=this.count+Number(data.no_question);
  this.scorecount=this.scorecount-data.weightage;
  this.questioncount=this.questioncount+Number(data.no_question);
  this.examcriterialist.splice(index,1)
}
add_examcriteria(){
  if(this.exam.criteria != undefined && this.exam.criteria != "" && this.exam.no_of_question != undefined && this.exam.no_of_question != "" && this.exam.score != undefined){
  if(this.exam.maximumscore != undefined && this.exam.maximumscore != "")
  {
  if(Number(this.exam.no_of_question) <= this.count)
  {
    var data={
       "tracks":"Food",
       "color":"f54337",
       "criteria_id":this.exam.criteria,
       "no_question":this.exam.no_of_question,
       "weightage":this.exam.score,
       "name":this.exam.criterianame
    }
    this.examcriterialist.push(data)
    this.count=this.count-this.exam.no_of_question;
    this.questioncount=this.questioncount+Number(this.exam.no_of_question);
    this.scorecount=this.scorecount+this.exam.score;
    console.log(this.scorecount)
    this.exam.criteria="";
    this.exam.no_of_question="";
    this.exam.score="";
  }
  else{
    alert("You cannot enter the no.of question more than total available questions")
  }
}
else{
    alert("You cannot enter the score more than total exam score")
}
}
else{
  alert("Please select Question type fileds");
}
}

onSelectCriteria(event){
  console.log(event)
  
  if(this.exam.suject != undefined)
  {

  }
  else{
    this.exam.criteria=" ";
    alert("Please select the subject first");
  }
}

valuescore(value){
  console.log(value)
 this.exam.maximumscore=value;
}

valuechange(value){
  console.log(value)
 this.exam.no_of_question=value;
  if(this.exam.criteria != undefined && this.exam.criteria != 0)
  {
    this.dbserviceProvider.getexamcriteriaByid(this.exam.criteria)
    .then(data =>{
      console.log(data)
      let score=data[0]
      this.exam.criterianame=score.name;
      this.exam.score=this.exam.no_of_question * score.weightage;
    },error => {
      console.log(JSON.stringify(error.json()))
      })
    // console.log("no.of question"+this.exam.no_of_question)
  }
  console.log(this.exam.criteria)
}

  save_exam(form: NgForm) {
   
    this.submitted = true;
    var batchid;
    if(this.exam.checked){
      batchid=0;
    }else{
      batchid=this.exam.batch;
    }
   
     if (form.valid){
        if(this.scorecount == this.exam.maximumscore){
         var st=this.exam.starttime.split(":")
    var et=this.exam.endtime.split(":")
     if(Number(st[0]) >= Number(et[0]) && Number(st[1]) >= Number(et[1]))
    { 
       alert("End Time is lesser or same as Start Time")
       }
    else{
     
    
    console.log(this.exam);
    var data = {
      "Title": this.exam.examname,
      "ExamType": this.exam.type,
      "ChapterId": 0,
      "SectionId": 0,
      "BatchId": batchid,
      "BranchId":this.exam.branch,
      "CourseId":this.exam.course,
      "QuestionCount": this.questioncount,
      "examDate":this.exam.examdate,
      "FromDate": this.exam.examdate+" "+this.exam.starttime+":00",
      "ToDate": this.exam.examdate+" "+this.exam.endtime+":00",
      "PassPercentage": 0,
      "NegativeMarks": 0,
      "EnableRanking": 0,
      "RankPublishingDate": null,
      "AllowRetakingExam": 0,
      "MaxAllowedRetaking": 0,      
      "Maxscore": this.exam.maximumscore,
      "SubjectId":this.exam.suject,
      "CreatedBy": localStorage.staffId,
      "CreatedOn": new Date(),
      "UpdatedBy": localStorage.staffId,
      "UpdatedOn": new Date()
    }
    this.dbserviceProvider.addexam(data)
      .then(data => {
        console.log(data);
        var exam:any=data;
          exam.notice=1;
        for(var i=0;i<this.examcriterialist.length;i++){
          console.log(this.examcriterialist[i].name)
          var examcriteria={
         "id":0,
         "criteria_id":this.examcriterialist[i].name,
         "exam_id":exam.id,
         "no_question":this.examcriterialist[i].no_question,
         "weightage":this.examcriterialist[i].weightage
       }
       console.log(examcriteria)
         this.dbserviceProvider.postexamcriteriagroup(examcriteria)
      .then(datas => {
        console.log(datas);
         },
      error => {
        console.log(JSON.stringify(error.json()));
      })
        }
       
       this.dbserviceProvider.postexam_creation(exam)
      .then(data1 => {
        console.log(data1);
         },
      error => {
        console.log(JSON.stringify(error.json()));
      })
        this.navCtrl.setRoot(ExamquestionPage,{data:data});
      },
      error => {
        console.log(JSON.stringify(error.json()));
      })
   }
      }
  else{
    alert("The calculated mark is less than  the maximum score given")
  }
    }
  }
  clickedRow(time) {
    this.duration = time;
    console.log(time)
  }
  onChange() {

  }

  prev() {
    this.pet = "Exam";

  }

   dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  alert(condition: any) {
    let tit: string;
    let subTit: string;

    switch (condition) {


      case "vaildsubject":
        tit = 'Alert';
        subTit = 'This all field is required';
        break;
    }
    let alert = this.alertCtrl.create({
      title: tit,
      subTitle: subTit,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let alertTransition = alert.dismiss();
            alertTransition.then(() => {
              // this.navCtrl.pop();
            });

            return false;
          }
        }]
    });
    alert.present();
  }

}
