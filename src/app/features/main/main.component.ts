import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PopUpService} from "../../shared/services/pop-up.service";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  public popupVisible: boolean = false;
  private popupSubscription: Subscription | undefined;

  constructor(private popupService: PopUpService) {
  }

  ngOnInit() {
    this.popupSubscription = this.popupService.showPopup().subscribe((isVisible) => {
      this.popupVisible = isVisible;
    })
    // Удалить попап при уходе с главной страницы
    window.addEventListener('beforeunload', () => {
      this.popupService.hidePopup();
    });
  }

  ngAfterViewInit() {
    // Инициализация jQuery после полной загрузки представления
    $("#accordion").accordion({
      collapsible: true,
      heightStyle: "content"
    });
  }

  ngOnDestroy() {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }
}
