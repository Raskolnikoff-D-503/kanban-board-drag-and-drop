import React, {ChangeEvent, useState} from 'react';

import './AddTask.scss';

export const AddTask = () => {
  const [txt, setTxt] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;

    setTxt(value);
  };

  const handleSubmit = () => {
    console.log(txt);
  };

  return (
    <div className="add-task__container">
      <h3>Add new task</h3>
      <textarea className="add-task__textarea" onChange={handleChange} />
      <button className="add-task__button" onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  );
};
