<h1>Drag and Drop Kanban Board</h1>

<h2>Setup Instructions</h2>

- Clone the repository to your local machine:
```
git clone https://github.com/subin-shk/Vrit-Tech-Task-B.git
```

- install node modules and dependencies by running the following command:
```
npm install
```

- run using:
```
npm run dev
```

<h2>Technologies Used</h2>

- React
- TypeScript
- @dnd-kit/core
- Tailwind css
- Zustand

<h2>Rationale</h2>

-  @dnd-kit/core library was used for implementing drag-and-drop functionality. It is built with React, ensuring smooth integration with contemporary React-based applications. It is frequently updated, ensuring reliability and compatibility with modern React versions.
-  Tailwind was used for speeding up styling with pre-defined classes, eliminating the need to write custom CSS for common patterns.
-  Zustand was used for state management and for local storage persistence. It has minimal boilerplate and an intuitive API make it easy to use.

<h2>Known limitations</h2>

- Cannot add more columns.
- Cannot edit name or title of existing columns.

<h2>Future Improvements</h2>

- Add column creation/deletion
- Implement card search and filtering
- Add undo/redo functionality
- Edit the name or title of existing column
- Assign tasks based on function and specification of employee




