export const generateApiUrl = (url: string) => {
  const pattern = /(?:https:\/\/)?github.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)/;
  if (!pattern.test(url)) {
    throw new Error('Invalid Url');
  }
  const [_, user, repo] = url.match(pattern) || [];
  if (!user || !repo) {
    throw new Error('Invalid Url');
  }
  return { url: `https://api.github.com/repos/${user}/${repo}/issues`, key: `${user}${repo}` };
};
