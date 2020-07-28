import router from '../createRouter';
import Home from '../../models/users';
import UserLogin from '../../models/users/login';

router.get('/', Home);
router.post('/login', UserLogin);
