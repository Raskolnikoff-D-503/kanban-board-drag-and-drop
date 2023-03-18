import React, {ChangeEvent, useContext, useState} from 'react';
import {TaskDataType} from '@/types';
import {Button, ControllerContext} from '@/components';
import {TASK_TYPE} from '@/constants';

import './AddTask.scss';

const TEXTAREA_LIMIT = 100;

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
        id: new Date().getTime().toString(),
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
      <textarea className="add-task__textarea" onChange={handleChange} maxLength={TEXTAREA_LIMIT} />
      <span className="add-task__limit">
        {txt.length}/{TEXTAREA_LIMIT}
      </span>
      <Button text="Add Task" onClick={handleSubmit} />
    </div>
  );
};
