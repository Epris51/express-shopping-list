const request = require('supertest');
const app = require('../app'); // Update the path according to your project structure
const items = require('../fakeDb'); // Update the path according to your project structure

beforeEach(() => {
  // Reset items array for each test
  items.length = 0;
  items.push({ name: "popsicle", price: 1.45 });
});

test('GET /items', async () => {
  const res = await request(app).get('/items');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
});

test('POST /items', async () => {
  const newItem = { name: "cheerios", price: 3.40 };
  const res = await request(app)
    .post('/items')
    .send(newItem)
    .expect(201);
  expect(res.body).toEqual({ added: newItem });
  expect(items).toContainEqual(newItem); // Verify the item was added to the array
});

test('GET /items/:name', async () => {
  const res = await request(app).get('/items/popsicle');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
});

test('PATCH /items/:name', async () => {
  const updatedItem = { name: "popsicle", price: 2.50 };
  const res = await request(app)
    .patch('/items/popsicle')
    .send(updatedItem)
    .expect(200);
  expect(res.body).toEqual({ updated: updatedItem });
  expect(items).toContainEqual(updatedItem); // Verify the item was updated in the array
});

test('DELETE /items/:name', async () => {
  const res = await request(app)
    .delete('/items/popsicle')
    .expect(200);
  expect(res.body).toEqual({ message: "Deleted" });
  expect(items).not.toContainEqual({ name: "popsicle", price: 1.45 }); // Verify the item was deleted from the array
});
