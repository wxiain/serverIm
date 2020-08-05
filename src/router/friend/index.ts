import router from '../createRouter';
import check from '../../middlewares/jwt/check';
import searching from '../../models/friend/searching';
import myList from '../../models/friend/myList';

router.get('/friend/searching', check, searching);
router.get('/friend/myList', check, myList);
