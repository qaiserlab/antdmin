export default function Api(req, res) {
  res.status(200).json({ 
    name: 'Next.js Admin API',
    version: '0.0.1',
  })
}