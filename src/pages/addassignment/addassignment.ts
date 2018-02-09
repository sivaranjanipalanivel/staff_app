import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { File } from '@ionic-native/file';

var globalurl="http://rgrapi.tridotstech.com/api/";

@IonicPage()
@Component({
  selector: 'page-addassignment',
  templateUrl: 'addassignment.html',
})
export class AddassignmentPage {
	subject:any;
  description:any;
  groupid:any;
  imagepath=[];
  extension:any;
  files=[];
  tmppath:any;
  enddate:any;
  today:any;
  submitted = false;
  constructor(public loadingCtrl: LoadingController,public dbserviceProvider: DBserviceProvider,public file1: File,private camera: Camera,public transfer: FileTransfer,public alertCtrl: AlertController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.groupid=navParams.get("groupid")
    console.log(this.groupid)
    var t1=new Date();
    var m1=t1.getMonth()+1;
    this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
  }

  ionViewDidLoad() {
    
  }

   presentLoadingDefault() {
   
    setTimeout(() => {
    
  }, 50);

}
   getPaddedComp(comp) {
                        return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
                    }

   adddassignment(){
     let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading Please Wait...'
    });
    loading.present();
     this.submitted = true;
     if (this.subject != undefined && this.subject != '' && this.enddate != undefined && this.enddate != ''){
              let postParams={
                assignment_id:0,
                title: this.subject,
                description:this.description,
                datecreated: new Date(),
                group_id:this.groupid,
                staff_id:localStorage.staffId,
                enddate:this.enddate
              }
                  this.dbserviceProvider.postassignment(postParams)
          .then(data => {
            console.log(data);
            var assign:any=data;
            for(var i=0;i<this.imagepath.length;i++){
                this.tmppath=this.imagepath[i]
                    var a=this.tmppath.split('/');
                    var b=a.length;
                    var c=a[b-1];
                  let options1: FileUploadOptions = {
                      fileKey: 'file',
                      fileName: c,
                      headers: {}
                  }
                  const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.upload(this.tmppath,globalurl+'containers/assignment_attachments/upload', options1)
   .then((res) => {
     var a=JSON.parse(res.response);
     var b=a.result;
     var c=b.files;
    let postParams={
                     id:0,
                assignmentId:assign.assignment_id,
                filename:c.file[0].name,
                filetype:c.file[0].type,
                originalFilename:c.file[0].originalFilename,
                datecreated:new Date()   
              }
           this.dbserviceProvider.postassignmentstaffattachements(postParams)
          .then(data => {
            },
              error => {console.log(JSON.stringify(error.json()))
                });
   }, (err) => {
     console.log("error"+JSON.stringify(err))

   })
 }
 var postdata={
   "batch_id":assign.group_id,
   "ass_id":assign.assignment_id,
 }
 this.dbserviceProvider.postassignmentnotice(postdata)
          .then(data => {
            console.log(data);
            loading.dismiss();
              alert("Assignment created sucessfully");
              this.viewCtrl.dismiss(assign);
            }, error => {
        console.log(error);// Error getting the data
      });
      //      this.dbserviceProvider.getStudents(assign.group_id)
      //     .then(data => {
      //       var student:any=data;
      //     for(var i=0;i< student.length;i++)
      //     {
      //         let postParams={
      //           id:0,
      //           assignmentid:assign.assignment_id,
      //           student_id: student[i].userid,
      //           group_id:assign.group_id,
      //           datecreated: new Date(),
      //           datecompleted:"",
      //           remarks:"",
      //           marks: null,
      //           status: 0,
      //           offline: 1
      //         }
      //          this.dbserviceProvider.postassignmentmapping(postParams)
      //     .then(data => {
      //           this.viewCtrl.dismiss(assign);

      //  }, error => {
      //   console.log(error);// Error getting the data

      // });
      //         }
      //            }, error => {
      //   console.log(error);// Error getting the data

      // });

       }, error => {
        console.log(error);// Error getting the data

      });
    }
    else{
                  this.alert("vaildsubject");

    }
  // }

    
  }

  alert(condition:any){
      let tit: string;
      let subTit: string;

      switch (condition) {
               case "vaildsubject":
              tit='Alert';
              subTit='Enter the value in required fields';
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
                alertTransition.then(()=>{
                  // this.navCtrl.pop();
                });
               
                return false;
            }
        }]
    });
       alert.present();
  }

   dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  uploadfile(){
    const options: CameraOptions = {
    quality: 100,
    mediaType: this.camera.MediaType.ALLMEDIA,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

      this.camera.getPicture(options).then((imageData) => {
        console.log(imageData)    
        var file=imageData;
                var a=file.split('.');
                var b=a.length;
                var c=a[b-1];
                if(c == 'doc' || c == 'DOC' || c== 'pdf' || c== 'PDF'|| c== 'docx'|| c== 'DOCX' ||c == 'JPEG' || c == 'jpeg' || c== 'JPG' || c== 'jpg'|| c== 'PNG'|| c== 'png')
                {  
                  this.imagepath.push(imageData)
                   const fileTransfer: FileTransferObject = this.transfer.create();
                    var a=imageData.split('/');
                    var b=a.length;
                    var c=a[b-1];
                    let exten=c.split(".");
                if(exten[1] == "pdf")
                {
                  this.extension="pdf";
                 }
                 else if(exten[1] == "doc" || exten[1] == "docx")
                 {
                    this.extension ="doc"
                 }
                  else if(exten[1] == 'JPEG' || exten[1] == 'jpeg' || exten[1]== 'JPG' || exten[1]== 'jpg'|| exten[1]== 'PNG'|| exten[1]== 'png'){
                    this.extension ="png"
                  }
      let options1: FileUploadOptions = {

         fileKey: 'file',
         fileName: c,
        headers: {}
      }
      let uploadfile={
      extension:this.extension,
      filename:c
    }
                this.files.push(uploadfile);
                console.log(this.files)               
}
else{
  alert("Please select vaild format")
}

    });
  }

}
