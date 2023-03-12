import React, {useContext} from 'react';
import {TaskDataType} from '@/types';
import {ControllerContext, Draggable} from '@/components';

import './Task.scss';

type Props = {
  data: TaskDataType;
};

export const Task = ({data}: Props) => {
  const context = useContext(ControllerContext);

  return (
    <Draggable
      className="task__container"
      onDragStart={context?.handleDragStart(data)}
      onDragLeave={context?.handleDragLeave}
      onDragEnd={context?.handleDragEnd}
      onDragOver={context?.handleDragOver}
      onDrop={context?.handleDrop(data)}
    >
      {data.content}
    </Draggable>
  );
};
