import { Request, Response } from 'express';
import LoginService from '../services/login-services';
import validators from '../utils/validators';

declare module 'express-session' {
  interface SessionData {
    loggedin: boolean;
    user_id: string;
  }
}

// login function
const login = async (req: Request, res: Response) => {
  const content = req.body;
  if (validators.contentCheck(res, content)) {
    return;
  }

  const { name, password } = content;

  try {
    const user = await LoginService.login(name, password)
    if (user) {
      req.session.loggedin = true;
      req.session.user_id = user._id || user.id;
      return res.status(200).send({
        status: 200,
        message: 'Logged in successfully!',
        name: name,
      });
    } else {
      throw Error('You have no permission');
    }
  } catch (e: any) {
    return res.status(403).send({
      status: 403,
      message: e.message,
    });
  }
}

// logout function
const logout = (req: Request, res: Response) => {
  if (req.session.loggedin) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send({
          status: 500,
          message: 'Logout unsuccessful. Try again.',
        });
      }
    });
  }
  return res.status(200).send({
    status: 200,
    message: 'Logout successfully!',
  });
}

// login test function
const loginTest = async (req: Request, res: Response) => {
  if (req.session.loggedin) {
    res.send('Logged in');
  } else {
    res.send('Not loggedin');
  }
}

export default {
  login,
  logout,
  loginTest,
}