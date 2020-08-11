import { Router } from 'express';
import check from '../../middlewares/jwt/check';
import searching from '../../models/friend/searching';
import myList from '../../models/friend/myList';
import apply from './apply';

const router = Router();

router.get('/searching', check, searching);
router.get('/myList', check, myList);

router.use('/apply', apply);

export default router;
