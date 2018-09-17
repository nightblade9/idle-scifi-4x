import { Component, OnInit, Inject } from '@angular/core';
import { Constants } from './../globals';
import { PlayerData } from '../services/playerdataservice';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(@Inject(PlayerData) private playerData:PlayerData) { }

  ngOnInit() {
  }

  get constants() {
    return Constants;
  }
}
