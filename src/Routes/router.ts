import { Router } from "express";
import * as controllerPosts from '../controller/postController';
import * as controllerUsers from '../controller/userController';

const router = Router();

router.get('/posts', controllerPosts.posts);
router.get('/users', controllerUsers.users);

router.post('/createpost', controllerPosts.cretePost);
router.post('/createuser',controllerUsers.createUser);

router.put('/changepost/:id',controllerPosts.changePost);

router.delete('/deletepost/:id',controllerPosts.deletePost);
router.delete('/deleteuser/:id',controllerUsers.deleteUser)



export default router;