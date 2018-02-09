import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { AttendancePage } from '../pages/attendance/attendance';
import { UserData } from '../providers/user-data';
import { BatcheslistPage } from '../pages/batcheslist/batcheslist';
import { ExamquestionPage } from '../pages/examquestion/examquestion';
import { ExamschedulePage } from '../pages/examschedule/examschedule';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { OneSignal } from '@ionic-native/onesignal';
import { DBserviceProvider } from '../providers/d-bservice/d-bservice';
import { CodePush } from '@ionic-native/code-push';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  color: string;
  tabName?: string;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  name: any;
  staffid: any;
  i:any=0;
  staffimage: any;
  staffemail: any;
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  appPages: PageInterface[] = [
    {
      title: 'Dashboard', component: DashboardPage, icon: 'ios-keypad-outline', color: 'fagrey' },
    { title: 'Batches', component: BatcheslistPage, icon: 'contacts', color: 'fagrey' },
    { title: 'Schedules', component: SchedulePage, icon: 'calendar', color: 'fagrey' },
    { title: 'Attendance', component: AttendancePage, icon: 'map', color: 'fagrey' },
    { title: 'Exams', component: ExamquestionPage, icon: 'information-circle', color: 'fagrey' },
    { title: 'Exam-schedule', component: ExamschedulePage, icon: 'cog', color: 'fagrey' },
    { title: 'Logout', component: LoginPage, icon: 'log-in', color: 'fagrey' }
  ];
  nam
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    public dbserviceProvider: DBserviceProvider,
    private codePush:CodePush
    
  ) {

    this.name = localStorage.staffname;
    this.staffid = localStorage.staffId;
    this.staffemail = localStorage.staffemail;
    this.staffimage = localStorage.staffimagepath;
    this.i=localStorage.index;
    console.log(this.staffid)
    if (this.staffid == undefined) {
      this.rootPage = LoginPage;
    }
    else {
      this.rootPage = DashboardPage;

    }

    this.platform.ready().then(() => {
   
     this.triggerNotification();
     this.triggerCodepush();
    });
  }

  ionViewCanEnter() {
    this.name = localStorage.staffname;
    this.staffemail = localStorage.staffemail;
  }

  triggerCodepush(){
    if (this.platform.is('cordova')) {
    this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
    this.codePush.checkForUpdate('cF7KuFtpGAIC3QFP2Mt8BG1f1pEC6f3f93f1-5d03-49dd-be92-7a9eae88a6a4');
    this.codePush.getCurrentPackage().then(res=>console.log(res));
    
    const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
    this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
  }
  }

  triggerNotification(){
    if (this.platform.is('cordova')) {
    this.oneSignal.startInit('6127d1cd-9494-465c-965e-57391ca0ba5b', '230899989419');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
    if(data.notification.payload.body == "Schedules")
    {
    this.rootPage=SchedulePage;      
    }
    console.log(data)
    console.log('didOpenRemoteNotificationCallBack: ' + JSON.stringify(data));   
    })

    this.oneSignal.getPermissionSubscriptionState()
    .then((msg) =>{
      console.log(JSON.stringify(msg));
    });
    this.oneSignal.endInit();


    this.oneSignal.getIds().then((data) => {
      console.log(data);
      console.log(data.userId)
      localStorage.staffdeviceid=data.userId;
    })

    // this.oneSignal.getTags().then((data) => {
    //   console.log(data);
    //   // console.log(data.userId)
    //   // localStorage.staffdeviceid=data.userId;
    // })
  }
}


  openPage(page: PageInterface,index) {
     if(page.title == "Logout")
    {
      this.i=0;
    }
    else{
    this.i=index;       
    }
    localStorage.index=index;
    this.name = localStorage.staffname;
    this.staffemail = localStorage.staffemail;
    this.staffimage = localStorage.staffimagepath;
    this.nav.setRoot(page.component);
  }


  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.triggerCodepush();
     this.triggerNotification();
      this.splashScreen.hide();

    });
  }

  isActive(page: PageInterface) {
    // let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    // if (childNav) {
    //   if (childNav.getSelected() && childNav.getSelected().root === page.component) {
    //   // if (childNav.getSelected()) {

    //     return 'primary';
    //   }
    //   return;
    // }

    if (this.nav.getActive() && this.nav.getActive().name === page.component) {
      return 'primary';
    }
    return;
  }
}
