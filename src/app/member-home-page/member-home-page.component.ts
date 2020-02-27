import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Policy } from '../policy';

@Component({
  selector: 'app-member-home-page',
  templateUrl: './member-home-page.component.html',
  styleUrls: ['./member-home-page.component.css']
})
export class MemberHomePageComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  policies:  Policy[];
  selectedPolicy:  Policy  = { id :  null , number:null, amount:  null};
  ssss; 
  gg;

  ngOnInit(): void {
    this.apiService.readPolicies().subscribe((policies: Policy[])=>{
      this.policies = policies;
      this.ssss = this.policies[2].number;
      this.gg = this.ssss.split(',');
      this.gg = this.gg[0];
      console.log(this.policies);
    })

  }
}
