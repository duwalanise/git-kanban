const IssueStatus = Object.freeze({
  TODO: 'TODO',
  INPROGRESS: 'INPROGRESS',
  DONE: 'DONE',
});

export default IssueStatus;

export type IssueStatusType = keyof typeof IssueStatus;
