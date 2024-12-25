import { Routes } from '@angular/router';
import { AuthGuard } from './core/gaurds/auth.guard';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	}, {
		path: 'auth',
		loadComponent() {
			return import('./auth/login/login.component').then(m => m.LoginComponent)
		},
	}, {
		path: 'auth/register',
		loadComponent() {
			return import('./auth/register/register.component').then(m => m.RegisterComponent)
		},
	}, {
		path: 'tasks',
		loadComponent() {
			return import('./tasks/task-list/task-list.component').then(m => m.TaskListComponent)
		},
		canActivate: [AuthGuard]
	}, {
		path: 'tasks/add',
		loadComponent() {
			return import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
		},
		canActivate: [AuthGuard]
	}, {
		path: 'tasks/edit/:taskId',
		loadComponent() {
			return import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
		},
		canActivate: [AuthGuard]
	}
];
