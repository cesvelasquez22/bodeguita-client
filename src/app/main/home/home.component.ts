import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dateNow = Date.now();

  constructor() {
    setInterval(() => {
        this.dateNow = Date.now();
    }, 1000);
  }

  ngOnInit(): void {
  }

}
