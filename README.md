# 📚 Shelfy - Library Management System
Welcome to **Shelfy**, a dynamic and fully-featured Library Management System built for a prestigious school to manage their entire book collection, borrowing, and return system seamlessly.

## 🌐 Live Website
🔗 [Live Site URL](https://shelfybook.netlify.app/)

---

## 📋 Project Overview
Shelfy is a modern, responsive, and fully functional web application that helps a school manage its library effectively. It allows admin users to add, update, and categorize books, while authenticated users can borrow and return books in real-time.

Built with ❤️ using **React**, **Tailwind CSS**, **Firebase**, **Express.js**, and **MongoDB**, this project showcases practical problem-solving skills, secure authentication, and efficient database interactions.

---

## 🎯 Project Features
### 👨‍💼 Authentication System
- Email/password login & registration
- Social login (Google)
- Firebase accessToken authentication with protected/private routes

### 📚 Book Management
- Add new books with form validation
- Edit/update book information
- Filter books by category
- Borrow books and set return date

### 📊 UI Functionality
- Card/Table view toggle for All Books
- Show only available books filter
- Responsive navbar with conditional buttons
- Eye-pleasing footer with all relevant links

### 🔐 Security
- Firebase keys secured with `.env` variables
- MongoDB credentials secured using `.env`

### 🎨 Design & UX
- Fully responsive across devices (mobile, tablet, desktop)
- Smooth animations using **Framer Motion**

---

## 🔧 Technologies Used

| Tech Stack         | Description                            |
| ------------------ | -------------------------------------- |
| React              | Frontend library                       |
| React Router       | Routing                                |
| Tailwind CSS       | Styling                                |
| Firebase           | Authentication                         |
| Express.js         | Backend server                         |
| MongoDB + Mongoose | Database                               |
| Vite               | Frontend bundler                       |
| React Hook Form    | Form management                        |
| Axios              | HTTP requests with interceptor support |
| Framer Motion      | Smooth animations                      |

---

## ✅ Optional Features Implemented
- ✅ Axios interceptors
- ✅ Max 3 books borrowing restriction with toast alert

---

🧪 Testing Instructions
1. Try accessing /allBooks or /addBook without logging in — should redirect to login
2. Borrow a book — it should decrease the quantity
3. Try borrowing same book twice — should block you
4. Return a book — quantity should increase
5. Refresh any private route — should persist login state
6. View responsive design on different devices

---

## 📜 How to Run Locally

```bash
# Clone the project
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-for-Sifad99
cd shelfy-book-client

# Install dependencies
npm install

# Setup environment
Create a `.env` file based on `.env.example`

# Run the client
npm run dev

---

🔗 Repositories
Client Repo : https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-for-Sifad99

Server Repo : https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-for-Sifad99

---

👨‍💻 Author
Made with 💙 by Sifad – a passionate MERN Stack Developer.

📢 Feedback
If you have any suggestions or feedback, feel free to contact or open an issue on GitHub!

```
