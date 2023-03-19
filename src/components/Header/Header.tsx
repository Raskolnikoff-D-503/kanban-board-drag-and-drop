import React, {useContext, DragEvent, useCallback} from 'react';
import {ControllerContext} from '@/components';
import {convertTasksToJSON, getTaskIndex, getTasksCopyByType} from '@/utils';

import './Header.scss';

export const Header = () => {
  const context = useContext(ControllerContext);

  const currentTask = context?.currentTask;
  const config = context?.config;

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (currentTask && config) {
        const updatedConfig = getTasksCopyByType(config, currentTask.type);
        const currentIndex = getTaskIndex(config[currentTask.type], currentTask.id);

        updatedConfig.splice(currentIndex, 1);

        localStorage.setItem(currentTask.type, convertTasksToJSON(updatedConfig));
      }
    },
    [currentTask, config],
  );

  return (
    <div className="header__container">
      <h1 className="header__title">Kanban Board</h1>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className={`header__delete`}>
        Drop here to delete
      </div>
    </div>
  );
};
