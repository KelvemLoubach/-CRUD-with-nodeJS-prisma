import { Router } from "express";
import * as controllerPosts from '../controller/postController';
import * as controllerUsers from '../controller/userController';

const route = Router();

route.get('/posts', controllerPosts.posts);
route.get('/users', controllerUsers.users);

route.post('/createpost', controllerPosts.cretePost);



export default route;