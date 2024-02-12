import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(http : HttpClient ) {
    // la méthode get() de HttpClient envoie une requête HTTP GET à l'URL spécifiée
    // et renvoie un observable qui émet les données demandées.
    // subscribe() est utilisé pour déclencher la requête.
    http.get('http://localhost:5244/course').subscribe(courses  => {
      this.courses = courses;
  })
}
courses: any;
     
}
