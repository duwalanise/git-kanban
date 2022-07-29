import axios from 'axios';
import { flow, Instance, types } from 'mobx-state-tree';

const Issue = types.model({
  id: '',
  title: '',
  number: 0,
  createdAt: '',
  opener: '',
});

export type IssueType = Instance<typeof Issue>;

const Issues = types
  .model({
    todo: types.optional(types.array(Issue), []),
    pending: types.optional(types.array(Issue), []),
    done: types.optional(types.array(Issue), []),
  })
  .actions((self) => ({
    fetch: flow(function* (url: string) {
      try {
        const { data } = yield axios.get(url);
        (data || []).forEach(({ title, created_at, number, user, id }: any) => {
          self.todo.push(
            Issue.create({
              title,
              id: id.toString(),
              createdAt: created_at,
              number,
              opener: user.login,
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
