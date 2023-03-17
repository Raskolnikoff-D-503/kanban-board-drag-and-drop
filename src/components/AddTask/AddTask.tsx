import React, {ChangeEvent, useContext, useState} from 'react';
import {TaskDataType} from '@/types';
import {Button, ControllerContext} from '@/components';
import {TASK_TYPE} from '@/constants';

import './AddTask.scss';

export const AddTask = () => {
  const context = useContext(ControllerContext);
  const [txt, setTxt] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;

    setTxt(value);
  };

  const handleSubmit = () => {
    if (context && txt) {
      const newTask: TaskDataType = {
        id: String(context.upcomingCongiguration.length + 1),
        content: txt,
        type: TASK_TYPE.UPCOMING,
      };

      localStorage.setItem(
        TASK_TYPE.UPCOMING,
        JSON.stringify([...context.upcomingCongiguration, newTask]),
      );

      context?.handleModalClose();
    }
  };

  return (
    <div className="add-task__container">
      <h3>Add new task</h3>
      <textarea className="add-task__textarea" onChange={handleChange} />
      <Button text="Add Task" onClick={handleSubmit} />
    </div>
  );
};
