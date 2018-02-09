import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

let globalUrl="http://rgrapi.tridotstech.com/api/";

@IonicPage()
@Component({
  selector: 'page-editassignment',
  templateUrl: 'editassignment.html',
   providers: [DBserviceProvider] 
})
export class EditassignmentPage {
  assignment:any;
  assignmentid:any;
  attachements:any;
  imagepath=[];
  extension:any;
  files=[];
  public today:any;
  attactive:any=false;
  tmppath:any;
  constructor(public loadingCtrl: LoadingController,public file: File,private camera: Camera,public transfer: FileTransfer,public alertCtrl: AlertController,public viewCtrl: ViewController,public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.assignmentid=this.navParams.get("assignmentid");
    var t1=new Date();
	  var m1=t1.getMonth()+1;
	  this.today=t1.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t1.getDate());
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
    this.dbserviceProvider.getAssignmentdetail(this.assignmentid)
    .then(data => {
      var t=new Date(data[0].enddate);
	    var m1=t.getMonth()+1;
	    data[0].duedate=t.getFullYear()+"-"+this.getPaddedComp(m1)+"-"+this.getPaddedComp(t.getDate());	
      this.assignment = data[0];
      console.log(this.assignment);
    });
     this.dbserviceProvider.getAssignmentattachements(this.assignmentid)
    .then(data => {
      this.attachements = data;
      console.log(data)
      if(this.attachements.length != 0)
      {
         this.attactive=true;
      }
      else{
        this.attactive=false;
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
         assignment_id:assignment.assignment_id,
         title:assignment.title || "",
         description:assignment.description || "",
         group_id:assignment.group_id,
         staff_id:assignment.staff_id,
         enddate:assignment.duedate,
         datecreated:this.today
    }
    this.dbserviceProvider.updateassignemnt(postParams)
    .then(data => {
      this.viewCtrl.dismiss(data);
      console.log(data);
    	},
      error => {console.log(JSON.stringify(error.json()))
    });
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

    fileTransfer.upload(this.tmppath,globalUrl+'containers/assignment_attachments/upload', options1)
   .then((res) => {
     var a=JSON.parse(res.response);
     var b=a.result;
     var c=b.files;
    let postParams={
                     id:0,
                assignmentId:assignment.assignment_id,
                filename:c.file[0].name,
                filetype:c.file[0].type,
                originalFilename:c.file[0].originalFilename,
                datecreated:new Date()   
              }
           this.dbserviceProvider.postassignmentstaffattachements(postParams)
          .then(data => {
            console.log(data)
            },
              error => {console.log(JSON.stringify(error.json()))
                });
   }, (err) => {
     console.log("error"+JSON.stringify(err))

   })
 }
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

   view(url,link_type) {
    var type=url.split(".");
      if(type[1] == "pdf" || type[1] == "doc" || type[1] == "docx")
      {
               url=globalUrl+"containers/assignment_attachments/download/"+url;
               link_type="pdf";
                if (link_type !== undefined && link_type !== null) {
                    if (link_type.toLowerCase() !== 'html') {
                        url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(url);
                    }
                }
            window.open(url, '_blank', 'location=no,clearcache=yes');
          }
          else{
            url=globalUrl+"containers/assignment_attachments/download/"+url
            window.open(url, '_blank', 'location=no,clearcache=yes');
          }
          }

}
