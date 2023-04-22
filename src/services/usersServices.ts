import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Type com propriedades que podem ou não existir.
type findOneData = {
    id?:number,
    email?:string
}


export const userObjectFunctions = {

    // Retorndo todos os usuários.
    findAllUsers: async () =>{
        return await prisma.user.findMany({});
    },

    findUser: async (data:findOneData) =>{
        
        // Retornando apenas um usuário. Essa função assincrôna recebe como parâmetro um objeto chamado "data" do tipo "findOneData".
        return await prisma.user.findUnique({
            // Condição where recebe um objeto com a propriedade "idUser" que recebe a propriedade id do objeto data.
            where:{idUser:data.id}
        })
    }
}




