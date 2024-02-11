interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

class DataStorage {
  private dataSorage: User[];

  constructor() {
    this.dataSorage = [];
  }

  public create(user: User) {
    this.dataSorage.push(user);
  }

  public update(user: User) {
    const index = this.dataSorage.findIndex((storageUser) => {
      return storageUser.id === user.id;
    });
    this.dataSorage[index] = user;
  }

  public delete(user: User) {
    const filteredStorage = this.dataSorage.filter((storageUser) => {
      return storageUser.id !== user.id;
    });
    this.dataSorage = filteredStorage;
  }

}

export { DataStorage };
