import React, {ChangeEvent, useCallback, useContext, useState} from 'react';
import {TaskDataType} from '@/types';
import {Button, ControllerContext} from '@/components';
import {convertTasksToJSON} from '@/utils';
import {PALETTE, TASK_TYPE} from '@/constants';

import './AddTask.scss';

const TEXTAREA_LIMIT = 100;

export const AddTask = () => {
  const context = useContext(ControllerContext);
  const [txt, setTxt] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE.RED);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;

    setTxt(value);
  }, []);

  const handleRadioChange = useCallback((value: string) => {
    setSelectedColor(value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (context && txt.trim()) {
      const newTask: TaskDataType = {
        id: new Date().getTime().toString(),
        content: txt,
        type: TASK_TYPE.UPCOMING,
        color: selectedColor,
      };

      localStorage.setItem(
        TASK_TYPE.UPCOMING,
        convertTasksToJSON([...context.config[TASK_TYPE.UPCOMING], newTask]),
      );

      context?.handleModalClose();
    }
  }, [context, txt]);

  return (
    <div className="add-task__container">
      <h3>Add new task</h3>
      <div className="add-task__radio-group">
        <input
          className={`add-task__radio-input add-task__radio-input--red`}
          type="radio"
          value={PALETTE.RED}
          checked={selectedColor === PALETTE.RED}
          onChange={() => handleRadioChange(PALETTE.RED)}
        />
        <input
          className={`add-task__radio-input add-task__radio-input--yellow`}
          type="radio"
          value={PALETTE.YELLOW}
          checked={selectedColor === PALETTE.YELLOW}
          onChange={() => handleRadioChange(PALETTE.YELLOW)}
        />
        <input
          className={`add-task__radio-input add-task__radio-input--green`}
          type="radio"
          value={PALETTE.GREEN}
          checked={selectedColor === PALETTE.GREEN}
          onChange={() => handleRadioChange(PALETTE.GREEN)}
        />
      </div>
      <textarea
        className="add-task__textarea"
        style={{backgroundColor: selectedColor}}
        onChange={handleChange}
        maxLength={TEXTAREA_LIMIT}
      />
      <span className="add-task__limit">
        {txt.length}/{TEXTAREA_LIMIT}
      </span>

      <div className="add-task__buttons">
        <Button text="Close" onClick={context?.handleModalClose} />
        <Button text="Add Task" onClick={handleSubmit} />
      </div>
    </div>
  );
};
