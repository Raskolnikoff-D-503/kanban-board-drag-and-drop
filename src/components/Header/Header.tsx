import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './Header.scss';

export const Header = () => {
  const context = useContext(ControllerContext);

  return (
    <div className="header__container">
      <h1 className="header__title">Kanban Board</h1>
      {context?.isOnDrag && (
        <div
          onDragOver={context?.handleDragOver}
          onDrop={context?.handleDeleteDrop}
          className={`header__delete ${context?.isOnDrag ? 'header__delete--border' : ''}`}
        >
          Drop here to delete a task
        </div>
      )}
    </div>
  );
};
