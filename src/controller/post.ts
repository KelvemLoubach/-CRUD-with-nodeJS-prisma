import {Request, Response } from 'express';
import * as services from '../services/post'

export const posts = async (req:Request, res:Response ) =>{
    // Recebe o retorno do service, o await é usado para aguardas a resolução da promisse.
    const allPosts = await services.allPosts.findAllPosts();
    // Constante all recebe um array de strings que é retornado pelo método map() que extrai a propriedade title de cada elemento do array allPosts.
    const all = allPosts.map((post) => post.title)
    res.status(200).json({Títulos:`${all}`});
};