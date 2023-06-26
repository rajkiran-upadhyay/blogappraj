import express from 'express'
import {signupUser,loginUser} from '../controller/user-controller.js';
import { uploadImage,getImage} from '../controller/image-controller.js';
import upload from '../utils/upload.js'
import { createPost ,getAllPosts,getPost,updatePost,deletePost,deleteCom} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment,getComments } from '../controller/comment-controller.js';

//route is end point of api

const router=express.Router();


router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken,createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
//router.delete('/delete/:id', authenticateToken, deletePost);
router.delete('/todelete/:id',deletePost);
router.delete('/dc/:id',deleteCom);
router.post('/comment/new',authenticateToken,newComment);
router.get('/comments/:id', authenticateToken, getComments);


export default router;
///details/64115bcb70162b2ef2582b7e
//delete(`${API_URL}/todelete/${id}`);
//route.delete('/todelete/:id',deleteTodo)