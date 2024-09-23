const saveToSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export default saveToSessionStorage;
