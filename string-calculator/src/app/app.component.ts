import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  result: number = 0;
  errorMessage: string | null = null;

  // Add event parameter to prevent default form submission
  calculate(event: Event, numbers: string): void {
    event.preventDefault();  // Prevent page refresh

    this.errorMessage = null; // Reset error message
    
    try {
      this.add(numbers); // Call the add function
    } catch (error:any) {
      console.error(error.message); // Handle errors
    }
  }

  add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    let delimiter = /[\n,]/;
    if (numbers.startsWith('//')) {
      const parts = numbers.split('\n');
      delimiter = new RegExp(`[${parts[0].slice(2)}]`);
      numbers = parts[1];
    }

    const numArray = numbers.split(delimiter).map(num => parseInt(num, 10));
    const negatives = numArray.filter(num => num < 0);

    if (negatives.length) {
      this.errorMessage = `Negative numbers not allowed: ${negatives.join(', ')}`;
      throw new Error(this.errorMessage);
    }

    this.result = numArray.reduce((sum, curr) => sum + curr, 0);
    return this.result;
  }
}
