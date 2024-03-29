import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportRedeemedCouponsComponent } from "./report-redeemed-coupons.component";
import { ReportRedeemedCouponsRoutingModule } from "@app/dashboard/report-management/report-redeemed-coupons/report-redeemed-coupons-routing.module";
import { ReportRedeemedCouponsService } from "@app/dashboard/report-management/report-redeemed-coupons/report-redeemed-coupons.service";
import { WjGridModule } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { WjInputModule } from "wijmo/wijmo.angular2.input";

@NgModule({
  declarations: [ReportRedeemedCouponsComponent],
  imports: [
    CommonModule,
    ReportRedeemedCouponsRoutingModule,
    WjGridFilterModule,
    WjGridModule,
    WjInputModule
  ],
  providers: [ReportRedeemedCouponsService]
})
export class ReportRedeemedCouponsModule {}
