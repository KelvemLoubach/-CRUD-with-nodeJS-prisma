import { PrismaClient } from "@prisma/client";

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
    }
}




