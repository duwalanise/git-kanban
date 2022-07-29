import { Col, Container, Row } from 'react-bootstrap';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Drop from '../../Components/Drop';
import { IssueType } from '../../Store/Issues';
import { useStore } from '../../Store';
import { observer } from 'mobx-react';
import Drag from '../../Components/Drag';
import { ComponentType } from 'react';
import IssueStatus, { IssueStatusType } from '../../Constants/issueStatus';

const Board = () => {
  const { issues } = useStore();

  const handleDrop = (dropTarget: IssueStatusType) => (item: IssueType) => {
    issues.updateStatus(dropTarget, item);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className="board-wrapper">
        <Row>
          <Col xs={4}>
            <Drop<IssueType>
              title="To Do"
              items={issues.todo}
              onDrop={handleDrop(IssueStatus.TODO)}
              ItemDisplay={Drag as ComponentType<{ item: IssueType }>}
            />
          </Col>
          <Col xs={4}>
            <Drop<IssueType>
              title="In Progress"
              items={issues.inprogress}
              onDrop={handleDrop(IssueStatus.INPROGRESS)}
              ItemDisplay={Drag as ComponentType<{ item: IssueType }>}
            />
          </Col>
          <Col xs={4}>
            <Drop<IssueType>
              title="Done"
              items={issues.done}
              onDrop={handleDrop(IssueStatus.DONE)}
              ItemDisplay={Drag as ComponentType<{ item: IssueType }>}
            />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default observer(Board);
