import { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import IssueInput from '../Components/IssueInput';
import { useStore } from '../Store';
import Board from './Board';

const Main: FC = () => {
  const [url, setGitUrl] = useState('');
  const { issues } = useStore();

  useEffect(() => {
    if (url) {
      issues.fetch(url);
    }
  }, [url]);

  return (
    <Container fluid className="wrapper" data-testid="container">
      <IssueInput issueUrl={url} onUpdate={setGitUrl}></IssueInput>
      <Board />
    </Container>
  );
};

export default Main;
