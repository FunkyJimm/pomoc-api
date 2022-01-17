import { default as User } from '../db/models/user';

const login = async function(name: string, password: string) {
  try {
    const user = await User.findOne({ name, password })
    if (!user) {
      throw Error('Wrong name or password!');
    }
    return user;
  } catch (e: any) {
    throw Error(e.message);
  }
}

export default {
  login,
}