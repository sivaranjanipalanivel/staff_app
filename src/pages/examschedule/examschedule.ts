import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { ExamdetailPage } from '../examdetail/examdetail';

@IonicPage()
@Component({
  selector: 'page-examschedule',
  templateUrl: 'examschedule.html',
})
export class ExamschedulePage {
  Examschedulelist:any=[];
  Isexamlist:any=false;
  pageNo=0;
  PageSize=10;
  loadMoreData=false;
  pageNos=false;
  constructor(public dbserviceProvider: DBserviceProvider,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  	this.examschedulelist(this.pageNo,this.PageSize);
    this.presentLoadingDefault();
    // if(this.navParams.get('data')){
    //   var data=this.navParams.get('data');
    //   console.log(data);
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
 examschedulelist(pageNo,PageSize) {
   
    this.dbserviceProvider.getexamscheduleId(pageNo,PageSize)
      .then(data => {
        let exam:any=data;
        for(var i=0;i<exam.length;i++){
            this.Examschedulelist.push(data[i]);
      }
      if(exam.length == 0){
          this.loadMoreData=true;
      }
      this.pageNos = true;
      if(this.Examschedulelist != undefined)
      {
      if(this.Examschedulelist.length == 0)
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

  goto_examdetail(id,data){
    console.log(data)
    this.navCtrl.push(ExamdetailPage,{detailid:id,data:data})
  }

   doInfinite(infiniteScroll) {
      if(this.pageNos == true)
      {
        this.pageNo=this.pageNo+10;
          this.examschedulelist(this.pageNo,this.PageSize);
      }    
       setTimeout(() => {
      infiniteScroll.complete();   
  }, 50);    
  }
}
