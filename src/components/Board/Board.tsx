import React, {ReactNode, useContext} from 'react';
import {PlannerType} from '@/types';
import {ControllerContext} from '@/components';
import {TASK_TYPE} from '@/constants';

import './Board.scss';

type Props = {
  data: PlannerType;
  children: ReactNode;
};

export const Board = ({data, children}: Props) => {
  const context = useContext(ControllerContext);

  return (
    <div
      className="board__container"
      onDrop={context?.handleBoardDrop(data)}
      onDragOver={context?.handleBoardDragOver}
    >
      <h2>{data.label}</h2>
      <div className="board__content">{children}</div>
      {data.id === TASK_TYPE.UPCOMING && (
        <button className="board__button" onClick={context?.handleModalOpen}>
          Add Task
        </button>
      )}
    </div>
  );
};
