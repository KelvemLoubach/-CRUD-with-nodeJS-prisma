import { Request, Response } from "express";
import * as services from '../services/users';

export const users = async (req:Request, res:Response) => {
    
    const users = await services.user.findAllUsers();
    const allUsers = users.map((user) => user.email);
    res.status(200).json({Usuários:`${allUsers}`});

};
