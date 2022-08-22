import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.css']
})
export class DailogComponent implements OnInit {
  @Input() isRemove = false;

  constructor() { }

  ngOnInit(): void {
  }
  remove(){
    this.isRemove =true
  }

}
