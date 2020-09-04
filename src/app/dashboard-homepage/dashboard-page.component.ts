import {Component, OnInit, ViewChild} from '@angular/core';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import {UsermanagementService} from '../_services/usermanagement.service';
import {Data} from '@angular/router';
import {DashboardDetailsdrawerComponent} from '../dashboard-detailsdrawer/dashboard-detailsdrawer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  // : [DashboardDetailsdrawerComponent]
})
export class DashboardPageComponent implements OnInit {

  // Variables
  listOfUsers: Data[] = [];
  @ViewChild(DashboardDetailsdrawerComponent) detailsdrawerComponent: DashboardDetailsdrawerComponent;


  // Constructor
  constructor(private usermanager: UsermanagementService) {}

  ngOnInit(): void {
    // this.listOfUsers = null;
    this.usermanager.getUserHttpGet(0, 200).subscribe(
      returned => {
        console.log('[UserTable] Returned an Object:');
        console.log(returned);
        this.listOfUsers = returned.data;
      },
      error => {
        console.log('[UserTable] There is an error: ' + error);
      },
      () => {
        console.log('[UserTable] Completed everything!');
      }
    );
  }

}
