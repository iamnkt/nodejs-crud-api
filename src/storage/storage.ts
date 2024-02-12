interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

class DataStorage {
  private dataStorage: User[];

  constructor() {
    this.dataStorage = [];
  }

  public getUsers() {
    return this.dataStorage;
  }

  public createUser(user: User) {
    this.dataStorage.push(user);
  }

  public getUser(userId: string) {
    const user = this.dataStorage.find((userData) => userData.id === userId);
    return user;
  }

  public updateUser(user: User) {
    const index = this.dataStorage.findIndex((storageUser) => storageUser.id === user.id);
    this.dataStorage[index] = user;
  }

  public deleteUser(userId: string) {
    const filteredStorage = this.dataStorage.filter((storageUser) => storageUser.id !== userId);
    this.dataStorage = filteredStorage;
  }

  public clearStorage() {
    this.dataStorage = [];
  }

  public updateStorage(storage: User[]) {
    this.dataStorage = storage;
  }
}

const storage = new DataStorage();

export { storage, User };
