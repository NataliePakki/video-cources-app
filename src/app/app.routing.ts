
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateCourseListItemComponent } from './course-list/create-course-list-item/create-course-list-item.component';

const appRoutes: Routes = [
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
            }
        ]
        // canActivate: [AuthGuard]
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

    // otherwise redirect to home
    { path: '**', redirectTo: 'courses/list' }
];

export const routing = RouterModule.forRoot(appRoutes);
