import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { LayoutService } from '../../core/services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  private layoutService = inject(LayoutService);

  // Access layout state
  public readonly sidebarCollapsed = this.layoutService.sidebarCollapsed;

  // Method to close sidebar
  closeSidebar(): void {
    this.layoutService.collapseSidebar();
  }
}