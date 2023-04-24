import { Router } from "express";
import * as controllerPosts from '../controller/postController';
import * as controllerUsers from '../controller/userController';

const route = Router();

route.get('/posts', controllerPosts.posts);
route.get('/users', controllerUsers.users);

route.post('/createpost', controllerPosts.cretePost);
route.post('/createuser',controllerUsers.createUser);

route.put('/changepost/:id',controllerPosts.changePost);

route.delete('/deletepost/:id',controllerPosts.deletePost);
route.delete('/deleteuser/:id',controllerUsers.deleteUser)



export default route;