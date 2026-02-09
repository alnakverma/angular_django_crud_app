import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  baseUrl = 'http://127.0.0.1:8000/api/students/';

  students: any[] = [];

  student = {
    id: null,
    name: '',
    age: '',
    email: ''
  };

  isEditing = false;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  // READ
  loadStudents() {
    this.http.get<any[]>(this.baseUrl + 'read/')
      .subscribe(data => {
        this.students = data;
        this.cd.detectChanges();
  });
  }

  // CREATE
  addStudent() {

    const payload = {
      name: this.student.name,
      age: Number(this.student.age),
      email: this.student.email
    };

    this.http.post(this.baseUrl + 'create/', payload)
      .subscribe({
        next: (res) => {
          alert("Student created Successfully (201)");
          this.resetForm();
          this.loadStudents();
        },
        error: (err) => {

          if (err.status === 400)
            alert("Invalid Data or Email already exists. Please try different email or check the details carefully. (400)");

          else if (err.status === 500)
            alert("Server error (500)");

          else
            alert("Unknown error");
        }
      });
  }



  // DELETE
  deleteStudent(id: number) {

    const confirmDelete = confirm('Are you sure you want to delete this student?');

    if (!confirmDelete) return;

    this.http.delete(this.baseUrl + 'delete/' + id + '/')
      .subscribe({
        next: () => {
          alert('Student deleted successfully (204)');
          this.loadStudents();
        },
        error: (err) => {

          if (err.status === 404)
            alert('Student not found (404)');

          else
            alert('Delete failed');
        }
      });
  }

  // EDIT (fill form) 
  editStudent(s: any) {
    this.student = { ...s };
    this.isEditing = true;
  }

  //  UPDATE
  updateStudent() {

  const payload = {
    name: this.student.name,
    age: Number(this.student.age),
    email: this.student.email
  };

  this.http.put(this.baseUrl + 'update/' + this.student.id + '/', payload)
    .subscribe({
      next: () => {
        alert("Updated successfully (200)");
        this.resetForm();
        this.loadStudents();
      },
      error: (err) => {

        if (err.status === 404)
          alert("Student not found(404)");

        else if (err.status === 400)
          alert("Data Already exists(400)");

        else
          alert("Update failed");
      }
    });
}


  resetForm() {
    this.student = { id:null, name:'', age:'', email:'' };
    this.isEditing = false;
  }
}

