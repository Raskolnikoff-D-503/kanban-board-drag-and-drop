import React from 'react';
import {Controller, Header, Layout, Planner, Modal, AddTask} from '@/components';

import './App.scss';

export const App = () => {
  return (
    <div className="app">
      <Controller>
        <Header />
        <Layout>
          <Planner />
        </Layout>
        <Modal>
          <AddTask />
        </Modal>
      </Controller>
    </div>
  );
};
