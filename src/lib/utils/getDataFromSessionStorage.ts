/* 세션스토리지에 데이터 저장 */

const getDataFromSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const savedData = sessionStorage.getItem(key);

    if (savedData) {
      return JSON.parse(savedData);
    }
  }

  return null;
};

export default getDataFromSessionStorage;
