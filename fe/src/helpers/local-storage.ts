type LocalStorageType = "access-token" | "recently-flashcard";

const isBrowser = typeof window !== "undefined";

const LocalStorage = {
  getLocalStorage: <T>(key: LocalStorageType, defaultValue: T): T => {
    if (!isBrowser) return defaultValue;

    try {
      const value = localStorage.getItem(key);
      if (value && value !== "undefined" && value !== "null") {
        return JSON.parse(value) as T;
      }
    } catch (error) {
      console.error(error);
    }

    return defaultValue;
  },

  setLocalStorage: (key: LocalStorageType, value: unknown) => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  },

  removeLocalStorage: (
    key?: LocalStorageType,
    all = false,
    listKey?: LocalStorageType[],
  ) => {
    if (!isBrowser) return;

    if (all) {
      localStorage.clear();
      return;
    }

    if (listKey?.length) {
      listKey.forEach((item) => localStorage.removeItem(item));
      return;
    }

    if (key) {
      localStorage.removeItem(key);
    }
  },
};

export default LocalStorage;
