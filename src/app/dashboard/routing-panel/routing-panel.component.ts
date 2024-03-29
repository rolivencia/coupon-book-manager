import { Component, OnDestroy, OnInit } from "@angular/core";
import { User } from "@app/_models";
import { Subscription } from "rxjs";
import {
  AlertService,
  AuthenticationService,
  UserService
} from "@app/_services";
import { first } from "rxjs/operators";
import { RoutingPanelService } from "@app/dashboard/routing-panel/routing-panel.service";

@Component({
  selector: "app-routing-panel",
  templateUrl: "./routing-panel.component.html",
  styleUrls: ["./routing-panel.component.scss"]
})
export class RoutingPanelComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    public routingPanelService: RoutingPanelService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  notImplemented(route: string) {
    this.alertService.error("Módulo no implementado.", true);
  }
}
