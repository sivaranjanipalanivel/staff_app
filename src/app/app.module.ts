import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';

import { BatchesPage } from '../pages/Batches/Batches';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs/tabs';
import { SupportPage } from '../pages/support/support';
import { AttendancePage } from '../pages/attendance/attendance';
import { BatcheslistPage } from '../pages/batcheslist/batcheslist';
import { AssignmentdetailPage } from '../pages/assignmentdetail/assignmentdetail';
import { AddassignmentPage } from '../pages/addassignment/addassignment';
import { EditassignmentPage } from '../pages/editassignment/editassignment';
import { ExamquestionPage } from '../pages/examquestion/examquestion';
import { AddExamPage } from '../pages/add-exam/add-exam';
import { ScheduleStatusPage } from '../pages/schedule-status/schedule-status';
import { EditassignstudentPage } from '../pages/editassignstudent/editassignstudent';
import { SendmessagePage } from '../pages/sendmessage/sendmessage';
import { DiscussiondetailPage } from '../pages/discussiondetail/discussiondetail';
import { StudentviewPage } from '../pages/studentview/studentview';
import { ExamcriteriaPage } from '../pages/examcriteria/examcriteria';
import { EditexamcriteriaPage } from '../pages/editexamcriteria/editexamcriteria';
import { AddexamcriteriaPage } from '../pages/addexamcriteria/addexamcriteria';
import { ExamdetailPage } from '../pages/examdetail/examdetail';
import { AddschedulePage } from '../pages/addschedule/addschedule';
import { ScheduleDetailPage } from '../pages/schedule-detail/schedule-detail';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { FeeDetailPage } from '../pages/fee-detail/fee-detail';
import { ExamResultPage } from '../pages/exam-result/exam-result';
import { ExamschedulePage } from '../pages/examschedule/examschedule';
import { EditexamPage } from '../pages/editexam/editexam';
import { StudentlistPage } from '../pages/studentlist/studentlist';
import { RecordpaymentPage } from '../pages/recordpayment/recordpayment';

import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
// import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';
import { UserData } from '../providers/user-data';
import { DBserviceProvider } from '../providers/d-bservice/d-bservice';
import { CapitalizePipe, ColorPipe, CPipe, lettrcriclePipe , staffnamePipe,batchnamePipe } from './pipe';
import { AttendanceDetailPage } from '../pages/attendance-detail/attendance-detail';
import { FileTransfer } from '@ionic-native/file-transfer';
import { MomentModule } from 'angular2-moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { OneSignal } from '@ionic-native/onesignal';
import { CodePush } from '@ionic-native/code-push';


@NgModule({
  declarations: [
    ConferenceApp,
    BatchesPage,
    LoginPage,
    MapPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    SupportPage, 
    AttendancePage,
    BatcheslistPage,
    AssignmentdetailPage,
    AddassignmentPage,
    ExamquestionPage,
    AddExamPage,
    ScheduleStatusPage,
    CapitalizePipe, ColorPipe,
    AttendanceDetailPage,
    EditassignmentPage,
    EditassignstudentPage,
    SendmessagePage,
    DiscussiondetailPage,
    CPipe, lettrcriclePipe,staffnamePipe,
    StudentviewPage, 
    ExamcriteriaPage,
    EditexamcriteriaPage,
    AddexamcriteriaPage,
    ExamdetailPage,
    AddschedulePage,
    ScheduleDetailPage,
    DashboardPage,
    batchnamePipe,
    FeeDetailPage,
    ExamResultPage,
    ExamschedulePage,
    EditexamPage,
    StudentlistPage,
    RecordpaymentPage

  ],
  imports: [
    BrowserModule,
    HttpModule, MomentModule,
    IonicModule.forRoot(ConferenceApp, {mode:'md',prodMode: true}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: BatchesPage, name: 'BatchesPage', segment: 'batchespage' },
        { component: AttendancePage, name: 'AttendancePage', segment: 'attendancepage' },
        { component: BatcheslistPage, name: 'BatcheslistPage', segment: 'Batcheslistpage' },
        { component: AssignmentdetailPage, name: 'AssignmentdetailPage', segment: 'assignmentdetailPage' },
        { component: ExamquestionPage, name: 'ExamquestionPage', segment: 'examlistpage' },
        { component: AttendanceDetailPage, name: 'AttendanceDetailPage', segment: 'attendancedetail' },
        { component: DiscussiondetailPage, name: 'DiscussiondetailPage', segment: 'discussiondetail' },
        { component: StudentviewPage, name: 'StudentviewPage', segment: 'studentdetail' },
        { component: ExamcriteriaPage, name: 'ExamcriteriaPage', segment: 'examcriteria' },
        { component: ExamdetailPage, name: 'ExamdetailPage', segment: 'examdetail/:detailid' },
        { component: AddschedulePage, name: 'AddschedulePage', segment: 'AddschedulePage' },
        { component: ScheduleDetailPage, name: 'ScheduleDetailPage', segment: 'ScheduleDetailPage' },
        { component: DashboardPage, name: 'DashboardPage', segment: 'DashboardPage' },
        { component: FeeDetailPage, name: 'FeeDetailPage', segment: 'invoicedetails' },
        { component: ExamResultPage, name: 'ExamResultPage', segment: 'examresultspage' },
        { component: ExamschedulePage, name: 'ExamschedulePage', segment: 'examschedulepage' },
        { component: EditexamPage, name: 'EditexamPage', segment: 'editexampage' },
        { component: StudentlistPage, name: 'StudentlistPage', segment: 'studentlistpage' }

      ]
    }),
    IonicStorageModule.forRoot()
  ],   
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    BatchesPage,
    LoginPage,
    MapPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    SupportPage, 
    AttendancePage,
    BatcheslistPage,
    AssignmentdetailPage,
    AddassignmentPage,
    ExamquestionPage,
    AddExamPage,
    // DatePicker,
    ScheduleStatusPage,
    AttendanceDetailPage,
    EditassignmentPage,
    EditassignstudentPage,
    SendmessagePage,
    DiscussiondetailPage,
    StudentviewPage,
    ExamcriteriaPage,
    EditexamcriteriaPage,
    AddexamcriteriaPage,
    ExamdetailPage,
    AddschedulePage,
    ScheduleDetailPage,
    DashboardPage,
    FeeDetailPage,
    ExamResultPage,
    ExamschedulePage,
    EditexamPage,
    StudentlistPage,
    RecordpaymentPage

  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OneSignal,
    CodePush,
    UserData, 
    Camera,
    FileTransfer,
    File,
    SplashScreen,
    // DatePicker,
    DBserviceProvider
  ]
})
export class AppModule { }
