import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AnswerModal = ({ modalIsOpen, closeModal, tasks, handOnchangeFn, submitAnswer, editTasks }) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <h3>{editTasks ? "Edit" : "Answer"} the Task</h3>
      <form onSubmit={submitAnswer}>
        <textarea
          rows={4}
          cols={50}
          name="answer"
          value={tasks.answer || ""}
          onChange={handOnchangeFn}
          placeholder="Write your answer here..."
        />
        <button type="submit">{editTasks ? "Update" : "Submit"}</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AnswerModal;
