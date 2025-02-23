import bcrypt from "bcrypt"



export const hash_pass = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};


export const comp_pass = async (password: string, userPassword: string) => {
    const comp_password =await bcrypt.compare(password, userPassword)

    if (!comp_password) {
        throw new Error("invalid password")
    }
    return comp_password
}