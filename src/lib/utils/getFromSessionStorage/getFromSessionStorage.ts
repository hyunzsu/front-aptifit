const getFromSessionStorage = (key: string) => {
  return sessionStorage.getItem(key);
};

export default getFromSessionStorage;
