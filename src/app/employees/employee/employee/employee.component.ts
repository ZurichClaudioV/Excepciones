import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EmployeeService } from '../../../shared/employee.service';
import { DepartmentService } from '../../../shared/department.service';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private service: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

  // departments = [
  //   {id: 1, value: 'Dep 1'},
  //   {id: 2, value: 'Dep 2'},
  //   {id: 3, value: 'Dep 3'},
  // ];

  ngOnInit() {
    this.service.getEmployees();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
        // Entra acá si es un ingreso nuevo
        this.service.insertEmployee(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Ingresed successfully');
        this.onClose();
      } else {
        // Entra acá si viene con key y corresponde a un update
        this.service.updateEmployee(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Updated successfully');
        this.onClose();
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
