import { Component, OnInit } from '@angular/core';
import { Globals } from './../globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get globals() {
    return Globals;
  }  

}
