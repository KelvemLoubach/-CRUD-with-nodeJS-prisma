import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const user = {

    findAllUsers: async () =>{
        return await prisma.user.findMany({});
    },

}



