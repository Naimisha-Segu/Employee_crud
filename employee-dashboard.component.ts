import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { EmployeeModel } from './employee-dashboard-model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
formValue!:FormGroup;
employee!:any;
showadd!:boolean;
showupdate!:boolean;
employeeobj: EmployeeModel=new EmployeeModel();
  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      Fanme:[' '],
      Lname:[' '],
      Email:[' '],
      Mobile:[' '],

    })
    this.getemploy();
  }
  postemploy(){
    this.employeeobj.Fname=this.formValue.value.Fanme;
    this.employeeobj.Lname=this.formValue.value.Lanme;
    this.employeeobj.Email=this.formValue.value.Email;
    this.employeeobj.Mobile=this.formValue.value.Mobile;
    this.api.postemplo(this.employeeobj)
      .subscribe(res=>{
        console.log(res);
        alert("added")
        let ref=document.getElementById('cancle')
        ref?.click();

        this.formValue.reset();
        this.getemploy();
      },err=>{
        alert("something went wrong")

      } )

  }

  addEmployee(){
   // alert("adding emplyee");

    return this.formValue;
  }
getemploy(){
  this.api.getEmplo().subscribe(res=>{
this.employee=res;
  })
}
deleteemplo(row:any){
  this.api.deleteeplo(row.id).subscribe(res=>{
   alert("deleted");
   this.getemploy();
  })
}
clickAddempl(){
  this.formValue.reset();
  this.showadd=true;
  this.showupdate=false;
}
editempl(row:any){
  this.employeeobj.id=row.id;
  this.showadd=false;
  this.showupdate=true;
this.formValue.controls['Fname'].setValue(row.Fname);
this.formValue.controls['Lname'].setValue(row.Lname);
this.formValue.controls['Email'].setValue(row.Email);
this.formValue.controls['Mobile'].setValue(row.Mobile);
}
updateemp(){
  this.employeeobj.Fname=this.formValue.value.Fanme;
  this.employeeobj.Lname=this.formValue.value.Lanme;
  this.employeeobj.Email=this.formValue.value.Email;
  this.employeeobj.Mobile=this.formValue.value.Mobile;
  this.api.updateEmplo(this.employeeobj.id,this.employeeobj)
  .subscribe(res=>{
    alert("sucessfully");
    let ref=document.getElementById('cancle')
        ref?.click();

        this.formValue.reset();
        this.getemploy();
  })
}

}
