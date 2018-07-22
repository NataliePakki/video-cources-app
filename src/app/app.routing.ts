
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
    {
        path: 'courses',
        data: {
            breadcrumb: 'Courses'
        },
        component: CourseListComponent,
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
    { path: '**', redirectTo: 'courses' }
];

export const routing = RouterModule.forRoot(appRoutes);
