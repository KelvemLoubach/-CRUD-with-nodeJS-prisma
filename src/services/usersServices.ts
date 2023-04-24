import { PrismaClient } from "@prisma/client";
import * as servicesPost from '../services/postServices';

const prisma = new PrismaClient();

// Type com propriedades que podem ou não existir.
type findOneData = {
    id?: number,
    email?: string
};
// Type para criar usuários.
type createUserService = {
    email: string,
    name: string,
    age?: number
};


export const userObjectFunctions = {

    // Retorndo todos os usuários.
    findAllUsers: async () => {
        return await prisma.user.findMany({});
    },

    findUser: async (data: findOneData) => {

        // Retornando apenas um usuário. Essa função assincrôna recebe como parâmetro um objeto chamado "data" do tipo "findOneData".
        return await prisma.user.findUnique({
            // Condição where recebe um objeto com a propriedade "idUser" que recebe a propriedade id do objeto data.
            where: { idUser: data.id }
        })
    },

    userCreate: async (data: createUserService) => {
        // Verificando de existe um usuário cadastrado.
        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });
        // Se "user" for "null", cria um usuário passando como parâmetro o objeto "data". Senão, retorna o usuário existente no db.
        if (!(user)) {
            return await prisma.user.create({
                data
            })
        }
    },

    deleteUser: async (data:findOneData) => {
        // Verificamos se o usuário existe de fato no db. Esse método nativo do primsa "findUnique" retorna uma instâcia de um usuário ou "null".
        const userDelete = await prisma.user.findUnique({
            where:{idUser:data.id}
        });

        if(userDelete){
            // Se "userDelete" existir vamos enviar o "id" do objeto "data" como parâmetro para a função "deleteUserAndPosts", pois como há uma relação entes as tabelas "users" e "posts" não podemos excluir um usuário sem antes excluir seus posts.
            await servicesPost.allPosts.deleteUserAndPosts(data.id as number);
            // Então depois de excluir os posts do usuário excluímos o usuário.
            return await prisma.user.delete({
                where:{idUser:data.id}
            })
        }
    }
}




