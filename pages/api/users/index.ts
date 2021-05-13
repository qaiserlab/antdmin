export default function readAll(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Access denied' });
  }

  res.status(200).json([
    { 
      id: 1, 
      fullName: 'Steve Jobs',
      email: 'steve@jobs.com',
      phoneNumber: 'xxx-xxxx-xxx',
    },
    { 
      id: 1, 
      fullName: 'Bill Gates',
      email: 'bill@gates.com',
      phoneNumber: 'xxx-xxxx-xxx',
    },
    { 
      id: 1, 
      fullName: 'Linus Torvalds',
      email: 'linus@torvalds.com',
      phoneNumber: 'xxx-xxxx-xxx',
    },
  ])
}