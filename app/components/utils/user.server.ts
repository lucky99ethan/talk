import { prisma } from "./prisma.server";
import { RegistrationForm } from "./types.server";
import bcrypt from "bcryptjs";

export const createUser = async (form: RegistrationForm) => {
    const passwordHash = await bcrypt.hash(form.password, 10);
    const user = await prisma.user.create({
        data: {
            email: form.email,
            name: form.name,
            password: passwordHash,
        }
    });
    return { id: user.id, email: user.email };
};