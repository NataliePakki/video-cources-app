import { EntityState } from '@ngrx/entity';
import { Author } from '../../models/author.model';

export interface AuthorState extends EntityState<Author> {}
