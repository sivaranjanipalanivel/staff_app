import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform,LoadingController } from 'ionic-angular';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MomentModule } from 'angular2-moment';

var globalUrl="http://rgrapi.tridotstech.com/api/";

@IonicPage()
@Component({
  selector: 'page-discussiondetail',
  templateUrl: 'discussiondetail.html',
})
export class DiscussiondetailPage {
  discussion:any;
  disdetail:any;
  skillInput:any;
  discussioncomments:any;
  pagesize:any;
  PageNo:any;
  imagepath:any;
  extension:any;
  constructor(public loadingCtrl: LoadingController,public platform: Platform,public dbserviceProvider: DBserviceProvider,public file: File,private camera: Camera,public transfer: FileTransfer,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  	this.discussion=this.navParams.get("discussion")
  	console.log(this.discussion)
  	this.discussiondetail();
  	this.discussioncomment();
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

  discussiondetail(){
  	this.dbserviceProvider.getDiscussiondetails(this.discussion.id,this.discussion.project_id)
          .then(data => {
          this.disdetail=data[0];
         }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
  }

  discussioncomment(){
  	 this.dbserviceProvider.getdiscussioncommentslist(this.pagesize,this.PageNo,this.discussion.id)
    .then(data => {
    		this.discussioncomments=data;
    }, error => {
            console.log(JSON.stringify(error.json()));
    });
  }

  sendcomment(comment){
  	console.log(comment)
    if(comment!= undefined && comment!= "")
    {
  	   var postParams={
                id:0,
                discussion_id:this.discussion.id,
                parent:null,
                modified:null,
                content:comment,
                file_name:null,
                file_mime_type:null,
                staff_id:localStorage.staffId,
                full_name:null,
                created:new Date(),
                contact_id:0,
                PostedBy:localStorage.staffname
              }
    this.dbserviceProvider.getprojectdiscussions(postParams)
    .then(data => {
       let discuss:any;
        discuss=data;
      discuss.imagepath=localStorage.staffimagepath;
      this.discussioncomments.push(discuss);
      this.skillInput="";
    }, error => {
            console.log(JSON.stringify(error.json()));
    });
    }
  }

view_link(url,link_type) {
    var type=url.split(".");
      // if(type[1] == "pdf")
      // {
      //          url=webglobalUrl+'uploads/discussions/'+this.discussion.id+'/'+url;
      //          link_type="pdf";
      //         if (this.platform.is('android')){
      //           if (link_type !== undefined && link_type !== null) {
      //               if (link_type.toLowerCase() !== 'html') {
      //                   url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(url);
      //               }
      //           }
      //       }
      //       window.open(url, '_blank', 'location=no,clearcache=yes');
      //     }
      //     else if(type[1] == "doc" || type[1] == "docx"){
      //      url='http://docs.google.com/gview?url='+webglobalUrl+'uploads/discussions/'+this.discussion.id+'/'+url+'&embedded=true'
      //       window.open(url, '_blank', 'location=no,clearcache=yes');
      //     }
      //     else{
      //       url=webglobalUrl+'uploads/discussions/'+this.discussion.id+'/'+url;
      //       window.open(url, '_blank', 'location=no,clearcache=yes');
      //     }
      if(type[1] == "pdf" || type[1] == "doc" || type[1] == "docx")
      {
               url=globalUrl+"containers/discussions/download/"+url;
               link_type="pdf";
                if (link_type !== undefined && link_type !== null) {
                    if (link_type.toLowerCase() !== 'html') {
                        url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(url);
                    }
                }
            window.open(url, '_blank', 'location=no,clearcache=yes');
          }
          else{
            url=globalUrl+"containers/discussions/download/"+url
            window.open(url, '_blank', 'location=no,clearcache=yes');
          }
          }

           sendattachement(){
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
    fileTransfer.upload(imageData,globalUrl+'containers/discussions/upload', options1)
   .then((res) => {
     var a=JSON.parse(res.response);
     var b=a.result;
     var c=b.files;
     let exten=c.file[0].name.split(".")
      var type;
     if(exten[1] == 'JPEG' || exten[1] == 'jpeg' || exten[1]== 'JPG' || exten[1]== 'jpg'|| exten[1]== 'PNG'|| exten[1]== 'png'){
      type=c.file[0].type;
     }
     else{
       type=null;
     }

        let postParams={
                     id:0,
                discussion_id:this.discussion.id,
                parent:null,
                modified:null,
                content:"",
                file_name:c.file[0].name,
                file_mime_type:type,
                staff_id:localStorage.staffId,
                full_name:null,
                created:new Date(),
                contact_id:0,
                PostedBy:localStorage.staffname  
              }
    this.dbserviceProvider.getprojectdiscussions(postParams)
    .then(data => {
       let discuss:any;
        discuss=data;
        if(discuss.file_name != undefined && discuss.file_name != null)
        {
              var filename=discuss.file_name.split(".")
             if(filename[1] == "pdf")
              {
                discuss.extension="pdf";
              }
              else if(filename[1] == "doc" || filename[1] == "docx")
              {
              discuss.extension ="doc"
              }
              else if(filename[1] == 'JPEG' || filename[1] == 'jpeg' || filename[1]== 'JPG' || filename[1]== 'jpg'|| filename[1]== 'PNG'|| filename[1]== 'png'){
                discuss.extension ="png"
              }
            }
      discuss.imagepath=localStorage.staffimagepath;
      this.discussioncomments.push(discuss);
      this.skillInput="";
    }, error => {
            console.log(JSON.stringify(error.json()));
    });
   }, (err) => {
     console.log("error"+JSON.stringify(err))

   })          
}
else{
  alert("Please select vaild format")
}
    });
  }



}
