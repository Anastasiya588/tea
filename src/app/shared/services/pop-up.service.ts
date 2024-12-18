import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopUpService implements OnDestroy{
  private unsubscribe$ = new Subject<void>();
  private popupVisible$ = new Subject<boolean>();
  constructor() { }

  showPopup(): Observable<boolean> {
    //таймер, чтобы показать pop-up через 10 секунд
    const timer$ = timer(10000);

    timer$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.popupVisible$.next(true);
      });

    return this.popupVisible$.asObservable();
  }

  hidePopup() {
    this.popupVisible$.next(false);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
