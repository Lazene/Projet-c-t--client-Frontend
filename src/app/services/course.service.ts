import { HttpClient } from '@angular/common/http';
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
    // Construis le payload avec tous les champs attendus par ton API backend
    const payload = {
      id: courseId, // Assure-toi que cet ID est correctement inclus si nécessaire par ton API
      name: course.name,
      description: course.description,
      teacherId: course.teacherId, // Inclus l'ID de l'enseignant si disponible
      teacherName: course.teacherName,
    };
  
    // Utilise l'ID du cours dans l'URL de la requête PUT
    return this.http.put<Course>(`${this.baseUrl}/${courseId}`, payload);
  }
  

  // Supprimer un cours
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}`);
  }

  // Ajouter un étudiant à un cours
  addStudentToCourse(courseId: string, studentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/addStudent/${studentId}`, {});
  }

  // Enlever un étudiant d'un cours
  removeStudentFromCourse(courseId: string, studentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/removeStudent/${studentId}`);
  }

  // Ajouter un enseignant à un cours
  addTeacherToCourse(courseId: string, teacherId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/addTeacher/${teacherId}`, {});
  }

  // Enlever un enseignant d'un cours
  removeTeacherFromCourse(courseId: string, teacherId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/removeTeacher/${teacherId}`);
  }
  getStudentsByCourse(courseId: number): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.baseUrl}/courses/${courseId}/students`);
  }
  getTeachers(courseId : number): Observable<TeacherDTO[]> {
    return this.http.get<TeacherDTO[]>(`${this.baseUrl}/${courseId}/teachers`);
  }
  

}



