import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Entity } from './entity';
import { Event, EVENT } from './event';
import { environment as ENV } from '../environments/environment';

export abstract class BaseService<ENTITY extends Entity> {
  protected apiPath: string;
  protected httpClient: HttpClient
  private subject: BehaviorSubject<Event>;

  public get events(): Observable<Event> {
    return this.subject.asObservable();
  }

  constructor() {
    this.apiPath = ENV.apiUrl;
    this.subject = new BehaviorSubject<Event>(new Event(EVENT.INIT));
  }

  eventsByType(type: EVENT): Observable<any> {
    return this.events
      .filter((event: Event) => event.type === type)
      .map((event: Event) => event.data);
  }

  create(entity: ENTITY): Observable<any> {
    this.httpClient.post(this.apiPath, entity)
      .subscribe((entity) => {
        this.subject.next(new Event(EVENT.ADD, entity));
      });
  	return this.eventsByType(EVENT.ADD);
  }

  delete(entity: ENTITY): Observable<any> {
    this.httpClient.delete(this.apiPath + '/' + entity.id)
      .subscribe((entity: Entity) => {
        this.subject.next(new Event(EVENT.DELETE, entity));
      })
    return this.eventsByType(EVENT.DELETE);
  }

  get(id: number): Observable<any> {
    this.httpClient.get(this.apiPath + '/' + id)
      .subscribe((data: any) => {
        this.subject.next(new Event(EVENT.GET, data));
      });
    return this.eventsByType(EVENT.GET);
  }

  list(): Observable<any> {
    this.httpClient.get(this.apiPath)
      .subscribe((list: Array<Entity>) => {
        this.subject.next(new Event(EVENT.LIST, list));
      });
  	return this.eventsByType(EVENT.LIST);
  }

  update(entity: ENTITY): Observable<any> {
    this.httpClient.put(this.apiPath, entity)
      .subscribe((entity: Entity) => {
        this.subject.next(new Event(EVENT.UPDATE, entity));
      })
    return this.eventsByType(EVENT.LIST);
  }
}
