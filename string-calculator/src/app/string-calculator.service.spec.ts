// src/app/string-calculator.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCalculatorService);
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    expect(service.add('1')).toBe(1);
    expect(service.add('5')).toBe(5);
  });

  it('should return the sum of two numbers', () => {
    expect(service.add('1,2')).toBe(3);
    expect(service.add('4,5')).toBe(9);
  });

  it('should return the sum of multiple numbers', () => {
    expect(service.add('1,2,3,4')).toBe(10);
    expect(service.add('5,5,5')).toBe(15);
  });

  it('should handle newlines as delimiters', () => {
    expect(service.add('1\n2,3')).toBe(6);
  });

  it('should handle different delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
    expect(service.add('//#\n1#2#3')).toBe(6);
  });

  it('should throw an error when negative numbers are passed', () => {
    expect(() => service.add('1,-2,3')).toThrow(new Error('Negative numbers not allowed: -2'));
    expect(() => service.add('-1,-2,-3')).toThrow(new Error('Negative numbers not allowed: -1, -2, -3'));
  });
});
