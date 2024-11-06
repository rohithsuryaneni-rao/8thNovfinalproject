import { Component, OnInit } from '@angular/core';

interface Course {
    name: string;
    description: string;
    category: string;
    rating: number;
    enrolled: boolean;
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

    currentView: string = 'courses';
    searchTerm: string = '';
    selectedCategory: string = '';
    selectedRating: string = '';
    courses: Course[] = [];
    filteredCourses: Course[] = [];
    uniqueCategories: string[] = [];

    enrolledCourses: EnrolledCourse[] = [
        { name: 'Angular Basics', description: 'Basics of Angular.', status: 'In Progress', progress: 60, showFeedback: false, feedbackText: '' },
        { name: 'Advanced Java', description: 'Advanced concepts in Java.', status: 'Completed', progress: 100, showFeedback: false, feedbackText: '' }
    ];

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
        this.courses = [
            { name: 'Angular Basics', description: 'Learn the fundamentals of Angular framework.', category: 'Programming', rating: 4.5, enrolled: false },
            { name: 'UI/UX Design Essentials', description: 'Introduction to user interface and user experience design.', category: 'Design', rating: 4.2, enrolled: false },
            { name: 'Digital Marketing 101', description: 'Basics of digital marketing strategies and tools.', category: 'Marketing', rating: 4.8, enrolled: false },
            { name: 'Data Structures in JavaScript', description: 'Explore data structures and algorithms using JavaScript.', category: 'Programming', rating: 4.7, enrolled: false }
        ];
        this.filteredCourses = this.courses;
        this.uniqueCategories = this.getUniqueCategories();
    }

    getUniqueCategories(): string[] {
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

    enroll(course: Course): void {
        course.enrolled = !course.enrolled; // Toggle the enrolled status
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
