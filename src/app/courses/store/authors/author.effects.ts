import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import {
  Load,
  LoadFail,
  LoadSuccess,
  AuthorActionTypes,
} from './author.actions';
import { Author } from '../../models/author.model';
import { AuthorsService } from '../../services';

@Injectable()
export class AuthorsEffects {
  @Effect()
  loadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType(AuthorActionTypes.Load),
    map((action: Load) => action.payload.textFragment),
    mergeMap((textParameter: string) => this.authorService.getWithParams(textParameter)),
    map((authors: Author[]) => new LoadSuccess({ authors })),
    catchError(error => of(new LoadFail(error))
    )
  );

  constructor(private actions$: Actions, private authorService: AuthorsService) {}
}
