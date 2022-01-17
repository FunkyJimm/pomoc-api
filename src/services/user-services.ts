import { default as User } from "../db/models/user";
import Validators from '../utils/validators';

const getUsers = async function() {
  try {
    const users = await User.find()
    if (Object.keys(users).length === 0) {
      throw Error('Users list is empty.');
    }
    return users.map(user => (
      {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    ));
  } catch (e: any) {
    throw Error(`Something went wrong with database. ${e.message}`);
  }
}

const getUserDetails = async function(id: string) {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw Error(`User with Id: ${id} is not found.`);
    }
    return user;
  } catch (e: any) {
    throw Error(e.message);
  }
}

const addUser = async function(content: any) {
  const { name, password, email } = content;
  const user = new User({ name, password, email });

  try {
    await user.save()
  } catch (e: any) {
    throw Error(e.message);
  }
}

const updateUser = async function(id: string, content: any) {
  const { name, password, email } = content;

  try {
    const user = await User.findByIdAndUpdate(id, { name, password, email }, Validators.options)
    if (!user) {
      throw Error(`User with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

const deleteUser = async function(id: string) {
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      throw Error(`User with Id: ${id} is not found.`);
    }
  } catch (e: any) {
    throw Error(e.message);
  }
}

export default {
  getUsers,
  getUserDetails,
  addUser,
  updateUser,
  deleteUser,
}