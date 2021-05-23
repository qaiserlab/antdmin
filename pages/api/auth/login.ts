export default function login(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ code: 405, message: 'Access denied' });
  }

  const userName = req.body.userName;
  const password = req.body.password;

  let isErrors = false;
  const errors = {
    userName: '',
    password: '',
  };

  if (!userName) {
    isErrors = true;
    errors.userName = 'Username required';
  }

  if (!password) {
    isErrors = true;
    errors.password = 'Password required';
  }

  if (isErrors) {
    return res.status(422).json({ 
      code: 422, 
      message: 'Please correct following errors;',
      errors,
    });
  }

  if (userName !== 'admin') {
    return res.status(404).json({ code: 404, message: 'Invalid Username' });
  }

  if (password !== 'm30ng') {
    return res.status(404).json({ code: 404, message: 'Invalid Password' });
  }

  const token = Math.random().toString(36).substring(7);
  const userInfo = {
    userName: 'admin',
    fullName: 'Fadlun Anaturdasa',
    firstName: 'Fadlun',
    lastName: 'Anaturdasa',
    email: 'f.anaturdasa@gmail.com',
    phoneNumber: '-',
  };

  res.status(200).json({ 
    code: 200,
    message: 'Login success',
    token,
    userInfo,
  })
}