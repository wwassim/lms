const {PrismaClient} = require("@prisma/client") 

const database = new PrismaClient();

async function main(){
    try {
        await database.category.createMany({
            data: [
                {name: "computre science"},
                {name: "fitness"},
                {name: "dancing"},
                {name: "Engineering"},
                {name: "filming"},
                {name: "Music"},
            ]
        })
        
    } catch (error) {
        console.log("Error: ", error)
    } finally{
        await database.$disconnect()
    }
}

main()