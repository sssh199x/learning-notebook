// 🤔 Why Two Routes with path: ''?
// This might seem confusing! Here's why:

// First path: '': Has pathMatch: 'full' - only matches exactly /
// Second path: '': No pathMatch - matches any route as a parent


import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect root to dashboard
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  // Main application routes with main-content layout
  {
    path: '',
    loadComponent: () => import('./layout/main-content/main-content.component').then(m => m.MainContentComponent),
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard - Learning Notebook'
      }
    ]
  },

  // 404 Page
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];