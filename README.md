<<<<<<< HEAD
# User Directory Dashboard

A responsive and interactive User Directory Dashboard built using React.  
This project fetches user data from a public API and provides search, sorting, and multiple view options.

---

## Features

- **Search** users by name or email (client-side filtering)
- **Sort** users by:
  - Name
  - Company
  - Ascending / Descending order
- **Dual View Modes**:
  - Grid View (modern UI)
  - Table View (as per requirement)
- **Favorites** (persisted using localStorage)
- **State Persistence**
  - View mode and favorites saved across reloads
- **Debounced Search** for better performance
- **Premium UI** with Tailwind CSS and smooth animations

---

## Tech Stack

- React (Functional Components + Hooks)
- React Router
- Tailwind CSS
- Framer Motion
- JSONPlaceholder API

---

## API Used

https://jsonplaceholder.typicode.com/users

---


## Key Design Decisions

- Implemented both **Grid and Table views** to balance usability and assignment requirements
- Used **native select inputs** for sorting to ensure reliability and accessibility
- Handled **event propagation issues** by simplifying interaction patterns
- Added **localStorage persistence** for better user experience

---

## Challenges & Solutions

**Challenge:**  
Custom dropdown caused click conflicts with clickable cards (event bubbling & layering issues)

**Solution:**  
Refactored to use native `<select>` components for better accessibility, stability, and maintainability

---

## Live Demo

## Author
Devi Akshitha Marasu
=======
# User-Directed-Dashboard
React based User Directory Dashboard with search, sorting and grid/table view
>>>>>>> 1c248cb1153b87cf9cd2fe0ff71c4ca82d74d48a
