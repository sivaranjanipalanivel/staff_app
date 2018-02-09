import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { StudentviewPage } from '../studentview/studentview';

@IonicPage()
@Component({
  selector: 'page-studentlist',
  templateUrl: 'studentlist.html',
})
export class StudentlistPage {
   searchControl: FormControl;
   Studentlist:any=[];
   Studentsearchlist:any=[];
   queryText:any;
  constructor(public dbserviceProvider: DBserviceProvider,public navCtrl: NavController, public navParams: NavParams) {
  	this.searchControl = new FormControl();
    this.getstudentlist();
  }

  ionViewDidLoad() {

  }

  searchstudent(){
    this.Studentlist =this.filterItems(this.queryText);
  }

  filterItems(searchTerm){
    // if (searchTerm && searchTerm.trim() != '') {
        return this.Studentsearchlist.filter((item) => {
            return item.lowerletter.indexOf(searchTerm.toLowerCase()) > -1;
        });         
      // }
    }

  getstudentlist(){
    this.dbserviceProvider.getstudents()
      .then(data => {
        console.log();
        this.Studentlist=data;
        this.Studentsearchlist=data;
      }, error => {
        console.log(JSON.stringify(error.json()));        
      });
  }

  // searchstudent(){
  //   var data={
  //     "key_word":this.queryText
  //   }
  //   this.dbserviceProvider.searchkeyword(data)
  //     .then(data => {
  //       if(data !="No Student Found"){
  //       this.Studentlist=data;
  //       }
  //     }, error => {
  //       console.log(JSON.stringify(error.json()));        
  //     });
  // }



  goToStudentDetail(item){
    this.navCtrl.push(StudentviewPage, { student: item, pet: "fee"})
  }

}
