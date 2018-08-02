
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateCourseListItemComponent } from './course-list/create-course-list-item/create-course-list-item.component';
import { EditCourseListItemComponent } from './course-list/edit-course-list-item/edit-course-list-item.component';
import { AuthGuard } from './guards/auth.guard';
import { NoContentComponent } from './no-content/no-content.component';

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'courses/list', pathMatch: 'full'
    },
    {
        path: 'courses',
        data: {
            breadcrumb: 'Courses'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: CourseListComponent,
                data: {
                    breadcrumb: 'List'
                },
            },
            {
                path: 'create',
                component: CreateCourseListItemComponent,
                data: {
                    breadcrumb: 'Create'
                }
            },
            {
                path: ':id',
                component: EditCourseListItemComponent,
                data: {
                    breadcrumb: 'View',
                }
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        data: {
            breadcrumb: 'Authorization'
        },
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    breadcrumb: 'Login'
                }
            }
        ]
    },

    // otherwise redirect to no-content
    { path: '**', component: NoContentComponent, data: {breadcrumb: '404'} }
];

export const routing = RouterModule.forRoot(appRoutes);
