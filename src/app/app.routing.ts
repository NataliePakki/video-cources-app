
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
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
                component: CoursesComponent,
                data: {
                    breadcrumb: 'List'
                },
            },
            {
                path: 'create',
                component: CreateCourseComponent,
                data: {
                    breadcrumb: 'Create'
                }
            },
            {
                path: ':id',
                component: EditCourseComponent,
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
