import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ExamquestionPage } from '../examquestion/examquestion';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-editexam',
  templateUrl: 'editexam.html',
})
export class EditexamPage {
  exam: any = {};
  submitted = false;
  courses: any;
  branches:any;
  subject:any;
  today:any;
  Batchlist: any=[];
  deleteexamcriterialist:any=[];
  examcriterialist:any=[];
  count:any;
  scorecount:any;
  questioncount:any;
  examcriteria: any;

  constructor(public alertCtrl: AlertController,public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  	this.exam=navParams.get("data")
  	console.log(this.exam)
  	this.branchlist();
  	this.subjectlist();
    this.Batcheslist();
  	this.courselist();
  	this.getexamcriteria();
  	this.scorecount=0;
    this.count=0;
    this.questioncount=0;
  	this.onSelectsubject(this.exam.SubjectId);
  	if(this.exam.BatchId == 0){
  		this.exam.checked=true;
  	}
  	else{
  		this.exam.checked=false;
      this.exam.batch=this.exam.BatchId;
  	}
    console.log(this.exam.FromDate[2])
    var t;
    var d1
    if(this.exam.FromDate[2] != ":")
    {
  	 t= this.exam.FromDate.split(" ")
    d1 = t[1].split(":");

  }
  else{
    t = this.exam.FromDate;
    d1 = t.split(":");

  }
    this.exam.FromDate = d1[0]+ ":" +d1[1]+ ":" + d1[2];
    var t2;
    var d2;
    if(this.exam.ToDate[2] != ":")
    {
     t2 = this.exam.ToDate.split(" ")
    d2 = t2[1].split(":");

  }
  else{
     t2 = this.exam.ToDate;
    d2 = t2.split(":"); 
  }
    this.exam.ToDate = d2[0]+ ":" +d2[1]+ ":" + d2[2];
  	var t1=new Date();
    var m1=t1.getMonth()+1;
    // this.examcriterialist=this.exam.examcriteria;
    for(var i=0;i< this.exam.examcriteria.length;i++)
    {
    	var data={
       "tracks":"Food",
       "color":"f54337",
       "criteria_id":0,
       "no_question":this.exam.examcriteria[i].no_question,
       "weightage":this.exam.examcriteria[i].weightage,
       "name":this.exam.examcriteria[i].criteria_id,
       "exam_id":this.exam.examcriteria[i].exam_id,
       "id":this.exam.examcriteria[i].id
    }
    this.deleteexamcriterialist.push(data)
    this.count=this.count-Number(this.exam.examcriteria[i].no_question);
     console.log(this.count)
    this.questioncount=this.questioncount-Number(this.exam.examcriteria[i].no_question);
    this.scorecount=this.scorecount+this.exam.examcriteria[i].weightage;
    }
    this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
  }

  getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
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

  ionViewDidLoad() {

    // console.log('ionViewDidLoad EditexamPage');
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
        this.count+=Number(this.exam.no_of_available_question);

        console.log(this.count)
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
        console.log(this.exam.batch)
      }
        },
      error => {
        console.log(JSON.stringify(error.json()));
      })
    }
    }

    deleteexam(data,index){
  console.log(data)
  this.count=this.count+Number(data.no_question);
  this.scorecount=this.scorecount-data.weightage;
  this.questioncount=this.questioncount+Number(data.no_question);
  this.dbserviceProvider.deleteexamcriteriagroup(data.id)
  .then(data =>{
      console.log(data)
      this.deleteexamcriterialist.splice(index,1)

    },error => {
      console.log(JSON.stringify(error.json()))
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
  if(this.exam.Maxscore != undefined && this.exam.Maxscore != "")
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
    // this.count=this.count+Number(this.exam.no_of_question);
    this.count=this.count-Number(this.exam.no_of_question);
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
  
  if(this.exam.SubjectId != undefined)
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

  branchlist() {
    this.courses = [];
    this.dbserviceProvider.getbranches()
      .then(data => {
        this.branches = data;
        console.log(data)
      }, error => {
      });
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

   courselist() {
    this.courses = [];
    this.dbserviceProvider.getcourses()
      .then(data => {
        this.courses = data;
      }, error => {
      });
  }

  save_exam(form: NgForm) {
     // for(var i=0;i<this.examcriterialist.length;i++){
     //      console.log(this.examcriterialist[i])
     //    }
    this.submitted = true;
    var batchid;
    if(this.exam.checked){
      batchid=0;
    }else{
      batchid=this.exam.BatchId;
    }
   
     if (form.valid){
        if(this.scorecount == this.exam.Maxscore){

           var st=this.exam.FromDate.split(":")
    var et=this.exam.ToDate.split(":")
     if(Number(st[0]) >= Number(et[0]) && Number(st[1]) >= Number(et[1]))
    { 
       alert("End Time is lesser or same as Start Time")
       }
    else{

    console.log(this.exam);
    var data = {
      "id":this.exam.id,
      "Title": this.exam.Title,
      "ExamType": this.exam.ExamType,
      "ChapterId": 0,
      "SectionId": 0,
      "BatchId": batchid,
      "BranchId":this.exam.BranchId,
      "CourseId":this.exam.CourseId,
      "QuestionCount": Math.abs(this.questioncount),
      "examDate":this.exam.examDate,
      "FromDate": this.exam.examDate+" "+this.exam.FromDate+":00",
      "ToDate": this.exam.examDate+" "+this.exam.ToDate+":00",
      "PassPercentage": 0,
      "NegativeMarks": 0,
      "EnableRanking": 0,
      "RankPublishingDate": null,
      "AllowRetakingExam": 0,
      "MaxAllowedRetaking": 0,      
      "Maxscore": this.exam.Maxscore,
      "SubjectId":this.exam.SubjectId,
      "CreatedBy": localStorage.staffId,
      "CreatedOn": new Date(),
      "UpdatedBy": localStorage.staffId,
      "UpdatedOn": new Date()
    }
    this.dbserviceProvider.Updateexam(data)
      .then(data => {
        console.log(data);
        var exam:any=data;
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
       
       this.dbserviceProvider.postexam_creation(data)
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
}
