import User, { ServerUser, users } from './users';

export const loginValidation = ( email : string, pass : string) => {
    return users.some(u => u.email === email && u.password === pass);
}

export const findUser = async (email : string, pass : string) => {
    //Si quiero buscar en la lista quitar commit de este
    //return users.find(u => u.email === email && u.password === pass);
    

    //Para buscarlo en la db
    let encontrado = new User();
    await User.findOne({email: email})
    .then((result) => {
        console.log(result);
        if(result?.password == pass){
            encontrado = result;
        }
    })
    .catch((error) => {
        console.log(error);
    });
    
    return encontrado;
}

export const findUserById = async (id : string) => {
    //Si quiero buscar en la lista quitar commit de este
    //return users.find(u => u.id === id);

    //Para buscarlo en la db
    let encontrado = new User();
    await User.findOne({id: id})
    .then((result) => {
        console.log(result);
        if(result != null)
            encontrado = result;
    })
    .catch((error) => {
        console.log(error);
    });
    
    return encontrado;
}

export const loadAllUsers = () => {
    users.forEach(u => {
        createUser(u);
    });
}

export const createUser = async (user : ServerUser) => {
    if(User.findOne({id: user.id}) == null){
        const newUser = new User({
            id: user.id,
            age: user.age,
            avatar: user.avatar,
            email: user.email,
            name: user.name,
            password: user.password,
            role: user.role,
            surname: user.surname,
        });
        
        newUser.save()
        .then(result => {
            return true;
        })
    }
}