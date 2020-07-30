import router from '../createRouter';
import check from '../../middlewares/jwt/check';
import searching from '../../models/friend/searching';

router.get('/friend/searching', check, searching);
