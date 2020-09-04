import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Data} from '@angular/router';

@Component({
  selector: 'app-dashboard-detailsdrawer',
  templateUrl: './dashboard-detailsdrawer.component.html',
  styleUrls: ['./dashboard-detailsdrawer.component.css']
})
export class DashboardDetailsdrawerComponent implements OnChanges {

  // Variables
  @Input() listOfUsers: Data[] = [];
  drawerVisible: boolean;

  constructor() {
    this.drawerVisible = false;
  }

  ngOnChanges(): void {
  }

  // Methods
  closeDrawer(): void  {
    this.drawerVisible = false;
  }
  openDrawer(): void {
    this.drawerVisible = true;
  }


}
