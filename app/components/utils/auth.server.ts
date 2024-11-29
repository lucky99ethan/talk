import { prisma } from "./prisma.server";
import { RegistrationForm, LoginForm } from "./types.server";
import bcrypt from "bcryptjs";
import { json } from "@remix-run/node";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const secret = process.env.SESSION_SECRET;
if (!secret) {
    throw new Error('SESSION_SECRET is not set');
}

const storage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [secret],
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    }
});

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

export const register = async (form: RegistrationForm) => {
    const exists = await prisma.user.count({ where: { email: form.email } });
    
    if (exists) {
        return json({ error: 'User already exists' }, { status: 400 });
    }
    
    const user = await createUser(form);
    if (!user) {
        return json({ 
            error: 'Something went wrong trying to create a new user', 
            fields: { email: form.email, name: form.name } 
        }, { status: 400 });
    }
    
    return createUserSession(user.id, '/');
};

export const logins = async (form: LoginForm) => {
    const user = await prisma.user.findUnique({ where: { email: form.email } });
    
    if (!user || !(await bcrypt.compare(form.password, user.password))) {
        return json({ error: "Incorrect email or password" }, { status: 400 });
    }
    
    return createUserSession(user.id, '/');
};

export const createUserSession = async (userId: string, redirectTo: string) => {
    const session = await storage.getSession();
    session.set('userId', userId);
    
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        }
    });
};

export const getUserSession = async (request: Request) => {
    return storage.getSession(request.headers.get('Cookie'));
};

export const getUserId = async (request: Request) => {
    const session = await getUserSession(request);
    const userId = session.get('userId');
    return userId;
};

export const requireUserId = async (
    request: Request, 
    redirectTo: string = new URL(request.url).pathname
) => {
    const session = await getUserSession(request);
    const userId = session.get('userId');
    
    if (!userId) {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
        throw redirect(`/login?${searchParams}`);
    }
    
    return userId;
};

export const logout = async (request: Request) => {
    const session = await storage.getSession(request.headers.get('Cookie'));
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        }
    });
};