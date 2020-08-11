import { Router } from 'express';
import check from '../../middlewares/jwt/check';
import searching from '../../models/friend/searching';
import myList from '../../models/friend/myList';
import apply from './apply';

const router = Router();

router.get('/searching', check, searching); // 好友添加前检索
router.get('/myList', check, myList); // 好友列表

router.use('/apply', apply);

export default router;
