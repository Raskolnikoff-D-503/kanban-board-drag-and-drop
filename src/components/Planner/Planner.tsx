import React, {useContext} from 'react';
import {Board, ControllerContext, Task} from '@/components';

import './Planner.scss';

export const Planner = () => {
  const context = useContext(ControllerContext);

  return (
    <div className="planner__container">
      {context?.data.map((board) => (
        <Board key={board.id} data={board}>
          {board.tasks.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </Board>
      ))}
    </div>
  );
};
