import { Component, OnInit, Input, OnChanges } from '@angular/core';

  @Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit, OnChanges {

  @Input() isActive: boolean;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

}
