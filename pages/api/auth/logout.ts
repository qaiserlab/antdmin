export default function logout(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Access denied' });
  }

  const token = '';
  const userInfo = {
    userName: '',
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  res.status(200).json({ 
    token,
    userInfo,
  })
}