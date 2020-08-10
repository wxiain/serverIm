import router from '../createRouter';
import routes from '../createRoutes';
import check from '../../middlewares/jwt/check';
import searching from '../../models/friend/searching';
import myList from '../../models/friend/myList';
import apply from '../../models/friend/apply';

routes.get('/searching', check, searching);
routes.get('/myList', check, myList);
routes.post('/apply', check, apply);

router.use('/friend', routes);
