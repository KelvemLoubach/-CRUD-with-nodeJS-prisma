import { PrismaClient} from '@prisma/client';
// Constante prisma recebe uma nova instância de prismaClient.
const prisma = new PrismaClient();
// Exportadno o objeto allPosts que contêm propriedades com valores que são funções assincrônas que fazem buscas no db.
export const allPosts = {

    findAllPosts: async () => {
        return await prisma.post.findMany({
            where:{
                published:true
            }
        })
    }

};

