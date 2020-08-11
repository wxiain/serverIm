import { Router } from 'express';
import Message from '../../models/message';

const router = Router();

router.get('/home', Message);

export default router;
