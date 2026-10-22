import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, isStrongPassword, isPositiveArea, isValidPh } from '../src/utils/validation.js';

test('email validation accepts a normal email and rejects malformed values', () => {
  assert.equal(isValidEmail('farmer@example.in'), true);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail(' farmer@example.in '), true);
});
test('password policy requires length, a letter, and a number', () => {
  assert.equal(isStrongPassword('FarmSecure2026'), true);
  assert.equal(isStrongPassword('short2'), false);
  assert.equal(isStrongPassword('letters-only-long'), false);
  assert.equal(isStrongPassword(null), false);
});
test('farm area must be a positive number', () => {
  assert.equal(isPositiveArea('2.5'), true);
  assert.equal(isPositiveArea(0), false);
  assert.equal(isPositiveArea(-3), false);
  assert.equal(isPositiveArea('lots'), false);
});
test('soil pH must be between 0 and 14', () => {
  assert.equal(isValidPh(6.8), true);
  assert.equal(isValidPh(0), true);
  assert.equal(isValidPh(14), true);
  assert.equal(isValidPh(15), false);
});
