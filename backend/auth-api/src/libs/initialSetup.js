import Role from "../models/Role.js"

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()//are there documents?
        if(count > 0) return;
        
        const values = await Promise.all ([
            new Role({name: "regular"}).save(),
            new Role({name: "admin"}).save(),
            new Role({name: "supervisor"}).save()
        ]) 
        console.log(values)
    } catch (error) {
       console.error(error) 
    }
}