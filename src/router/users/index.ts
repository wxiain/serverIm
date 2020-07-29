import router from '../createRouter';
import Home from '../../models/users';
import UserLogin from '../../models/users/login';
import getUserInfo from '../../models/users/getUserInfo';

import check from '../../middlewares/jwt/check';

router.get('/', Home);
router.post('/login', UserLogin);
router.get('/auth/user', check, getUserInfo);
