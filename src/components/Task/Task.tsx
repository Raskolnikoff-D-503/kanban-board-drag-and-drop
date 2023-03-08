import React from 'react';
import {Draggable} from '@/components';

import './Task.scss';

type Props = {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  content: string;
};

export const Task = ({onDragStart, onDragLeave, onDragOver, onDrop, content}: Props) => {
  return (
    <Draggable
      className={'task__container'}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {content}
    </Draggable>
  );
};
