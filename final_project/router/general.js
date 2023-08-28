const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
        if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
        return res.status(404).json({message: "User already exists!"});    
        }
    } 
    return res.status(404).json({message: "Unable to register user."}); 
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //return res.status(300).json({message: "Yet to be implemented"});
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //return res.status(300).json({message: "Yet to be implemented"});
  const author = req.params.author;
  for(var key in books){
      //isbns.push(books[key]);
      if(books[key].author===author){
        return res.send(books[key]);
      }
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //return res.status(300).json({message: "Yet to be implemented"});
  const title = req.params.title;
  for(var key in books){
      //isbns.push(books[key]);
      if(books[key].title===title){
        return res.send(books[key]);
      }
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  let book = books[isbn];
  res.send(JSON.stringify(book.reviews));
}); 

module.exports.general = public_users;
