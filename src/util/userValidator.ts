import { regexV4 } from "../controllers/getRequest";
import { User } from "../storage/storage";

const isValidData = (user: User): user is User => {
  if (!user.id || !regexV4.test(user.id)) {
    return false;
  };

  if (!user.username || typeof user.username !== 'string') {
    return false;
  };

  if (!user.age || typeof user.age !== 'number') {
    return false;
  };

  if (!user.hobbies || !Array.isArray(user.hobbies)) {
    return false;
  } else {
    if (user.hobbies.length === 0 || user.hobbies.some((hobby) => {  
        return typeof hobby !== 'string';
      })) 
    return false;
  };

  if (Object.keys(user).length !== 4) {
    return false;
  }

  return true;
}

export { isValidData };
