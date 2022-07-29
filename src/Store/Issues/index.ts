import axios from 'axios';
import { flow, getParent, getRoot, Instance, types } from 'mobx-state-tree';
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
    position: 0,
  })
  .actions((self) => ({
    setStatus: (status: IssueStatusType) => {
      self.status = status;
      (getRoot(self) as any).issues.updateStorage(self as IssueType);
    },
    updatePosition: (position: number) => {
      self.position = position;
      (getRoot(self) as any).issues.updateStorage(self as IssueType);
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
      return self.items
        .filter((item) => item.status === IssueStatus.TODO)
        .sort((a, b) => (a.position > b.position ? 1 : -1));
    },
    get inprogress() {
      return self.items
        .filter((item) => item.status === IssueStatus.INPROGRESS)
        .sort((a, b) => (a.position > b.position ? 1 : -1));
    },
    get done() {
      return self.items
        .filter((item) => item.status === IssueStatus.DONE)
        .sort((a, b) => (a.position > b.position ? 1 : -1));
    },
  }))
  .actions((self) => ({
    setUrl(url: string) {
      self.url = url;
    },
    updateStorage(item: IssueType) {
      const { key } = generateApiUrl(self.url);
      const statusMap = Storage.getItem(key);
      statusMap[item.id] = { status: item.status, position: item.position };
      Storage.setItem(key, statusMap);
    },
  }))
  .actions((self) => ({
    fetch: flow(function* () {
      try {
        self.items.clear();
        const { url, key } = generateApiUrl(self.url);
        const statusMap = Storage.getItem(key);
        const { data } = yield axios.get(url);
        (data || []).forEach(({ title, created_at, number, user, id }: any, index: number) => {
          const item = Issue.create({
            title,
            id: id.toString(),
            createdAt: created_at,
            number,
            opener: user.login,
            status: statusMap[id]?.status || IssueStatus.TODO,
            position: statusMap[id]?.position || index,
          });
          self.items.push(item);
          self.updateStorage(item);
        });
      } catch (error) {
        console.warn(error);
      }
    }),
  }))
  .named('Issues');

export default Issues;

export type IssuesInstance = Instance<typeof Issues>;
