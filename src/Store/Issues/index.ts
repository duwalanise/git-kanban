import axios from 'axios';
import { flow, Instance, types } from 'mobx-state-tree';
import IssueStatus, { IssueStatusType } from '../../Constants/issueStatus';
import { generateApiUrl } from '../../Utils/urlHelper';
import Storage from '../../Utils/storage';

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
    url: '',
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
    setUrl(url: string) {
      self.url = url;
    },
    fetch: flow(function* () {
      try {
        self.items.clear();
        const { url, key } = generateApiUrl(self.url);
        const statusMap = Storage.getItem(key);
        const { data } = yield axios.get(url);
        (data || []).forEach(({ title, created_at, number, user, id }: any) => {
          self.items.push(
            Issue.create({
              title,
              id: id.toString(),
              createdAt: created_at,
              number,
              opener: user.login,
              status: statusMap[id] || IssueStatus.TODO,
            }),
          );
        });
      } catch (error) {
        console.warn(error);
      }
    }),
    updateStatus(status: IssueStatusType, item: IssueType) {
      item.setStatus(status);
      const { key } = generateApiUrl(self.url);
      const statusMap = Storage.getItem(key);
      statusMap[item.id] = status;
      Storage.setItem(key, statusMap);
    },
  }))
  .named('Issues');

export default Issues;

export type IssuesInstance = Instance<typeof Issues>;
