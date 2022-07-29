import moment from 'moment';
import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IssueType } from '../../Store/Issues';
import { debounce } from 'lodash';

interface DragProps {
  item: IssueType;
}

const Box = ({ item }: DragProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: (dragItem: IssueType) => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(dragItem: IssueType) {
      updatePosition(dragItem, item);
    },
  }));

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'BOX',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const updatePosition = useCallback(
    debounce((dragItem: IssueType, item: IssueType) => {
      const currItmPosition = item.position;
      item.updatePosition(dragItem.position);
      dragItem.updatePosition(currItmPosition);
    }, 500),
    [],
  );

  return (
    <div ref={dragPreview}>
      <div ref={drop} style={{ height: isOver ? '200px' : '100%', transition: 'height .3s ease' }}>
        <div role="Handle" ref={drag} className="drag-item">
          <h4>{item.title}</h4>
          <p>
            #{item.number} opened {moment(item.createdAt).fromNow()} by {item.opener}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Box;
