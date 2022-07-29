class Storage {
  public static getItem(key: string) {
    const data = localStorage.getItem(key);
    return JSON.parse(data || `{}`);
  }
  public static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default Storage;
