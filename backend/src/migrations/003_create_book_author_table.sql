CREATE TABLE book_authors (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books(id),
    CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES authors(id)
);