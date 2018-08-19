import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../../services';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading = true;
  private loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    const self = this;
    this.loadingSubscription = this.loadingService.loading().pipe(debounceTime(500)).subscribe((loading) => {
      self.loading = loading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
