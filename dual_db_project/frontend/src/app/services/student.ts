import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = 'http://127.0.0.1:8000/api/students/';

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get(this.baseUrl);
  }

  createStudent(data:any) {
    return this.http.post(this.baseUrl, data);
  }

  updateStudent(id:number, data:any) {
    return this.http.put(this.baseUrl + id + '/', data);
  }

  deleteStudent(id:number) {
    return this.http.delete(this.baseUrl + id + '/');
  }
}
