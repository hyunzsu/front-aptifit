// 세션스토리지에서 데이터를 가져오는 함수

const getFromSessionStorage = (key: string) => {
  return sessionStorage.getItem(key) || "";
};

export default getFromSessionStorage;
