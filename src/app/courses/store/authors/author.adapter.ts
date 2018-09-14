import { createEntityAdapter } from '@ngrx/entity';
import { Author } from '../../models/author.model';

export const adapter = createEntityAdapter<Author>();

export const {
    selectIds: selectAuthorIds,
    selectEntities: selectAuthorEntities,
    selectAll: selectAllAuthors,
    selectTotal: authorsCount

 } = adapter.getSelectors();

