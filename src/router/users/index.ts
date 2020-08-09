import router from '../createRouter';
import routes from '../createRoutes';
import Home from '../../models/users';
import UserLogin from '../../models/users/login';
import getUserInfo from '../../models/users/getUserInfo';

import check from '../../middlewares/jwt/check';

// router.get('/', Home);
routes.post('/login', UserLogin);
routes.get('/info', check, getUserInfo);

router.use('/user', routes);
