import { Component, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Author } from '../../models/author.model';

import { AuthorState } from '../../store/authors/author.state';
import * as authorsAction from '../../store/authors/author.actions';
import * as fromAuthor from '../../store/authors/author.reducer';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsComponent),
    multi: true
  }]
})
export class AuthorsComponent implements ControlValueAccessor {
  suggestedAuthors$: Observable<Author[]>;
  expand = false;

  onChange: Function;
  onTouched: Function;
  authors: Author[];

  constructor(private authorStore: Store<AuthorState>) {
    this.authors = [];
    this.authorStore.dispatch(new authorsAction.Load({textFragment: ''}));

    this.suggestedAuthors$ = this.authorStore.pipe(select(fromAuthor.selectAllAuthors));
  }

  get value() {
    return this.authors;
  }

  set value(value: Author[]) {
    this.authors = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  @HostListener('click') click() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  writeValue(obj: Author[]): void {
    this.authors = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  trigger() {
    this.expand = !this.expand;
  }

  remove(id: string) {
    this.authors = this.authors.filter(author => author.id !== id);
    this.onChange(this.authors);

  }

  add(author: Author) {
    if (!this.authors.some(a => a.id === author.id)) {
      this.authors.push(author);
      this.onChange(this.authors);
    }
  }

  onKey(value: string) {
    this.expand = value ? true : false;
    this.authorStore.dispatch(new authorsAction.Load({textFragment: value}));
  }
}
