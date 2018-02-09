import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MomentModule } from 'angular2-moment';

let globalUrl="http://rgrapi.tridotstech.com/api/";

var webglobalUrl="http://rgr.tridotstech.com/"


@IonicPage()
@Component({
  selector: 'page-editassignstudent',
  templateUrl: 'editassignstudent.html',
  providers: [DBserviceProvider]
})
export class EditassignstudentPage {
  assignmentid:any;
  studentid:any;
  assignment:any;
  today:any;
  attachements:any;
  attactive:any=false;
  comments:any;
  staffcomments=[];
  skillInput:any;
  Staffname:any;
  constructor(public loadingCtrl: LoadingController,public file: File,private camera: Camera,public transfer: FileTransfer,public alertCtrl: AlertController,public viewCtrl: ViewController,public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.assignmentid=this.navParams.get("assignmentid");
    this.studentid=this.navParams.get("studentid");
    var t1=new Date();
	var m1=t1.getMonth()+1;
	this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
	this.Staffname=localStorage.staffname;
    this.loadPeople();
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

  loadPeople(){
    this.dbserviceProvider.getAssignmentmapping(this.assignmentid,this.studentid)
    .then(data => {
       var t=new Date(data[0].datecompleted);
	   var m1=t.getMonth()+1;
	   data[0].datecompleted=t.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t.getDate());
     if(data[0].datecompleted == "1970-01-01")
     {
       data[0].datecompleted="";
     }
      this.assignment = data[0];
      console.log(this.assignment);
    
     this.dbserviceProvider.getAssignmentstudentattachements(this.assignment.id,this.studentid)
    .then(data => {
      this.attachements = data;
      console.log(this.attachements)
      if(this.attachements.length != 0)
      {
         this.attactive=true;
      }
      else{
        this.attactive=false;
      }
    });
    });
     this.dbserviceProvider.getAssignmentcomments(this.assignmentid)
    .then(data => {
     	console.log(data)
      this.comments =data;
     	console.log(this.comments)
     for(var i=0;i < this.comments.length; i++)
     {
     	if(this.comments[i].staff_id == localStorage.staffId && this.comments[i].student_id == this.studentid){
         this.comments[i].statusactive=true;
         if(this.comments[i].Isstudent == "staff")
         {
          this.comments[i].imagepath=localStorage.staffimagepath;
         }
         else if(this.comments[i].Isstudent == "student")
         {
           if(this.comments[i].student.profile_image != null && this.comments[i].student.profile_image != ''){
           this.comments[i].imagepath=webglobalUrl+'uploads/profiles/'+this.comments[i].student_id+'/'+this.comments[i].student.profile_image;
           }
         else{
           this.comments[i].imagepath=false;
         }
         }
     		this.staffcomments.push(this.comments[i])
     	}
      
     }
    });
  }


  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
   getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
   }

   updateassignment(assignment){
   	 let postParams={
         id:assignment.id,
         status:assignment.status,
         datecompleted:assignment.datecompleted,
         remarks:assignment.remarks       
    }
    this.dbserviceProvider.updateassignemntmapping(postParams)
    .then(data => {
      this.viewCtrl.dismiss(data);
      console.log(data);
    	},
      error => {console.log(JSON.stringify(error.json()))
    });
   }

   sendcomment(comment){
     if(comment != undefined && comment != ""){
              let postParams={
                id:0,
                student_id:this.studentid,
                assignment_id:this.assignmentid,
                description:this.skillInput,
                datecreated:new Date(),
                batch_id:this.assignment.group_id,
                staff_id:localStorage.staffId,
                Isstudent:"staff",
                PostedBy:localStorage.staffname
              }             
                 this.dbserviceProvider.postAssignmentcomments(postParams)
    			.then(data => {  
                  let comment:any;
                  comment=data;
                  comment.imagepath=localStorage.staffimagepath;
                  this.staffcomments.push(comment)
  				  this.skillInput="";
                }),error =>{
                  console.log(JSON.stringify(error.json()))
                }
              }
   }

    view(url,link_type) {
    var type=url.split(".");
      if(type[1] == "pdf" || type[1] == "doc" || type[1] == "docx")
      {
               url=globalUrl+"containers/assignment/download/"+url;
               link_type="pdf";
                if (link_type !== undefined && link_type !== null) {
                    if (link_type.toLowerCase() !== 'html') {
                        url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(url);
                    }
                }
            window.open(url, '_blank', 'location=no,clearcache=yes');
          }
          else{
            url=globalUrl+"containers/assignment/download/"+url
            window.open(url, '_blank', 'location=no,clearcache=yes');
          }

          }

}
