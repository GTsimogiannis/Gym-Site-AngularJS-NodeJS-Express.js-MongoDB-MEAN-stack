import { Component, OnInit } from '@angular/core';
import { dietPlan, lowCarbDietPlans } from './diet-plans-data2';

@Component({
  selector: 'app-diet-page2',
  templateUrl: './diet-page2.component.html',
  styleUrls: ['./diet-page2.component.css']
})
export class DietPageComponent2 implements OnInit {

  tabArray = [
    { id: 1, label: "BreakFast" },
    { id: 2, label: "Snack" },
    { id: 3, label: "Lunch" },
    { id: 4, label: "Snack" },
    { id: 5, label: "Dinner" }

  ]

  dietPlans: Array<dietPlan> = lowCarbDietPlans

  constructor() { }

  ngOnInit(): void {
  }

}
