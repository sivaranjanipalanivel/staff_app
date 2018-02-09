import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController,AlertController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { AddExamPage } from '../add-exam/add-exam';
import { ExamResultPage } from '../exam-result/exam-result';
import { EditexamPage } from '../editexam/editexam';

@IonicPage()
@Component({
  selector: 'page-examquestion',
  templateUrl: 'examquestion.html',
})

export class ExamquestionPage {
  Examlist: any=[];
  Isexamlist:any=false;
  pageNo=0;
  PageSize=10;
  loadMoreData=false;
  pageNos=false;
  constructor(public alertCtrl: AlertController,public dbserviceProvider: DBserviceProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
     this.dbserviceProvider.getstaffs();
     this.dbserviceProvider.getallbatches();
     this.examlist(this.pageNo,this.PageSize);
     this.presentLoadingDefault();
    //   if(this.navParams.get('data')){
    //   // var data=this.navParams.get('data');
    //   // console.log(data);
    //   this.pageNo=0;
    //   this.PageSize=10;
    //   this.examlist(this.pageNo,this.PageSize);
    // }
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

  examlist(pageNo,PageSize) {
    this.dbserviceProvider.getexams(localStorage.staffId,pageNo,PageSize)
      .then(data => {
        // console.log(data)
      let exam:any=data;
        for(var i=0;i<exam.length;i++){
            this.Examlist.push(data[i]);
      }
      if(exam.length == 0){
          this.loadMoreData=true;
      }
      this.pageNos = true;
      if(this.Examlist != undefined)
      {
      if(this.Examlist.length == 0)
      {
        this.Isexamlist=true;
      }
    }
    else{
        this.Isexamlist=true;
    }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  deleteexam(id,index){
    let alert = this.alertCtrl.create({
    title: 'Alert',
    message: 'Do you want to delete the Exam?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: data => {
          let alertTransition = alert.dismiss();
                alertTransition.then(()=>{
   
                });
             var deletedata={
               "exam_id":id
             }           
      this.dbserviceProvider.deleteexamId(deletedata)
         .then(data => {
          this.Examlist.splice(index, 1);
       }, error => {
        console.log(error);// Error getting the data
      });
                return false;
        }
      }
    ]
  });
  alert.present();
  }

  viewresult(id){
    this.navCtrl.push(ExamResultPage, {examid:id})
  }

  addexam() {
    this.navCtrl.push(AddExamPage)
  }
  
  goto_examdetail(id,data){
    this.navCtrl.push(EditexamPage,{detailid:id,data:data})
  }

  doInfinite(infiniteScroll) {
      if(this.pageNos == true)
      {
        this.pageNo=this.pageNo+10;
          this.examlist(this.pageNo,this.PageSize);
      }    
       setTimeout(() => {
      infiniteScroll.complete();   
  }, 50);    
  }

}
