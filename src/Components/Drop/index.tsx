import { observer } from 'mobx-react';
import { ComponentType, PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';

interface DropProps<T> {
  title: string;
  items: T[];
  ItemDisplay: ComponentType<{ item: T }>;
  onDrop: (item: T) => void;
}

const Drop = <T extends { id: string }>({
  title,
  items,
  ItemDisplay,
  onDrop,
}: PropsWithChildren<DropProps<T>>) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div>
      <div>{title}</div>
      <div ref={drop} style={{ height: 300, backgroundColor: isOver ? 'red' : 'white' }}>
        <div>
          {items.map((item: T) =>
            ItemDisplay ? (
              <ItemDisplay key={item.id} item={item} />
            ) : (
              <div key={item.id}>{item.id}</div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Drop);
