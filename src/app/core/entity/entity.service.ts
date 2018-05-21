import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Entity } from './entity';
import { Event, EVENT } from '../event';
import { AuthService } from '../auth';
import { environment as ENV } from '../../../environments/environment';

export abstract class EntityService<ENTITY extends Entity> {
  protected apiPath: string;
  protected httpClient: HttpClient;
  protected authService: AuthService;
  private subject: BehaviorSubject<Event>;
  private _headers: HttpHeaders;

  public get events(): Observable<Event> {
    return this.subject.asObservable();
  }

  public get headers(): HttpHeaders {
    return this._headers;
  }

  constructor() {
    this.apiPath = ENV.apiUrl;
    this.subject = new BehaviorSubject<Event>(new Event(EVENT.INIT));
    this._headers = new HttpHeaders();
  }

  protected initialize() {
    this.authService.loggedIn.subscribe((account) => {
      this._headers = new HttpHeaders({
        'Authorization': 'Bearer ' + account.token
      });
    });
  }

  eventsByType(type: EVENT): Observable<any> {
    return this.events
      .filter((event: Event) => event.type === type)
      .map((event: Event) => event.data);
  }

  create(entity: ENTITY): Observable<ENTITY> {
    this.httpClient.post(this.apiPath, entity, {headers: this.headers})
      .subscribe((entity) => {
        this.subject.next(new Event(EVENT.ADD, entity));
      });
  	return this.eventsByType(EVENT.ADD);
  }

  delete(entity: ENTITY): Observable<ENTITY> {
    this.httpClient.delete(this.apiPath + '/' + entity.id, {headers: this.headers})
      .subscribe(() => {
        this.subject.next(new Event(EVENT.DELETE, entity));
      })
    return this.eventsByType(EVENT.DELETE)
      .filter((data:ENTITY) => data.id === entity.id);
  }

  get(id: number): Observable<ENTITY> {
    this.httpClient.get(this.apiPath + '/' + id, { headers: this.headers})
        .subscribe((entity: any) => {
      this.subject.next(new Event(EVENT.GET, this.getNew().clone(entity)));
    });
    return Observable.merge(this.eventsByType(EVENT.GET), this.eventsByType(EVENT.UPDATE));
  }

  abstract getNew(): ENTITY;

  list(): Observable<Array<ENTITY>> {
    this.httpClient.get(this.apiPath, {headers: this.headers})
      .subscribe((list: Array<Entity>) => {
        this.subject.next(new Event(EVENT.LIST, list.map((entity) => this.getNew().clone(entity))));
      });
  	return this.eventsByType(EVENT.LIST);
  }

  update(entity: ENTITY): Observable<ENTITY> {
    this.httpClient.put(this.apiPath, entity, {headers: this.headers})
      .subscribe((entity: Entity) => {
        this.subject.next(new Event(EVENT.UPDATE, this.getNew().clone(entity)));
      })
    return this.eventsByType(EVENT.LIST)
      .filter((data:ENTITY) => data.id === entity.id);
  }
}
