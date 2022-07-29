import { observer } from 'mobx-react';
import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import IssueInput from '../Components/IssueInput';
import { useStore } from '../Store';
import Board from './Board';

const Main: FC = () => {
  const {
    issues: { url, setUrl, fetch },
  } = useStore();

  useEffect(() => {
    if (url) {
      fetch();
    }
  }, [url]);

  return (
    <Container fluid className="wrapper" data-testid="container">
      <IssueInput issueUrl={url} onUpdate={setUrl}></IssueInput>
      <Board />
    </Container>
  );
};

export default observer(Main);
