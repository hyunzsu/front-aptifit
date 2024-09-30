// 세션스토리지에서 데이터를 가져오는 함수

const getDataFromSessionStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) || "");
};

export default getDataFromSessionStorage;
