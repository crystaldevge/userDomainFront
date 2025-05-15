import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../../core/services/module.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-role-modules',
  standalone: false,
  templateUrl: './role-modules.component.html',
  styleUrl: './role-modules.component.scss'
})
export class RoleModulesComponent implements OnInit {
  roleName!: string;
  roleId!: number;
  modules: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roleId = +params.get('roleId')!;
      console.log("role id:", this.roleId);
      this.loadModules();
    });
  
    this.route.queryParams.subscribe((params) => {
      this.roleName = params['roleName'];
    });
  }

loadModules(): void {
  this.moduleService.getModulesByRoleId(this.roleId).subscribe({
    next: (data) => {
      let parsedData = data.data;

      // Check if `data.data` is a string and parse it
      if (typeof parsedData === 'string') {
        try {
          parsedData = JSON.parse(parsedData);
        } catch (err) {
          console.error('Failed to parse modules data:', err);
          parsedData = []; // fallback
        }
      }

      // Now assign modules from parsed data
      this.modules = parsedData.modules || [];
      console.log('Modules loaded:', this.modules);
    },
    error: (err) => {
      console.error('Error loading modules:', err);
    }
  });
}

toggleModule(module: any): void {
  module.isActive = !module.isActive;
  console.log(`Module ${module.moduleName} is now ${module.isActive ? 'active' : 'inactive'}`);
}

saveModules(): void {
  const activeModuleIds = this.modules
    .filter(module => module.isActive)
    .map(module => module.id);

  const requestBody = {
    roleId: this.roleId,
    activeModuleIds: activeModuleIds
  };

  this.moduleService.setUserRoleModules(requestBody).subscribe({
    next: (res) => {
      console.log('Modules saved successfully');
      this.notify.success(res.message.text || 'Modules updated successfully');
    },
    error: (err) => {
      console.error('Error saving modules:', err);
      this.notify.error('Failed to update modules');
    }
  });
}



}
