import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-meals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-meals.component.html',
  styleUrl: './our-meals.component.scss'
})
export class OurMealsComponent {

  meals = [
    {
      id: 1,
      url: '/assets/img/pexels-narda-yescas-724842-1566837.jpg',
      title: 'Italian',
    },
    {
      id: 2,
      url: '/assets/img/pexels-freestockpro-3147493.jpg',
      title: 'Korean',
    },
    {
      id: 3,
      url: '/assets/img/pexels-fawzi-3456038-5163947.jpg',
      title: 'Pâtisserie',
    },
    {
      id: 4,
      url: '/assets/img/pexels-chanwalrus-958545.jpg',
      title: 'Indian',
    },
    {
      id: 5,
      url: '/assets/img/pexels-catscoming-1907228.jpg',
      title: 'Chinese',
    },
    {
      id: 6,
      url: '/assets/img/jerome-jome-Ga3ziG9jCno-unsplash.jpg',
      title: 'Thai',
    },
    {
      id: 7,
      url: '/assets/img/jarett-lopez-6WHl6T-fxU0-unsplash.jpg',
      title: 'Mexican',
    },
    {
      id: 8,
      url: '/assets/img/pexels-shameel-mukkath-3421394-5191846.jpg',
      title: 'Arabic',
    },
  ];

}


