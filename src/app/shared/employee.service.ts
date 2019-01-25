import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase,
    private datePipe: DatePipe) { }

  employeeList: AngularFireList<any>;

form: FormGroup = new FormGroup ({
  $key: new FormControl(null), // key
  fullName: new FormControl('', Validators.required), // Campo Obligatorio
  email: new FormControl('', Validators.email), // Valida estructura email
  mobile: new FormControl('', [Validators.required, Validators.minLength(10)]), // Campo Obligatorio y largo minimo de 10
  city: new FormControl(''),
  gender: new FormControl(1), // RadioButton
  department: new FormControl(0), // DropDownList o List
  hireDate: new FormControl(''),
  isPermanent: new FormControl(false) // checkbox
});

initializeFormGroup() {
  this.form.setValue({
    $key: null,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: '1',
    department: 0,
    hireDate: '',
    isPermanent: false
  });
}

 getEmployees() {
  this.employeeList = this.firebase.list('employees');
  return this.employeeList.snapshotChanges();
 }

  insertEmployee(employee) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      // tslint:disable-next-line:quotemark
      hireDate: employee.hireDate === '' ? '' : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent
    });
  }

  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate == '' ? '' : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent
    });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    this.form.setValue(_.omit(employee, 'departmentName')); //  Usamos lodash para omitir el nombre del departamento para que
                                                            //  al igualar el objeto con info row con el del formulario, no
                                                            //  tengamos problemas por diferencia de templates
  }

}
