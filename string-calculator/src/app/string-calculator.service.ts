import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// src/app/string-calculator.service.ts
export class StringCalculatorService {
  add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    let delimiter = /[\n,]/; // Default delimiters are comma and newline.
    if (numbers.startsWith('//')) {
      const parts = numbers.split('\n');
      delimiter = new RegExp(`[${parts[0].slice(2)}]`); // Extract custom delimiter.
      numbers = parts[1]; // Remove delimiter line.
    }

    const numArray = numbers.split(delimiter).map(num => parseInt(num, 10)); // Split numbers by delimiter.
    const negatives = numArray.filter(num => num < 0); // Check for negatives.

    if (negatives.length) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return numArray.reduce((sum, curr) => sum + curr, 0); // Sum of numbers.
  }
}

