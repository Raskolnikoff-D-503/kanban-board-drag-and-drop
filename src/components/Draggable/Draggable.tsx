import React, {ReactNode, DragEvent} from 'react';

type Props = {
  onDragStart?: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;
  className?: string;
  children: ReactNode;
};

export const Draggable = ({
  onDragStart,
  onDragLeave,
  onDragEnd,
  onDragOver,
  onDrop,
  className,
  children,
}: Props) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={className}
    >
      {children}
    </div>
  );
};
