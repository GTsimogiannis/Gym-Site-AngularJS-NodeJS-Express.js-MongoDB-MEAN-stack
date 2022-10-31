import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from "rxjs";
import { CouponPopup } from "../coupon-popup/coupon-popup.component";
import { Reservation } from "../reservations/reservation.model";
import { ReservationsService } from "../reservations/reservations.service";

@Component({
  selector: "app-diet",
  templateUrl: "./diet.component.html",
  styleUrls: ["./diet.component.css"],
})
export class DietComponent implements OnInit {
  dietForm: FormGroup;
  private reservationsSub: Subscription;
  reservations: Reservation[] = [];
  totalReservations = 0;
  userId: string;
  max : string;
  mu = 0;
  mn = 0;
  mov = 0;
  mob = 0;
  ml = 0;
  mm = 0;
  mh = 0;
  muml  =0;
  mumm  =0;
  mumh  =0;
  mnml  =0;
  mnmm  =0;
  mnmh  =0;
  movml =0;
  movmm =0;
  movmh =0;
  mobml =0;
  mobmm =0;
  mobmh =0;
  maxnormal = 0;
  maxlow = 0;
  maxprotein = 0;
  maxofmax =0;

  bmi = 0;
  ex = 0;

  constructor(public dialog: MatDialog, private fb: FormBuilder, public router: Router,
    public reservationsService: ReservationsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.openDialog();
    this.createForm();
    this.getReservation();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CouponPopup, {
      panelClass: ["animate__animated", "animate__slideInDown"],
      minWidth: "550px",
      minHeight: "400px"
    });
  }

  createForm() {
    this.dietForm = this.fb.group({
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
    })
  }

  getReservation() {
    this.userId = this.authService.getUserId();
    this.reservationsService.getReservationsById(this.userId);
    this.reservationsSub = this.reservationsService
      .getReservationUpdateListener()
      .subscribe((reservationData: { reservations: Reservation[]; reservationCount: number }) => {
        this.totalReservations = reservationData.reservationCount;
        this.reservations = reservationData.reservations;
        this.getTotalReservation()
      });
  }



  getTotalReservation() {
    // get today date
    let todayDate = new Date();
    // get one month back date
    let oneMonthBackDate = new Date();
    oneMonthBackDate.setMonth(oneMonthBackDate.getMonth() - 1);

    // filter reservation
    const confirmedReservation = this.reservations.filter((item: any) => {
      // converting  item  date into date format
      const splitDate = item.date.split("/");
      const month = splitDate[1] - 1;
      const day = splitDate[0];
      const year = splitDate[2];
      const reservationDate = new Date(year, month, day);
      console.log(reservationDate)
      // date convertion end

      return item.confirmed === "YES" && reservationDate.getTime() >= oneMonthBackDate.getTime() &&
        reservationDate.getTime() <= todayDate.getTime();
    });
    this.totalReservations = confirmedReservation.length;
  }

  onSubmit() {
    if (this.dietForm.invalid) {
      return
    }
    const redirectPage = this.generateDiet();
    const url = `${redirectPage}`
    this.router.navigate([url]);

  }

  // return a string for redirecting user to diet page
  generateDiet() {
    let age = this.dietForm.value.age;
    let weight = this.dietForm.value.weight;
    let height = this.dietForm.value.height;

    let bmi = (weight*10000) / (height * height);
    let ex = this.totalReservations
    this.bmi = bmi
    this.ex = ex

    if (bmi <20   ) {
      this.mu = 1;
      this.mn = 0;
      this.mov = 0;
      this.mob = 0;
    }
    if (bmi >= 20 && bmi < 22) {
      this.mu = 1-( ( bmi-20) /2 );
      this.mn = ( bmi-20) /2;
      this.mov = 0;
      this.mob = 0;
    }
    if (bmi >= 22 && bmi < 24) {
      this.mu =  0;
      this.mn = 1;
      this.mov = 0 ;
      this.mob = 0;
    }
    if (bmi >= 26 && bmi < 28) {
      this.mu = 0;
      this.mn =  1-( ( bmi-26) /2 );
      this.mov = ( bmi-26) /2 ;
      this.mob = 0;
    }
    if (bmi >= 28 && bmi < 30) {
      this.mu = 0;
      this.mn = 0;
      this.mov = 1;
      this.mob = 0;
    }
    if (bmi >= 30 && bmi < 32) {
      this.mu = 0;
      this.mn = 0;
      this.mov = 1;
      this.mob = 0;
    }
    if (bmi >= 32 && bmi < 34) {
      this.mu = 0;
      this.mn = 0;
      this.mov =  1-( ( bmi-32) /2 );
      this.mob = ( bmi-32) /2 ;
    }
    if (bmi >= 34) {
      this.mu = 0;
      this.mn = 0;
      this.mov = 0;
      this.mob = 1 ;
    }

    if (ex <8 ){
      this.ml = 1 ;
      this.mm = 0 ;
      this.mh = 0 ;
    }
    if (ex >=8  && ex < 10 ){
      this.ml = 1-( ( ex-8) /2 ) ;
      this.mm = ( ex-8) /2 ;
      this.mh = 0 ;
    }
    if (ex >=10  && ex < 12 ){
      this.ml = 0 ;
      this.mm = 1 ;
      this.mh = 0 ;
    }
    if (ex >=12  && ex < 14 ){
      this.ml = 0 ;
      this.mm = 1 ;
      this.mh = 0 ;
    }
    if (ex >=14  && ex < 16 ){
      this.ml = 0 ;
      this.mm = 1 ;
      this.mh = 0 ;
    }
    if (ex >=16  && ex < 18 ){
      this.ml = 0 ;
      this.mm = 1-( ( ex-16) /2 ) ;
      this.mh = ( ex-16) /2 ;
    }
    if (ex >=18   ){
      this.ml = 0 ;
      this.mm = 0 ;
      this.mh = 1 ;
    }

    console.log("BMI is : " ,this.bmi)
    console.log("BMI array","MU : " ,this.mu , " MN : " ,this.mn , " MOV : ",this.mov , " MOB : ",this.mob)

    console.log("Total Exercises are : " ,this.ex)
    console.log("Exercises array","ML : " ,this.ml , " MM : " ,this.mm , " MH : ",this.mh )

    //conjuction
    if (this.mu  >0  &&  this.ml >0)    {this.muml  = Math.min(this.mu ,this.ml ); console.log("Underweight and low exercise"," : => " , this.muml , " normaldiet    "); }
    if (this.mu  >0  &&  this.mm >0)    {this.mumm  = Math.min(this.mu ,this.mm ); console.log("Underweight and medium exercise"," : => " ,this.mumm , " proteindiet   "); }
    if (this.mu  >0  &&  this.mh >0)    {this.mumh  = Math.min(this.mu ,this.mh ); console.log("Underweight and high exercise"," : => " ,this.mumh , " proteindiet   "); }
    if (this.mn  >0  &&  this.ml >0)    {this.mnml  = Math.min(this.mn ,this.ml ); console.log("Normal and low exercise"," : => " ,this.mnml , " normaldiet    "); }
    if (this.mn  >0  &&  this.mm >0)    {this.mnmm  = Math.min(this.mn ,this.mm ); console.log("Normal and medium exercise"," : => " ,this.mnmm , " normaldiet    "); }
    if (this.mn  >0  &&  this.mh >0)    {this.mnmh  = Math.min(this.mn ,this.mh ); console.log("Normal and high exercise"," : => " ,this.mnmh , " proteindiet   "); }
    if (this.mov >0  &&  this.ml >0)    {this.movml = Math.min(this.mov,this.ml ); console.log("Overweight and low exercise"," : => " ,this.movml, " lowcaloriediet"); }
    if (this.mov >0  &&  this.mm >0)    {this.movmm = Math.min(this.mov,this.mm ); console.log("Overweight and medium exercise"," : => " ,this.movmm, " normaldiet    "); }
    if (this.mov >0  &&  this.mh >0)    {this.movmh = Math.min(this.mov,this.mh ); console.log("Overweight and high exercise"," : => " ,this.movmh, " proteindiet   "); }
    if (this.mob >0  &&  this.ml >0)    {this.mobml = Math.min(this.mob,this.ml ); console.log("Obese and low exercise"," : => " ,this.mobml, " lowcaloriediet"); }
    if (this.mob >0  &&  this.mm >0)    {this.mobmm = Math.min(this.mob,this.mm ); console.log("Obese and medium exercise"," : => " ,this.mobmm, " lowcaloriediet"); }
    if (this.mob >0  &&  this.mh >0)    {this.mobmh = Math.min(this.mob,this.mh ); console.log("Obese and high exercise"," : => " ,this.mobmh, " proteindiet   "); }

    //disconjuction
    this.maxnormal =  Math.max(this.muml , this.mnml ,this.mnmm ,  this.movmm);
    this.maxlow    =  Math.max( this.movml ,this.mobml,this.mobmm);
    this.maxprotein =  Math.max(this.mumm,this.mumh ,this.mnmh, this.movmh,this.mobmh);
    if (this.maxnormal >0 ) {console.log( "Normal Diet MAX :"      ,this.maxnormal )};
    if (this.maxlow    >0 ) {console.log( "Low calorie Diet MAX :" ,this.maxlow    )};
    if (this.maxprotein>0 ) {console.log( "Protein Diet MAX :" ,this.maxprotein)};

    this.maxofmax = Math.max(this.maxprotein,this.maxlow,this.maxnormal )

    if      (this.maxlow       ===  this.maxofmax  ){ this.max = 'maxlow'}
    else if (this.maxprotein   ===  this.maxofmax)  { this.max = 'maxprotein'}
    else if (this.maxnormal    ===  this.maxnormal)  { this.max = 'maxnormal'}
    else console.log("Problem with  max of max")

    console.log("max of max is : ",this.max)

    if      (this.max === 'maxnormal')  {console.log( "Recommended diet : ","normal diet")           ; return "normaldiet"}
    else if (this.max === 'maxprotein') {console.log( "Recommended diet : ","protein diet")          ; return "proteindiet"}
    else if (this.max === 'maxlow')     {console.log( "Recommended diet : ","low-calorie diet")      ; return "lowcaloriediet"}
    else return "normaldietgg"


  }


}
