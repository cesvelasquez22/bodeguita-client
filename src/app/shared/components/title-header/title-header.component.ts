import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent implements OnInit {

  @Input('title') title:string;
  @Input('icon') icon:string;
  @Input('section') section:string;
  @Input('color') color:string = 'accent';

  constructor(private router:Router) 
  {
    if(!this.section){
      let url: string[] = this.router.url.split('/');
      this.section = url[1];
    }
  }

  ngOnInit() {
  }

}
