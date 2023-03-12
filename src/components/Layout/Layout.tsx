import React, {ReactNode} from 'react';

import './Layout.scss';

type Props = {
  children: ReactNode;
};

export const Layout = ({children}: Props) => {
  return <div className="layout">{children}</div>;
};
