import bcryptjs from "bcryptjs";

export const saltAndHashPassword = async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(password, salt);
    return passwordHash;
}