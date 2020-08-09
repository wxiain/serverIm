import router from '../createRouter';
import routes from '../createRoutes';
import check from '../../middlewares/jwt/check';
import searching from '../../models/friend/searching';
import myList from '../../models/friend/myList';

routes.get('/searching', check, searching);
routes.get('/myList', check, myList);

router.use('/friend', routes);
