import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.send(`hmmmm running  holaa`);
});

router.get('/api/hello', async (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
