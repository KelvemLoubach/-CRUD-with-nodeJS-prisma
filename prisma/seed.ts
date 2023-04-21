import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const main = async () =>{

   const newUser = await prisma.user.create({
    data: {
        email: 'kelvemloubach@gmail.com',
        name: 'Kelvem',
        age: 29, 
    }
   })

   const post = await prisma.post.create({
    data: {
        body: 'Teste do seed 2 ',
        title: 'Testando 2 ....',
        authorId: newUser.idUser
    }
   })
};

main();