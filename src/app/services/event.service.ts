import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  listeners = {};
  eventsSubject = new Subject();
  events;

  constructor() {
    this.events = this.eventsSubject.asObservable();

    this.events.subscribe(
        ({name, args}) => {
            if (this.listeners[name]) {
                for (const listener of this.listeners[name]) {
                    listener(...args);
                }
            }
        });
  }

  on(name, listener) {
      if (!this.listeners[name]) {
          this.listeners[name] = [];
      }

      this.listeners[name].push(listener);
  }

  broadcast(name, ...args) {
      this.eventsSubject.next({
          name,
          args
      });
  }
}
