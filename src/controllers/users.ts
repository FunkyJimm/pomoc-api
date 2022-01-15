import { Request, Response } from "express";
import { default as User } from "../db/models/user";

// get all users list
const getUsers = async(req: Request, res: Response) => {
  User.find()
  .then(users => {
    if (Object.keys(users).length === 0) {
      return res.status(404).send({
        message: 'Error. Users list are empty.'
      })
    }
    const usersList = users.map(user => (
      {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    ));
    res.send(usersList);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Something went wrong with the server :( Try again later.'
    });
  });
}

// get user details
const getUserDetails = async(req: Request, res: Response) => {
  const id = req.params.userId;

  User.findById(id)
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: `User with Id: ${id} is not found.`
      });
    }
    res.send(user);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `User with Id: ${id} is not found.`
      })
    }
    return res.status(500).send({
      message: `Error retrieving user with Id: ${id}. Try again later!`
    });
  });
}

// add a user
const addUser = async(req: Request, res: Response) => {
  if (!req.body.name && !req.body.password && !req.body.email) {
    return res.status(400).send({
      message: 'User content can not be empty.'
    });
  }

  const { name, password, email } = req.body;
  const user = new User({ name, password, email });

  user.save(err => {
    if (err) {
      res.status(500).send(err.message || 'Error. User can not be added.');
    } else {
      res.send('User has been successfully added.')
    }
  });
}

// update a user
const updateUser = async(req: Request, res: Response) => {
  if (!req.body.name && !req.body.password && !req.body.email) {
    return res.status(400).send({
      message: 'User content can not be empty.'
    });
  }

  const id = req.params.userId;
  const { name, password, email } = req.body;
  
  const options = {
    runValidator: true,
    upsert: false,
  }

  User.findByIdAndUpdate(id, { name, password, email }, options, (err) => {
    if (err) {
      res.status(404).send({
        message: `User with Id: ${id} is not found.`
      });
    } else {
      res.send('User has been updated.');
    }
  });
}

// delete a user
const deleteUser = async(req: Request, res: Response) => {
  const id = req.params.userId;

  User.findByIdAndDelete(id, null, (err) => {
    if (err) {
      res.status(404).send({
        message: `User with Id: ${id} is not found.`
      });
    } else {
      res.send('User has been deleted.')
    }
  });
}

export default {
  getUsers,
  getUserDetails,
  addUser,
  updateUser,
  deleteUser,
}