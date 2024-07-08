import { registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const newUser = await registerUser(req.body);

  // дістаємо данні без паролю
  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);

  // далі ми доповнемо цей контролер
};
