import React, {ReactNode, useContext} from 'react';
import {ControllerContext} from '@/components';

import './Modal.scss';

type Props = {
  children: ReactNode;
};

export const Modal = ({children}: Props) => {
  const context = useContext(ControllerContext);

  if (context?.isModalOpen) {
    return (
      <div className="modal__backdrop" onClick={context?.handleModalClose}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }

  return null;
};
