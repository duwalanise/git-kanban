import moment from 'moment';
import { useDrag } from 'react-dnd';
import { IssueType } from '../../Store/Issues';

interface DragProps {
  item: IssueType;
}

const Box = ({ item }: DragProps) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'BOX',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div role="Handle" ref={drag} className="drag-item">
        <h4>{item.title}</h4>
        <p>
          #{item.number} opened {moment(item.createdAt).fromNow()} by {item.opener}
        </p>
      </div>
    </div>
  );
};

export default Box;
