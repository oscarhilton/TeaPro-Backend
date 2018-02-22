const add = (a, b) => a + b;

test('Should add two numbers', () => {
  const result = add(3,5);
  expect(result).toBe(8);
});
