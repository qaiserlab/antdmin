export default function login(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Access denied' });
  }

  const userName = req.body.userName;
  const password = req.body.password;

  if (userName !== 'admin') {
    return res.status(400).json({ message: 'Invalid Username' });
  }

  if (password !== 'm30ng') {
    return res.status(400).json({ message: 'Invalid Password' });
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
    token,
    userInfo,
  })
}