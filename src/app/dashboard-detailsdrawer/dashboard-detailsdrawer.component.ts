import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-detailsdrawer',
  templateUrl: './dashboard-detailsdrawer.component.html',
  styleUrls: ['./dashboard-detailsdrawer.component.css']
})
export class DashboardDetailsdrawerComponent implements OnInit {

  // Variables
  drawerVisible: boolean;

  constructor() {
    this.drawerVisible = true;
  }

  ngOnInit(): void {
  }

  // Methods
  closeDrawer(): void  {
    this.drawerVisible = false;
  }
  openDrawer(): void {
    this.drawerVisible = true;
  }


}
