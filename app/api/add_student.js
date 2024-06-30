import { addStudent } from '../../utils/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usn, email } = req.body;
    try {
      await addStudent(usn, email);
      res.status(200).send('Student added successfully');
    } catch (error) {
      res.status(500).send('Error adding student');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
