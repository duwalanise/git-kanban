import { ChangeEvent, FC, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface IssueInputProps {
  issueUrl: string;
  onUpdate: (value: string) => void;
}

const IssueInput: FC<IssueInputProps> = ({ issueUrl, onUpdate }) => {
  const [url, setUrl] = useState(issueUrl);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={10}>
          <Form.Control
            placeholder="url"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={url}
            onChange={handleChange}
          />
        </Col>
        <Col xs={2}>
          <Button variant="primary" onClick={() => onUpdate(url)}>
            Load
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default IssueInput;
