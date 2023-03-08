import React, {DragEvent, ReactNode} from 'react';

import './Board.scss';

type Props = {
  label: string;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  children: ReactNode;
};

export const Board = ({label, onDrop, onDragOver, children}: Props) => {
  return (
    <div className={'board__container'} onDrop={onDrop} onDragOver={onDragOver}>
      <h2>{label}</h2>
      <>{children}</>
    </div>
  );
};
