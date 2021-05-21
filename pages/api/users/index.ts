export default function readAll(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Access denied' });
  }

  res.status(200).json([
    { 
      id: '7beccbda-e34f-4534-9267-65936b6a6dd9', 
      fullName: 'Steve Jobs',
      userName: 'stevejobs',
      email: 'steve@jobs.com',
      phoneNumber: 'xxx-xxxx-xxx',
    },
    { 
      id: 'e5916851-7575-4187-82e5-bcd54dd04390', 
      fullName: 'Bill Gates',
      userName: 'billgates',
      email: 'bill@gates.com',
      phoneNumber: 'xxx-xxxx-xxx',
    },
    { 
      id: '9fb28f2b-acf1-459b-8619-4dcc45e290a7', 
      fullName: 'Linus Torvalds',
      userName: 'linustorvalds',
      email: 'linus@torvalds.com',
      phoneNumber: 'xxx-xxxx-xxx',
    },
  ])
}