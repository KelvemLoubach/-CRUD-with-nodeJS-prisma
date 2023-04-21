import { Router } from "express";
import * as controllerPosts from '../controller/post';
import * as controllerUsers from '../controller/user';

const route = Router();

route.get('/posts', controllerPosts.posts);
route.get('/users', controllerUsers.users);

export default route;