import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
    @Input() title: string;
    @Input() statsNumber: number;
    @Input() numberFg: string;

  constructor() { }

  ngOnInit(): void {
  }

}
