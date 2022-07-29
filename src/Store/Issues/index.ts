import axios from 'axios';
import { flow, Instance, types } from 'mobx-state-tree';
import IssueStatus, { IssueStatusType } from '../../Constants/issueStatus';

const Issue = types
  .model({
    id: '',
    title: '',
    number: 0,
    createdAt: '',
    opener: '',
    status: '',
  })
  .actions((self) => ({
    setStatus: (status: IssueStatusType) => {
      self.status = status;
    },
  }));

export type IssueType = Instance<typeof Issue>;

const Issues = types
  .model({
    items: types.optional(types.array(Issue), []),
  })
  .views((self) => ({
    get todo() {
      return self.items.filter((item) => item.status === IssueStatus.TODO);
    },
    get inprogress() {
      return self.items.filter((item) => item.status === IssueStatus.INPROGRESS);
    },
    get done() {
      return self.items.filter((item) => item.status === IssueStatus.DONE);
    },
  }))
  .actions((self) => ({
    fetch: flow(function* (url: string) {
      try {
        const { data } = yield axios.get(url);
        (data || []).forEach(({ title, created_at, number, user, id }: any) => {
          self.items.push(
            Issue.create({
              title,
              id: id.toString(),
              createdAt: created_at,
              number,
              opener: user.login,
              status: IssueStatus.TODO,
            }),
          );
        });
      } catch (error) {
        console.warn(error);
      }
    }),
  }))
  .named('Issues');

export default Issues;

export type IssuesInstance = Instance<typeof Issues>;
