## Vitest Cheatsheet

### Installation

```bash
npm install vitest --save-dev
```

### Configuration

Create a `vitest.config.js` file at the root of your project:

```javascript
import { defineConfig } from 'vitest';

export default defineConfig({
  // Test environment (e.g., 'node', 'jsdom')
  test: {
    environment: 'jsdom',
  },
});
```

### Writing Tests

**Basic Test Structure:**

```javascript
import { test, expect } from 'vitest';

test('adds numbers correctly', () => {
  expect(2 + 2).toBe(4);
});
```

**Common Assertions:**

* **Equality:**
  - `toBe(value)`: Strict equality (===)
  - `toEqual(value)`: Deep equality for objects and arrays
* **Truthiness:**
  - `toBeTruthy()`
  - `toBeFalsy()`
* **Existence:**
  - `toBeDefined()`
  - `toBeUndefined()`
  - `toBeNull()`
  - `toBeNaN()`
* **Types:**
  - `toBeInstanceOf(Class)`
* **Strings:**
  - `toMatch(regex)`
  - `toContain(substring)`
* **Numbers:**
  - `toBeGreaterThan(value)`
  - `toBeLessThan(value)`
  - `toBeCloseTo(value, numDigits)`
* **Arrays:**
  - `toHaveLength(length)`
  - `toContain(item)`
  - `toEqual(array)`
* **Objects:**
  - `toHaveProperty(key)`
  - `toEqual(object)`

**Asynchronous Tests:**

```javascript
import { test, expect } from 'vitest';

test('fetches data asynchronously', async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  expect(data.length).toBeGreaterThan(0);
});
```

**Grouping Tests:**

```javascript
import { describe, test, expect } from 'vitest';

describe('My Test Suite', () => {
  test('first test', () => {
    // ...
  });

  test('second test', () => {
    // ...
  });
});
```

### Running Tests

```bash
vitest
```

### Additional Features

* **Test isolation:** Each test runs in a clean environment.
* **Code coverage:** Measure how much of your code is tested.
* **Test reporters:** Choose different formats for test results.
* **Custom test runners:** Create your own test runner with plugins.

**For more details and advanced features, refer to the official Vitest documentation:** [https://vitest.dev/guide/](https://vitest.dev/guide/)
