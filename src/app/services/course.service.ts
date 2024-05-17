import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, StudentDTO, TeacherDTO } from '../shared/DTO/CourseDto';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'https://localhost:7176/Course'; // URL de base pour les endpoints de cours

  constructor(private http: HttpClient) { }

  // Récupérer tous les cours
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}`);
  }

  // Récupérer un cours par son ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }
 

  // Récupérer un cours par nom
  getCourseByName(name: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/ByName?name=${name}`);
  }
  getCoursesWithTeachers(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/WithTeachers`);
  }
  // Ajouter un nouveau cours
  addCourse(course: { name: string; description: string; teacherName: string }): Observable<any> {
    // Structurez les données comme requis par votre API backend
    const payload = {
        courseName: course.name,
        courseDescription: course.description,
        teacherName: course.teacherName // Utilisez le nom du professeur
    };

    return this.http.post(`${this.baseUrl}/AddWithTeacher`, payload);
}


  // Mettre à jour un cours existant
  updateCourse(courseId: string, course: { name: string; description: string; teacherName: string, teacherId: number }): Observable<any> {
    const payload = {
      courseId: courseId,
      name: course.name,
      description: course.description,
      teacherId: course.teacherId,
      teacherName: course.teacherName,
    };
  
    return this.http.put<Course>(`${this.baseUrl}/${courseId}/update`, payload);
  }
  addCourseWithTeacher(course: { name: string; description: string; teacherName: string}): Observable<any> {
    const payload = {
      courseName: course.name,
      courseDescription: course.description,
      teacherName: course.teacherName
    };
  
    return this.http.post(`${this.baseUrl}/AddWithTeacher`, payload);
  }

  // Supprimer un cours
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/delete`);
  }

  // Ajouter un étudiant à un cours
  addStudentToCourse(courseId: number, studentId: number): Observable<any> {
    // Construction de l'URL avec les IDs du cours et de l'étudiant
    const url = `${this.baseUrl}/${courseId}/addStudent/${studentId}`;

    // Construction de l'en-tête d'autorisation avec le token JWT
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Envoi de la requête POST à l'URL spécifiée
    return this.http.post(url, {}, { headers });
  }
  // Enlever un étudiant d'un cours
  removeStudentFromCourse(courseId: number, studentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/removeStudent/${studentId}`);
  }

  // Ajouter un enseignant à un cours
  addTeacherToCourse(courseId: string, teacherId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/addTeacher/${teacherId}`, {});
  }

  // Enlever un enseignant d'un cours
  removeTeacherFromCourse(courseId: number, teacherId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/removeTeacher/${teacherId}`);
  }
  // Récupérer les étudiants d'un cours
  getStudentsByCourse(courseId: number): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.baseUrl}/${courseId}/students`);
  
  }
  // Récupérer les enseignants d'un cours
  getTeachers(courseId : number): Observable<TeacherDTO[]> {
    return this.http.get<TeacherDTO[]>(`${this.baseUrl}/${courseId}/teachers`);
  }
  
  getStudents(courseId: number): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.baseUrl}/${courseId}/students`);
  }
  getCoursesByTeacher(teacherId: number): Observable<Course[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<Course[]>(`${this.baseUrl}/Teacher/${teacherId}`, { headers });
  }

}



