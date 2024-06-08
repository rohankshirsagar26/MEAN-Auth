const BooksData = require('./Bookstore.books.json')
const Book = require('./models/Book');

const seedBooksData = async () => {
    try {
        await Book.deleteMany({});
        await Book.insertMany(BooksData);
        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding books data: ' + error.message);
    }
}

module.exports = seedBooksData