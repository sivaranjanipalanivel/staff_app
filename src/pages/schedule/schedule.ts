import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { AddschedulePage } from '../addschedule/addschedule';
import { DBserviceProvider } from '../../providers/d-bservice/d-bservice';
import { DatePipe } from '@angular/common'; 
import { ScheduleDetailPage } from '../schedule-detail/schedule-detail';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  providers: [DatePipe]
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  @Input('inputDate') currentDate: Date = new Date();
  @Input() events: any = [];
  @Input() disablePastDates: boolean = false;
  @Input() weekDaysToDisable: number[] = [];
  @Input() daysToDisable: number[] = [];
  @Input() useSwipe: boolean = true;
  @Input() showEventsList: boolean = true;
  @Input() showTodayButton: boolean = true;
  @Input() todayText: string = "Today";
  @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEventClicked: EventEmitter<any> = new EventEmitter<any>();

  weekDays: string[] = [];
  pastDates: number[] = [];
  rows = [];
  stop = false;
  todayEvents = [];
  absent: any = [];
  flag = 0;
  monthcount: any = 0;

  dayIndex = 0;
  queryText = '';
  segment = 'Today';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  no_sch_tom:any;
  no_sch_today:any;
  no_sch_week:any;
  tasklist: any;
  notes: any = [];
  schedule: any = [];
  tomorrow_schedule: any = [];
  week_schedule: any = [];
  is_week:any;
  is_torrow:any;
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public user: UserData,
    private datePipe: DatePipe,
    public dbserviceProvider: DBserviceProvider
  ) {
    this.presentLoadingDefault();
    this.adminschedule();
    this.setUpWeekDaysLabels();
       this.is_week=false;
       this.is_torrow=false;
    
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading Please Wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }
  adminschedule() {
    this.schedule =[];
    this.notes=[];
    
    this.dbserviceProvider.getadminschedule(localStorage.staffId)
      .subscribe(data => {
        let sched: any = data;
        for (var i = 0; i < sched.length; ++i) {
          var d = sched[i].name;
          d = d.replace(" ", "");
          sched[i].letter = d[0];
          sched[i].tracks = "Food"
          sched[i].color = "f54337"
          var dt = new Date(sched[i].dateadded);
          var dt1 = dt.getMonth()
          sched[i].dateaddedd = dt.getDate() + "/" + dt1 + "/" + dt.getFullYear();
          var dt2 = new Date();
          var dt3 = dt2.getMonth()
          var dt4 = dt2.getDate() + "/" + dt3 + "/" + dt2.getFullYear();
          if (sched[i].dateaddedd == dt4) {
            this.schedule.push(sched[i]);
          }
         
          console.log(this.schedule);

        }
        if (this.schedule.length == 0)
          this.no_sch_today = true;

      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }
  ionViewDidLoad() {
  }
  week() {
     if(!this.is_week){
       this.is_week=true;
    this.presentLoadingDefault();
    this.dbserviceProvider.getadminweekschedule(localStorage.staffId)
      .then(data => {
        this.week_schedule = data;
        console.log(data)
        if (this.week_schedule.length == 0)
          this.no_sch_week = true;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    }
  }
  tomorrow() {
    if(!this.is_torrow)
    {
     this.is_torrow=true;
     this.presentLoadingDefault();
     this.dbserviceProvider.getadmintomorrowschedule(localStorage.staffId)
      .then(data => {
        this.tomorrow_schedule=data;
        if(this.tomorrow_schedule.length == 0)
          this.no_sch_tom=true;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    }
  }
  updateSchedule() {
  }
  addschedule() {
    this.navCtrl.push(AddschedulePage);
  }
  doRefresh(refresher: Refresher) {
    this.adminschedule();
    setTimeout(function(){
      refresher.complete();
    
    },1000)
    
  }
  goto_batchDetail(schdule_detail){
    this.navCtrl.push(ScheduleDetailPage, { schdule_detail: schdule_detail});
  }





  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  setUpWeekDaysLabels() {
    let date = new Date(2017, 0, 1); /* This date has to be a Sunday */
    for (let i = 0; i < 7; i++ , date.setDate(date.getDate() + 1)) {
      let str: string = this.datePipe.transform(date, "EEE");
      str = str[0].toUpperCase() + str.slice(1);
      this.weekDays.push(str);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    /* If the currentDate was changed outside (in the parent component), we need to call this.calc() */
    /* But only if the month is changed */
    if (changes["currentDate"] && !changes["currentDate"].isFirstChange()) {
      if (changes["currentDate"].currentValue.getMonth() != changes["currentDate"].previousValue.getMonth()) {
        this.calc();
      }
    }

    if (changes["events"] && !changes["events"].isFirstChange()) {
      let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("hasEvents");
      let n: number = listToRemoveClasses.length;

      for (let i = 0; i < n; i++)
        if (listToRemoveClasses[0])
          listToRemoveClasses[0].classList.remove("hasEvents"); /* Using index zero because the object is updated after we remove an item */

      this.setHasEventsClass();
      this.showTodayEvents();
    }
  }

  ngAfterViewInit() {
    /* Calls `this.calc()` after receiving an initial date */
    this.currentDate.setHours(0, 0, 0, 0);

    setTimeout(() => {
      this.calc();
      this.updateSelectedDate();
    });
  }

  setHasEventsClass() {
    let firstDayOfTheMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );

    let lastDayOfTheMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    if (this.events)
      this.events.forEach((item, index) => {
        if (item.starts.getTime() >= firstDayOfTheMonth.getTime() && item.ends.getTime() < lastDayOfTheMonth.getTime()) {
          if (document.getElementById("calendar-day-" + item.starts.getDate()))
            document.getElementById("calendar-day-" + item.starts.getDate()).classList.add('hasEvents');
        }
      });
  }

  setTodayClass() {
    /* Checks if the selected month and year are the current */
    let tmp = new Date();
    if (tmp.getFullYear() == this.currentDate.getFullYear() && tmp.getMonth() == this.currentDate.getMonth()) {
      var element = document.getElementById("calendar-day-" + tmp.getDate());
      if (element) {
        element.classList.remove("button-clear", "button-clear-md");
        element.classList.add("button-outline", "button-outline-md");
      }
    }
  }

  setSelectedClass() {
    /* Removes previous selectedDate class */
    let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("selected");
    let n: number = listToRemoveClasses.length;
    for (let i = 0; i < n; i++)
      listToRemoveClasses[0].classList.remove("selected"); /* Using index zero because the object is updated after we remove an item */


    var element = document.getElementById("calendar-day-" + this.currentDate.getDate());
    if (element)
      element.classList.add("selected");
  }

  setToday() {
    let tmp = new Date();
    tmp.setHours(0, 0, 0, 0);

    let calc: boolean = tmp.getMonth() + "" + tmp.getFullYear() != this.currentDate.getMonth() + "" + this.currentDate.getFullYear();

    this.updateSelectedDate(tmp);
    // this.getattendances()


    calc && this.calc();
    this.dateClicked(tmp.getDate());
  }

  /**
   * Recalculates the rows and columns needed to represent the new month selected
   */
  calc() {
    /* Resets the rows */
    this.rows = [];

    let tmp = new Date(this.currentDate.getTime()); tmp.setDate(1);

    while (tmp.getMonth() == this.currentDate.getMonth()) {
      /* Pushes a new empty row */
      this.rows.push(['', '', '', '', '', '', '']);
      while (tmp.getDay() < 6 && tmp.getMonth() == this.currentDate.getMonth()) {
        /* Populates the row only where needed */
        // if(this.absent.attendance.attendanace_date.getDay())
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
        tmp.setDate(tmp.getDate() + 1);
      }
      if (tmp.getMonth() == this.currentDate.getMonth())
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
      tmp.setDate(tmp.getDate() + 1);
    }

    setTimeout(() => {
      /* Needs to be executed only after the DOM has been updated */
      this.setHasEventsClass();
      this.setTodayClass();
      this.disableDates();
    });
  }

  disableDates() {
    // Disabling past dates
    if (this.disablePastDates) {
      this.pastDates = [];
      let today = new Date();
      // Checks if the current month is being shown
      if (today.getFullYear() == this.currentDate.getFullYear() && today.getMonth() == this.currentDate.getMonth()) {
        // If current month is being shown, disable only the past days
        for (let i = 1; i < today.getDate(); i++) {
          this.pastDates.push(i);
        }
      } else if (this.currentDate.getTime() < today.getTime()) {
        // If a previous month is being show (disable all days)
        for (let i = 1; i <= 31; i++) {
          this.pastDates.push(i);
        }
      }
    }

    // Disable chosen week days
    if (this.weekDaysToDisable.length) {

    }
  }

  /**
   * Function fired when a date is clicked
   * (no need to call this.calc() because the user can't click a date on a different month)
   * @param day number The day that was clicked
   */
  dateClicked(day) {
    let clickedDate = new Date(this.currentDate);
    clickedDate.setDate(day);
   
    
    this.updateSelectedDate(clickedDate);
    this.dbserviceProvider.getadminselectedschedule(localStorage.staffId, this.datePipe.transform(clickedDate, "y-MM-d"))
      .then(data => {
        this.notes = data;
        console.log(this.notes);
        // if (this.notes.length == 0)
          // this.no_sch_today = true;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    // this.getattendances()
  }

  /**
   * Subtracts a month on currentDate
   */
  previousMonth() {
    let tmp = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      this.currentDate.getDate()
    );

    // this.getattendances()

    /* Prevents skipping a month if the previous month doesn't have the selected day */
    /* Ex: Mar 31st -> Feb 28th (because Feb doesn't have a 31st) */
    while (tmp.getMonth() > this.currentDate.getMonth() - 1 && tmp.getFullYear() == this.currentDate.getFullYear()) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.updateSelectedDate(tmp);

    this.calc();
  }

  /**
   * Adds a month on currentDate
   */
  nextMonth() {
    let tmp = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      this.currentDate.getDate()
    );

    // this.getattendances()

    /* Prevents skipping a month if the next month doesn't have the selected day */
    /* Ex: Jan 31st -> Feb 28th (because Feb doesn't have a 31st) */
    while (tmp.getMonth() > this.currentDate.getMonth() + 1) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.updateSelectedDate(tmp);

    this.calc();
  }

  updateSelectedDate(newDate: Date = null) {
    if (newDate) {
      this.currentDate = newDate;
    }

    this.onChange.emit(this.currentDate);

    setTimeout(() => {
      this.showTodayEvents();
      this.setSelectedClass();
    });
  }

  showTodayEvents() {
    let tmp = [];

    /* Checks for events on the new selected date */
    this.events.forEach((item) => {
      var itemDay = new Date(item.starts);
      itemDay.setHours(0, 0, 0, 0);

      if (itemDay.getTime() == this.currentDate.getTime())
        tmp.push(item);
    });
    this.todayEvents = tmp;
  }

  eventClicked(event) {
    this.onEventClicked.emit(event);
  }
  calendar(){
    this.setToday();
    this.adminschedule();
    // let clickedDate = new Date(this.currentDate);
    // clickedDate.setDate(day);
    // this.dateClicked(clickedDate) 
    
  }
}
