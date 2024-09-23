// 세션스토리지에서 데이터를 저장하는 함수

const saveToSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export default saveToSessionStorage;
