import { PrismaClient} from '@prisma/client';
// Constante prisma recebe uma nova instância de prismaClient.
const prisma = new PrismaClient();

// Exportadno o objeto allPosts que contêm propriedades com valores que são funções assincrônas que fazem buscas no db.
export const allPosts = {

    findAllPosts: async () => {
        // Retornado com o método natico do prisma "findMany" os posts que possuem o campo "published" com o valor true.
        return await prisma.post.findMany({
            where:{
                published:true
            }
        })
    },

    createPost: async (authorId:number, body:string, title:string) => {
        // Retornando o post criado com o método nativo do ORM prisma, "create". 
        return await prisma.post.create({
            data: {
                authorId,
                body,
                title
            }
        })
    }

};

