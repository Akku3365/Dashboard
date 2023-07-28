/** @format */

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";

function App() {
    const [role, setRole] = useState(false);

    useEffect(() => {
        const db = JSON.parse(localStorage.getItem("user_d"));
        if (db && db.radio === true) {
            setRole(true);
        } else {
            setRole(false);
        }
    }, [role]);
    // console.log(role);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login role={role} setRole={setRole} />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* Pass the role prop to the Dashboard component */}
                    <Route path="/dash" element={<Dashboard role={role} setRole={setRole} />} />
                </Routes>
            </BrowserRouter>

            {/* <Signup />
      <Login /> */}
        </>
    );
}

export default App;














// Sure, let's go through the code carefully and understand its structure and logic:

// 1. The `Dashboard` component receives `props`, and the `role` is extracted from these props.

// 2. The `initialInput` state contains the initial values for the input fields (`t`, `de`, and `answer`).

// 3. The component uses several `useState` hooks to manage various states:
//    - `tasks`: Tracks the values of input fields for creating/editing tasks.
//    - `taskList`: Stores an array of tasks fetched from or saved to local storage.
//    - `editTasks`: Represents the task being edited (null when creating a new task).
//    - `modalIsOpen`: Controls the visibility of the answer modal.
//    - `currentTaskId`: Stores the ID of the current task being edited/answered.

// 4. There is an `useEffect` hook that updates the `localStorage` whenever the `taskList` state changes.

// 5. The `handOnchangeFn` function updates the `tasks` state when input values change.

// 6. The `taskInputSubmit` function is responsible for submitting the task input. If there is an `editTasks`, it updates the existing task, and if there is no `editTasks`, it adds a new task to the `taskList`. After submission, the `tasks` state is reset to the initial input.

// 7. The `taskInputDelete` function removes a task from the `taskList` based on its ID.

// 8. The `taskEditFunction` function is used to set the `editTasks` and `tasks` states when a task is edited.

// 9. The `lodashDebounce` library is used to create a debounced version of the `localStorage` update function, which helps optimize performance when updating frequently.

// 10. The `handleDragEnd` function handles the logic for dragging tasks within the same list (reordering) and between different lists (changing status). It updates the `taskList` state and debounces the update to `localStorage`.

// 11. The `backFunction` is obtained from `react-router-dom` to handle navigation.

// 12. The `handleBack` function clears the `localStorage` and navigates back to the home page.

// 13. The `openModal` function sets the state for `currentTaskId`, opens the modal, and populates the modal with the task details to edit or answer.

// 14. The `closeModal` function clears the `currentTaskId`, closes the modal, and resets the `tasks` state to the initial input.

// 15. The `submitAnswer` function handles the submission of answers for a task, updates the `taskList` with the answer, closes the modal, and resets the `tasks` state.

// 16. The JSX code renders the dashboard layout:
//    - It displays the header, greeting message based on `role`, and a `TaskForm` for teachers.
//    - It shows a "Logout" button.
//    - It displays the task lists using `Draggable`, `Droppable`, and `DragDropContext` from `react-beautiful-dnd`.
//    - The tasks are grouped under "Task List," "In Progress," and "Completed" columns.
//    - Tasks can be dragged and dropped between these columns.
//    - The tasks are displayed with their details, and edit/delete buttons are shown for teachers.
//    - Students can answer tasks or edit their answers.

// The code seems to be well-organized and follows a structured approach for implementing the dashboard with drag-and-drop functionality using `react-beautiful-dnd`. It also handles task creation, editing, and submission of answers based on the user's role.

// If you have any specific requirements or modifications you'd like to implement, please let me know, and I'll be happy to assist further.
