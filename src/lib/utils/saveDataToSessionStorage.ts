// 세션스토리지에서 데이터를 저장하는 함수

const saveDataToSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export default saveDataToSessionStorage;
