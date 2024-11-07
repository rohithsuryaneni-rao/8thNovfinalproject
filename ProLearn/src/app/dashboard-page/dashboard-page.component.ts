import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface Course {
  courseId:number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isEnrolled:boolean
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
}

interface EnrolledCourse {
  name: string;
  description: string;
  status: string;
  progress: number;
  showFeedback?: boolean;
  feedbackText?: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
    enrolledCourses: Course[] | undefined;
constructor(private ApiService:ApiService){}
    studentId=1;
  course:any;
  currentView: string = 'courses';
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedRating: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  uniqueCategories: string[] = [];



  assignments: Assignment[] = [
    { id: 1, title: 'Assignment 1', description: 'Complete the Angular project.', dueDate: new Date(), status: 'Pending' },
    { id: 2, title: 'Assignment 2', description: 'Implement a REST API in Java.', dueDate: new Date(), status: 'Completed' }
  ];

  feedbackList = [
    { courseName: 'Angular Basics', comment: 'Great course!', rating: 5 },
    { courseName: 'Advanced Java', comment: 'Very informative.', rating: 4 }
  ];

  performanceData = [
    { metricName: 'Course Completion', score: '80%', comparison: 'Above Average' },
    { metricName: 'Assignments Completed', score: '90%', comparison: 'Excellent' }
  ];
  ngOnInit(): void {
    this.loadCourses();
}

loadCourses(): void {
    this.ApiService.getAllCourses().subscribe({
        next: (courses) => {
            this.courses = courses;

            // Get all courses
            this.filteredCourses = this.courses;  // This holds all the courses

            // Filter enrolled courses
            this.enrolledCourses = this.courses.filter(course => course.isEnrolled);  // Holds enrolled courses

            // If you need the unique categories, you can extract them from the filtered courses
            this.uniqueCategories = this.getUniqueCategories(this.courses);
        },
        error: (err) => {
            console.error('Error fetching courses: ', err);
        }
    });
}


 
  getUniqueCategories(filteredCourses: Course[]): string[] {
    return Array.from(new Set(this.courses.map(course => course.category)));
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = this.searchTerm
        ? course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      const matchesCategory = this.selectedCategory ? course.category === this.selectedCategory : true;
      const matchesRating = this.selectedRating ? course.rating >= +this.selectedRating : true;

      return matchesSearch && matchesCategory && matchesRating;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedRating = '';
    this.filteredCourses = this.courses;
  }

  navigateTo(view: string): void {
    this.currentView = view;
  }

  submitAssignment(assignment: Assignment): void {
    console.log(`Submitted assignment: ${assignment.title}`);
  }

  addFeedback(): void {
    console.log('Adding feedback...');
    // Add feedback handling logic here
  }

  searchCourses(): void {
    this.filterCourses();
  }

  onFileSelected(event: Event, assignment: Assignment): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log(`File selected for assignment ${assignment.title}: ${file.name}`);
    }
  }

  enroll(courseId: number): void {
    this.ApiService.enrollStudent(this.studentId, courseId).subscribe(
        response => {
            // Handle success
            console.log('Enrolled successfully:', response);
            alert('You have been successfully enrolled in the course!');          

            // Update the course enrollment status in the UI
            const course = this.courses.find(c => c.courseId === courseId);
            if (course) {
                course.isEnrolled = true;
            }
        },
        error => {
            // Handle error
            console.error('Error enrolling:', error);
            alert('Error enrolling in the course!');
        }
    );
}

  

  toggleFeedback(enrolled: EnrolledCourse): void {
    enrolled.showFeedback = !enrolled.showFeedback; // Toggle feedback textbox visibility
  }

  submitFeedback(enrolled: EnrolledCourse): void {
    console.log(`Feedback for ${enrolled.name}:`, enrolled.feedbackText);
    enrolled.feedbackText = '';
    enrolled.showFeedback = false;
  }

  feedback = {
    name: '',
    description: ''
  };

  submitFeedbackForm(): void {
    console.log('Feedback submitted:', this.feedback);
    // Logic to handle the feedback submission, e.g., send it to a server or display a confirmation message.
    // Reset the feedback form after submission
    this.feedback = { name: '', description: '' };
  }
}
