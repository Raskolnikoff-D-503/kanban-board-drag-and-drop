import React from 'react';
import {Planner} from '@/components';

import './App.scss';

// type DataType = {
//   id: string;
//   content: string;
//   order: number;
// };

export const App = () => {
  // const [list, setList] = useState<DataType[]>([
  //   {
  //     id: '1',
  //     content: 'Card 1',
  //     order: 1,
  //   },
  //   {
  //     id: '2',
  //     content: 'Card 2',
  //     order: 2,
  //   },
  //   {
  //     id: '3',
  //     content: 'Card 3',
  //     order: 3,
  //   },
  //   {
  //     id: '4',
  //     content: 'Card 4',
  //     order: 4,
  //   },
  // ]);
  // const [currentCard, setCurrentCard] = useState<DataType | null>(null);
  // console.log(currentCard);

  // const handleDragStart = (card: DataType) => (_: DragEvent<HTMLDivElement>) => {
  //   console.log('start', card);
  //   setCurrentCard(card);
  // };

  // const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   (event.target as HTMLDivElement).style.background = 'white';
  //   console.log('end');
  // };

  // const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   (event.target as HTMLDivElement).style.background = 'grey';
  //   console.log('over');
  // };

  // const handleDrop = (card: DataType) => (event: DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   (event.target as HTMLDivElement).style.background = 'white';
  //   console.log('drop', card);

  //   setList((current) =>
  //     current.map((item) => {
  //       if (currentCard && item.id === card.id) {
  //         return {...item, order: currentCard.order};
  //       }
  //       if (item.id === currentCard?.id) {
  //         return {...item, order: card.order};
  //       }
  //       return item;
  //     }),
  //   );
  //   setCurrentCard(null);
  // };

  // const sortedList = list.sort((a, b) => a.order - b.order);

  return (
    <div className="app">
      <Planner />
      {/* {sortedList.map((item) => (
        <Draggable
          key={item.id}
          onDragStart={handleDragStart(item)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop(item)}
          className={`card ${item.id === currentCard?.id ? 'card--hide' : ''}`}
          children={item.content}
        />
      ))} */}
    </div>
  );
};
