import { Component, ViewChild } from '@angular/core';


import { Platform } from 'ionic-angular';


// declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  // @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor( public platform: Platform) {
  }


}
