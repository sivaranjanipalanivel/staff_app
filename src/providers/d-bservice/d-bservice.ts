import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

//var webglobalUrl="http://rgr.tridotstech.com/"
//var globalUrl="http://rgrapi.tridotstech.com/api/";

var webglobalUrl="http://demostaging.tridotstech.com/"
var globalUrl="http://demostagingapi.tridotstech.com/api/";

// var webglobalUrl="http://192.168.0.132:8000/";
// var globalUrl="http://192.168.0.132:8000/api/";

var date;
var tomorrow;
var aa = new Date();
function getPaddedComp(comp) {
  return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
}
date = aa.getFullYear() + '-' + (getPaddedComp(aa.getMonth() + 1)) + '-' + getPaddedComp(aa.getDate());
tomorrow = aa.getFullYear() + '-' + (getPaddedComp(aa.getMonth() + 1)) + '-' + getPaddedComp(aa.getDate() + 1);
var headerss = new Headers();

headerss.append("Accept", 'application/json');
headerss.append('Content-Type', 'application/json;charset=utf-8');
let options = new RequestOptions({ headers: headerss });

var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

@Injectable()
export class DBserviceProvider {

private baseResource = "http://schools.tridotstech.com/api/resource/";
private baseMethod = "http://schools.tridotstech.com/api/method/";
headers;
options;

  constructor(public http: Http, public storage: Storage) {
    this.headers = new Headers( { 'withCredentials': 'true'});
   }

  get(endpoint: string) {
    let cacheKey = endpoint;
    this.options = new RequestOptions({ headers: this.headers});
    return this.http.get(endpoint,this.options).map(res => res.json());
  }

 post(endpoint: string) {
    let cacheKey = endpoint;
    this.options = new RequestOptions({ headers: this.headers});
    return this.http.get(endpoint,this.options).map(res => res.json());
  }

  delete(endpoint: string) {
    let cacheKey = endpoint;
    this.options = new RequestOptions({ headers: this.headers});
    return this.http.get(endpoint,this.options).map(res => res.json());
  }

 


 getLogin(accountInfo: any): any {
   
    let endpoint = 'login?usr='+accountInfo.username+'&pwd='+accountInfo.password;
    return this.get(this.baseMethod+endpoint);
  }

  getCurrentUser(): any {
   
    let endpoint = 'frappe.auth.get_logged_user';
    return this.get(this.baseMethod+endpoint);
  }
  getCurrentUserName(name): any {
   
    let endpoint = 'Employee?filters=[["user_id","=","'+name+'"]]&fields=["name","employee_name","user_id","image","status","branch","unsubscribed"]';
    return this.get(this.baseResource+endpoint);
  }
  // getCurrentUserDetail(name): any {
   
  //   let endpoint = 'Employee/'+name;
  //   return this.get(this.baseResource+endpoint);
  // }
  getCurrentinstructorDetail(name): any {
   
    let endpoint = 'Student Group Instructor?filters=[["owner","=","'+name+'"]]&fields=["parent","instructor"]';
    return this.get(this.baseResource+endpoint);
  }
  getstaffbatches(name): any {
   
        let endpoint = 'Student Group Instructor?filters=[["instructor","=","'+name+'"]]&fields=["parent","instructor_name"]';
    return this.get(this.baseResource+endpoint);
  }
  getstaffbatchedetail(name): any {
   
        let endpoint = 'Student Group Instructor?filters=[["instructor","=","'+name+'"]]&fields=["parent","instructor_name"]';
    return this.get(this.baseResource+endpoint);
  }
  getbatch(name): any {
   
        let endpoint = 'Instructor?filters=[["employee","=","'+name+'"]]&fields=["employee","instructor_name"]';
    return this.get(this.baseResource+endpoint);
  }
  getcourseschedule(): any {
   
    let endpoint = 'Course Schedule';
    return this.get(this.baseResource+endpoint);
  }
  getstudentsfrombatch(name): any {
   
    let endpoint = 'Student Group Student?filters=[["parent","=","'+name+'"]]&fields=["student_name","group_roll_number","student"]';
    return this.get(this.baseResource+endpoint);
  }
  getdetail(name): any {
   
    let endpoint = 'Student?filters=[["name","=","'+name+'"]]&fields=["first_name","last_name","middle_name","title","gender","student_mobile_number","student_email_id","date_of_birth","name"]';
    return this.get(this.baseResource+endpoint);
  }
 // postdiscussions(data): any{

  //     let endpoint = 'Batch Discussion';
  //   return this.http.post(this.baseResource+endpoint,data);
  // }
  // getAttendance(data): any{

  //     let endpoint = 'Attendance';
  //   return this.http.post(this.baseResource+endpoint,data);
  // }

  // getassignmentlist(data): any{
  //     let endpoint = 'Batch Assignment?filters=[["project","=","'+data+'"]]';
  //   return this.get(this.baseResource+endpoint);
  // }

  getdiscusslist(data): any{

      let endpoint = 'Batch Discussion?filters=[["project","=","'+data+'"]]';
    return this.get(this.baseResource+endpoint);
  }

getadminschedule(id) {
   let endpoint = 'Course Schedule';
    return this.get(this.baseResource+endpoint);
  }
  // getStudents(data): any{
  //     let endpoint = 'Program Enrollment?filters=[["project","=","'+data+'"]]';
  //   return this.get(this.baseResource+endpoint); 
  // }
  
  // deleteassignmentId(data): any{
  //     let endpoint = 'Batch Assignment?filters=[["project","=","'+data+'"]]';
  //   return this.delete(this.baseResource+endpoint); 
  // }

  getAssignmentdetail(id) {
    // if (this.data) {
    //   // already loaded data
    //   return Promise.resolve(this.data);
    // }
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(globalUrl + 'tblassignments?filter[where][assignment_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

   getAssignmentattachements(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblassignstaffattachements?filter[where][assignmentId]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          let file:any=[];
          for(var i=0;i < data.length;i++)
          {
            var filename=data[i].originalFilename.split(".")
            if(filename[1] == "pdf")
              {
                data[i].extension="pdf";
              }
              else if(filename[1] == "doc" || filename[1] == "docx")
              {
              data[i].extension ="doc"
              }
              else if(filename[1] == 'JPEG' || filename[1] == 'jpeg' || filename[1]== 'JPG' || filename[1]== 'jpg'|| filename[1]== 'PNG'|| filename[1]== 'png'){
                data[i].extension ="png"
              }
           file.push(data[i])
          }
          resolve(file);
        });
    });
  }

  updateassignemnt(postParams) {
    return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblassignments', postParams, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateassignemntmapping(postParams) {
    return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblassignmentmappings', postParams, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getAttendance(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblattendances?filter[where][batch_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getAssignmentmapping(assignmentid, studentid) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblassignmentmappings?filter[where][assignmentid]=' + assignmentid + '&filter[where][student_id]=' + studentid)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getAssignmentstudentattachements(assignmentid, studentid) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblassignmentattachements?filter[where][student_id]=' + studentid + '&filter[where][assignment_id]=' + assignmentid)
        .map(res => res.json())
        .subscribe(data => {
          let file:any=[];
          for(var i=0;i < data.length;i++)
          {
            var filename=data[i].originalFilename.split(".")
            if(filename[1] == "pdf")
              {
                data[i].extension="pdf";
              }
              else if(filename[1] == "doc" || filename[1] == "docx")
              {
              data[i].extension ="doc"
              }
              else if(filename[1] == 'JPEG' || filename[1] == 'jpeg' || filename[1]== 'JPG' || filename[1]== 'jpg'|| filename[1]== 'PNG'|| filename[1]== 'png'){
                data[i].extension ="png"
              }
           file.push(data[i])
          }
          resolve(file);
        });
    });
  }

  getAssignmentcomments(assignmentid) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblcomments?filter[include]=student&filter[include]=staff&filter[where][assignment_id]=' + assignmentid)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postAssignmentcomments(assignment) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblcomments', assignment, options)
        .map(res => res.json())
        .subscribe(data => {
          data.staff = true;
          resolve(data);
        });
    });
  }

  getStudents(batchid) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblclients?filter[where][group_id]=' + batchid + "&filter[where][branch_id]=" + localStorage.staffbranch_id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getassignmentdetail(assignmentid) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblassignmentmappings?filter[include]=assignment&filter[include]=attachement&filter[include]=student&filter[where][assignmentid]=' + assignmentid)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getDiscussiondetails(id, projectid) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblprojectdiscussions?filter[include]=discussion&filter[include]=staff&filter[where][project_id]=' + projectid + '&filter[where][id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getprojectdiscussions(discussion) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblprojectdiscussioncomments', discussion, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getdiscussioncommentslist(PageSize, pageNo, id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblprojectdiscussioncomments?filter[include]=staff&filter[include]=student&filter[where][discussion_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          let comments=data;
          for(var i=0;i< comments.length;i++)
        {
          if(comments[i].contact_id == 0)
          {
            if(comments[i].staff.profile_image != null)
            {
          comments[i].imagepath=webglobalUrl+'uploads/staff_profile_images/'+comments[i].staff.staffid+'/thumb_'+comments[i].staff.profile_image; 
        }
        else{
           comments[i].imagepath=false;
        }
          }
          else if(comments[i].staff_id == 0){
            if(comments[i].student.upload_photo_choose_file != undefined)
            {
          comments[i].imagepath=webglobalUrl+'uploads/profiles/'+comments[i].student.userid+'/'+comments[i].student.upload_photo_choose_file; 
        }
        else{
           comments[i].imagepath=false;
          }
        }
        if(comments[i].file_name != undefined && comments[i].file_name != null)
        {
              var filename=comments[i].file_name.split(".")
             if(filename[1] == "pdf")
              {
                comments[i].extension="pdf";
              }
              else if(filename[1] == "doc" || filename[1] == "docx")
              {
              comments[i].extension ="doc"
              }
              else if(filename[1] == 'JPEG' || filename[1] == 'jpeg' || filename[1]== 'JPG' || filename[1]== 'jpg'|| filename[1]== 'PNG'|| filename[1]== 'png'){
                comments[i].extension ="png"
              }
            }
        }
          resolve(comments);
        });
    });
  }

  getbatches(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblprojects?filter[where][id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getacademicyear(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblacademic_years?filter[where][year_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getcountry(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblcountries?filter[where][country_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getguardians(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblguardians?filter[where][student_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  getbranch(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblbranches?filter[where][id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

 getacademicdetails(name) {
    let endpoint = 'Program Enrollment?filters=[["student","=","'+name+'"]]&fields=["program","academic_year","academic_term","student_batch_name","enrollment_date"]';
    return this.get(this.baseResource+endpoint);
  }

getcoursedetails(name) {
    let endpoint = 'Program Enrollment Course?filters=[["parent","=","'+name+'"]]&fields=["course","course_name"]';
    return this.get(this.baseResource+endpoint);
  }


  getcontact(name) {
    let endpoint = 'Student?filters=[["name","=","'+name+'"]]&fields=["name","address_line_1","address_line_2","state","city","pincode"]';
    return this.get(this.baseResource+endpoint);
  }

  getgaurdian(name){
    let endpoint = 'Student Guardian?filters=[["parent","=","'+name+'"]]&fields=["guardian","relation"]';
    return this.get(this.baseResource+endpoint);
  }

  getgaurdiandetails(name){
    let endpoint = 'Guardian?filters=[["parent","=","'+name+'"]]&fields=["guardian_name","mobile_number","email_address"]';
    return this.get(this.baseResource+endpoint);
  }

  getcourse(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblinvoiceitemslists?filter[where][id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getcourses() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblinvoiceitemslists')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getbranches() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblbranches')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getdegree(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblknowledgebasegroups?filter[where][groupid]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }



  getinvoicelist(id) {
    let endpoint = 'Student?filters=[["student","=","'+id+'"]]';
    return this.get(this.baseResource+endpoint);
  }

  // getstaffbatches(id) {
  //   return new Promise(resolve => {
  //     this.http.get(globalUrl + 'tblprojectmembers?filter[include]=project&filter[where][staff_id]=' + id)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         let batch = [];
  //         for (var i = 0; i < data.length; ++i) {
  //           if (data[i].project != '' && data[i].project != undefined) {
  //             var d = data[i].project.name;
  //             d = d.replace(" ", "");
  //             data[i].letter = d[0];
  //             data[i].color = "4cb050";
  //             var t = new Date(data[i].project.start_date);
  //             data[i].sdate = this.getPaddedComp(month[t.getMonth()]) + " " + this.getPaddedComp(t.getDate()) + ", " + t.getFullYear();
  //             var t2 = new Date(data[i].project.deadline);
  //             data[i].edate = this.getPaddedComp(month[t2.getMonth()]) + " " + this.getPaddedComp(t2.getDate()) + ", " + t2.getFullYear();
  //             batch.push(data[i]);
  //           }
  //         }
  //         resolve(batch);
  //       });
  //   });
  // }
  getstaffbatcheslist(id) {

    
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblprojectmembers?filter[include]=project&filter[where][staff_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getstaffbatchesId(id,branchid,courseid) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblprojectmembers?filter={"where":{"staff_id":'+id+'},"include":[{"relation":"project","scope":{"where":{"branch_id":'+branchid+',"course_id":'+courseid+'}}}]}')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getallbatches() {
    return new Promise(resolve => {
      if(!localStorage.batches_list){
        this.http.get(globalUrl + 'tblprojects')
          .map(res => res.json())
          .subscribe(data => {
            localStorage.batches_list= JSON.stringify(data);
            
            resolve(data);
          });
      }
      else{
        resolve(JSON.parse(localStorage.batches_list));
      }
    });
  }

  getstaffs() {
    return new Promise(resolve => {
        this.http.get(globalUrl + 'tblstaffs')
          .map(res => res.json())
          .subscribe(data => {
            localStorage.staff_list= JSON.stringify(data);
            resolve(data);
          });
    });
  }
  getPaddedComp(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
  }

  getexams(id,skip,limit) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblexams?filter[include]=exam&filter[include]=examcriteria&filter[where][BranchId]='+localStorage.staffbranch_id+'&filter[order]=id desc&filter[limit]=+'+limit+'&filter[skip]='+skip)
        .map(res => res.json())
        .subscribe(data => {
          let exam: any = [];
          for (var i = 0; i < data.length; i++) {
            var d = data[i].Title;
            d = d.replace(" ", "");
            data[i].letter = d[0];
            data[i].color = "f54337";
            var t1 = new Date(data[i].FromDate);
            var t = data[i].FromDate.split(" ")
            var d1 = t[1].split(":");
            if (d1[0] > 12) {
              d1[0] = d1[0] - 12;
              data[i].SDate = d1[0] + ":" + d1[1] + ":" + "PM"
            }
            else {
              data[i].SDate = d1[0] + ":" + d1[1] + ":" + "AM"
            }
            data[i].StartDate = this.getPaddedComp(month[t1.getMonth()]) + " " + this.getPaddedComp(t1.getDate()) + ", " + t1.getFullYear();
            exam.push(data[i])
          }
          resolve(exam);
        });
    });
  }

  getexamcriteria() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblexamcriteria')
        .map(res => res.json())
        .subscribe(data => {
          let examcriteria: any = [];
          for (var i = 0; i < data.length; i++) {
            data[i].tracks = "Food"
            data[i].color = "f54337"
            examcriteria.push(data[i])
          }
          resolve(examcriteria);
        });
    });
  }

  deleteexamcriteria(id) {
    return new Promise(resolve => {
      this.http.delete(globalUrl + 'tblexamcriteria/' + id)
        .subscribe((ok) => {
          resolve(ok);
        });
    });
  }

  deleteexam(id) {
    return new Promise(resolve => {
      this.http.delete(globalUrl + 'tblexams/' + id)
        .subscribe((ok) => {
          resolve(ok);
        });
    });
  }

  addexamcriteria(examcriteria) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblexamcriteria', examcriteria, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  addschedule(data) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblstaffschedules', data, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  getadminselectedschedule(id,current_date) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblstaffschedules?filter[include]=Batch&filter[where][staff_id]=' + id + '&filter[order]=dateadded DESC&filter[where][dateadded]=' + current_date)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  getsubject() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblsubjects')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  getsubjectId(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblsubjects?filter[where][course_id]='+id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getquestionId(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblquestions?filter[where][SubjectId]='+id+'&filter[where][SaveTo]='+2)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  
  getdashadminschedule(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblstaffschedules?filter[include]=Batch&filter[where][finished]='+0+'&filter[where][staff_id]=' + id+'&filter[where][dateadded]='+date+'&filter[limit]='+4)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  getadmintomorrowschedule(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblstaffschedules?filter[include]=Batch&filter[where][staff_id]=' + id+'&filter[where][dateadded]='+tomorrow)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  getadminweekschedule(id) {
   var curr = new Date(); // get current date
   var curr1 = new Date(); // get current date
   var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
   var last = first + 6; // last day is the first day + 6
    let firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr1.setDate(last)).toUTCString();
    var startdate =new Date(firstday)
    var lasdate =new Date(lastday)
    firstday = startdate.getFullYear() + '-' + (getPaddedComp(startdate.getMonth() + 1)) + '-' + getPaddedComp(startdate.getDate()-1);
    lastday = lasdate.getFullYear() + '-' + (getPaddedComp(lasdate.getMonth() + 1)) + '-' + getPaddedComp(lasdate.getDate());
     return new Promise(resolve => {
      this.http.get(globalUrl + 'tblstaffschedules?filter[include]=Batch&filter[where][staff_id]=' + id +'&filter[order]=dateadded DESC&filter[where][dateadded][gt]='+firstday)
        .map(res => res.json())
        .subscribe(data => {
          let weeksched:any=[];
          for(var i=0;i< data.length;i++)
          {
          var d = data[i].name;
          d = d.replace(" ", "");
          data[i].letter = d[0];
          data[i].tracks = "Food"
          data[i].color = "f54337"
          weeksched.push(data[i])
          }
          resolve(weeksched);
        });
    });
  }
  updateschedule(data) {
    return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblstaffschedules', data, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  deleteschedule(id) {
    return new Promise(resolve => {
      this.http.delete(globalUrl + 'tblstaffschedules/' + id)
        .subscribe((ok) => {
          resolve(ok);
        });
    });
  }

  addexam(exam) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblexams', exam, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  addinvoicepaymentrecords(record) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblinvoicepaymentrecords', record, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  Updatefee_schedule(fee) {
    return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblfee_schedules', fee, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  Updateexam(exam) {
    return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblexams', exam, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getexamcriteriaByid(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblexamcriteria?filter[where][id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateexamcriteria(postParams) {
    return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblexamcriteria', postParams, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

   getattendancestudent(id) {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblattendance_mappings?filter[where][att_id]=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getpaymentId(id){
  return new Promise(resolve => {
    this.http.get(globalUrl+'tblinvoicepaymentrecords?filter[include]=invoice&filter[include]=payment&filter[where][invoiceid]='+id)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data); 
      });
  });
}
  
getinvoiceId(id){
  return new Promise(resolve => {
    this.http.get(globalUrl+'tblinvoices?filter[where][id]='+id)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data); 
      });
  });
}

examschedule(schedules){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblexam_schedules', schedules, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

//   getdiscusslist(id){
//   return new Promise(resolve => {
//     this.http.get(globalUrl+'tblprojectdiscussions?filter[where][project_id]='+id)
//       .map(res => res.json())
//       .subscribe(data => {
//         let discussion:any=[];
//         for (var i = 0; i < data.length; ++i) {
//           var d = data[i].subject;
//           d = d.replace(" ", "");
//           data[i].letter = d[0];
//           data[i].tracks = "Workshop"
//           data[i].color = "ff9801"
//           discussion.push(data[i]);
//         }
//         resolve(discussion); 
//       });
//   });
// } 

getassignmentlist(id){
  return new Promise(resolve => {
    this.http.get(globalUrl+'tblassignments?filter[where][group_id]='+id)
      .map(res => res.json())
      .subscribe(data => {
        let Assign:any=[];
        for (var i = 0; i < data.length; ++i) {
          var d = data[i].title;
          d = d.replace(" ", "");
          data[i].letter = d[0];
          data[i].tracks = "Food"
          data[i].color = "f54337"
          var t1 = new Date(data[i].enddate);
          var m1 = t1.getMonth() + 1;
          data[i].sdate = this.getPaddedComp(t1.getDate()) + "/" + this.getPaddedComp(m1) + "/" + t1.getFullYear();
          Assign.push(data[i]);
        }
        resolve(Assign); 
      });
  });
}

 deleteassignment(id) {
    return new Promise(resolve => {
      this.http.delete(globalUrl + 'tblassignments/' + id)
        .subscribe((ok) => {
          resolve(ok);
        });
    });
  }

  postassignment(assignment){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblassignments', assignment, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postassignmentstaffattachements(attach){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblassignstaffattachements', attach, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postassignmentmapping(assign){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblassignmentmappings', assign, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
 
  postattendance(attendance){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblattendances', attendance, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postattendancemapping(attenmapping){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblattendance_mappings', attenmapping, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postdiscussions(discuss){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblprojectdiscussions', discuss, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

postexam_creation(response){
var headerss = new Headers();
headerss.append("Accept", 'application/x-www-form-urlencoded');
headerss.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
let params: URLSearchParams = this.serialize(response);
let options = new RequestOptions({ headers: headerss });
     return new Promise(resolve => {
      this.http.post(webglobalUrl + 'api/exam_creation', params, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

 postassignmentnotice(response){
var headerss = new Headers();
headerss.append("Accept", 'application/x-www-form-urlencoded');
headerss.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
let params: URLSearchParams = this.serialize(response);
let options = new RequestOptions({ headers: headerss });
     return new Promise(resolve => {
      this.http.post(webglobalUrl + 'api/send_assignmentnotice', params, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }


deleteexamId(response){
var headerss = new Headers();
headerss.append("Accept", 'application/x-www-form-urlencoded');
headerss.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
let params: URLSearchParams = this.serialize(response);
let options = new RequestOptions({ headers: headerss });
     return new Promise(resolve => {
      this.http.post(webglobalUrl + 'api/delete_exam', params, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

deleteassignmentId(response){
var headerss = new Headers();
headerss.append("Accept", 'application/x-www-form-urlencoded');
headerss.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
let params: URLSearchParams = this.serialize(response);
let options = new RequestOptions({ headers: headerss });
     return new Promise(resolve => {
      this.http.post(webglobalUrl + 'api/delete_assignment', params, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

searchkeyword(response){
var headerss = new Headers();
headerss.append("Accept", 'application/x-www-form-urlencoded');
headerss.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
let params: URLSearchParams = this.serialize(response);
let options = new RequestOptions({ headers: headerss });
     return new Promise(resolve => {
      this.http.post(webglobalUrl + 'api/search_student', params, options)
        .map(res => res.json())
        .subscribe(data => {
          if(data.data != "No Student Found")
          {
          let Studentlist:any=[];
          for(var i=0;i<data.data.length;i++){
           data.data[i].tracks = "Food"
          data.data[i].color = "f54337"
          Studentlist.push(data.data[i]);
          }          
          resolve(Studentlist);
        }
        else{
          resolve(data.data);
        }
        });
    });
  }

  serialize(obj): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var element = obj[key];

            params.set(key, element);
        }
    }
    return params;
}

postexamcriteriagroup(exam){
     return new Promise(resolve => {
      this.http.post(globalUrl + 'tblexamcriteria_groups', exam, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  
  deleteexamcriteriagroup(id){
     return new Promise(resolve => {
      this.http.delete(globalUrl + 'tblexamcriteria_groups/'+id)
         .subscribe((ok) => {
           console.log(ok)
          resolve(ok);
        });
    });
  }

  getexamresultId(id){
  return new Promise(resolve => {
    this.http.get(globalUrl+'tblexamresults?filter[where][ExamId]='+id)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data); 
      });
  });
}

 getexamscheduleId(skip,limit){
  return new Promise(resolve => {
    this.http.get(globalUrl+'tblexam_schedules?filter={"order":"id desc","limit":'+limit+',"skip":'+skip+',"include":[{"relation":"exam","scope":{"where":{"BranchId":'+localStorage.staffbranch_id+'}}}]}')
      .map(res => res.json())
      .subscribe(data => {
        let exam:any=[];
        for(var i=0;i< data.length;i++)
        {
          if(data[i].exam){
            var d = data[i].exam.Title;
            d = d.replace(" ", "");
            data[i].letter = d[0];
            data[i].color = "f54337";
            var startdate=data[i].StartDate.split(" ");
            data[i].StartDate=startdate[1];
              var enddate=data[i].EndDate.split(" ");
            data[i].EndDate=enddate[1];
            // var t = data[i].StartDate.split(" ")
            // var d1 = t[1].split(":");
            // data[i].StartDate = this.getPaddedComp(d1[0])+ ":" +this.getPaddedComp(d1[1])+ ":" + d1[2];
            // var t1 = data[i].EndDate.split(" ")
            // var d2 = t1[1].split(":");
            // data[i].EndDate = this.getPaddedComp(d2[0])+ ":" +this.getPaddedComp(d2[1])+ ":" + d2[2];
            exam.push(data[i])
          }
        }
        resolve(exam); 
      });
  });
}

patchtblexam_schedules(exam){
     return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblexam_schedules', exam, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  //  poststaffdevice(deviceid,staffid) {
  //   var data={
  //   "id":0,
  //   "StaffId":staffid,
  //   "DeviceId":deviceid
  // }
  //   return new Promise(resolve => {
  //     this.http.post(globalUrl + 'tblstaffdevices', data, options)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         resolve(data);
  //       });
  //   });
  // }

  patchstaffdevice(deviceid,userid,id){
     var data={
    "id":id,
    "StaffId":userid,
    "DeviceId":deviceid
  }
     return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblstaffdevices', data, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getdeviceId(id){
  return new Promise(resolve => {
    this.http.get(globalUrl+'tblstaffdevices?filter[where][StaffId]='+localStorage.staffId)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data); 
      });
  });
}
  deletedeviceId(id){
  return new Promise(resolve => {
    this.http.delete(globalUrl + 'tblstaffdevices/' + id)
        .subscribe((ok) => {
          resolve(ok);
        });
  });
}

getpaymentmode(){
  return new Promise(resolve => {
    this.http.get(globalUrl+'tblinvoicepaymentsmodes?filter[where][active]='+1)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data); 
      });
  });
}

 getstaffId() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblstaffs?filter[where][staffid]=' + localStorage.staffId)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getinvoicenumber() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tbloptions?filter[where][name]=next_invoice_number')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getinvoiceyear() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tbloptions?filter[where][name]=invoice_year')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getstudents() {
    return new Promise(resolve => {
      this.http.get(globalUrl + 'tblclients?filter[where][branch_id]=' + localStorage.staffbranch_id)
        .map(res => res.json())
        .subscribe(data => {
          let student:any=[];
          for(var i=0;i< data.length;i++){
            var lower="";
            lower += data[i].company.toLowerCase();
            lower +=data[i].phonenumber;
            lower +=data[i].userid;
            data[i].lowerletter=lower;
            student.push(data[i])
          }
          resolve(data);
        });
    });
  }

    Updateinvoice(status) {
    return new Promise(resolve => {
      this.http.patch(globalUrl + 'tblinvoices', status, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postinvoice(invoice) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblinvoices', invoice, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  postinvoiceitems(invoice) {
    return new Promise(resolve => {
      this.http.post(globalUrl + 'tblinvoiceitems', invoice, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
