

export class LocalStoreService {

    static getItem<T>(key: string): T | null {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }

    static setItem<T>(key: string, value: T) {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
            return;
        } else {
            localStorage.setItem(key, value as string);
        }
    }
}