import React, { useState } from 'react';
import Layout from '~/components/layout';
import type { MetaFunction } from '@remix-run/react';
import TextField from '~/components/textField';
import { Link, useActionData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { validationEmail, validatePassword } from '~/components/utils/validator.server';
import { logins } from '~/components/utils/auth.server';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App Login" }
    ];
}

export const loader: LoaderFunction = async ({ request }) => {
    return null;
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const action = form.get("_action");
    const email = form.get("email");
    const password = form.get("password");

    // Log the form data
    console.log("Form Data:", { action, email, password });

    if (
        typeof action !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return json({ error: "Invalid Form Data" }, { status: 400 });
    }

    const errors = {
        email: validationEmail(email),
        password: validatePassword(password),
    };

    if (Object.values(errors).some(Boolean)) {
        return json({ errors, fields: { email, password } }, { status: 400 });
    }

    try {
        return await logins({ email, password });
    } catch (error) {
        console.error("Login error:", error);
        return json({ error: "Login failed" }, { status: 500 });
    }
}

interface ActionData {
    fields?: {
        email?: string;
        password?: string;
    };
    errors?: {
        email?: string;
        password?: string;
    };
}

const Login = () => {
    const actionData = useActionData<ActionData>();
    
    const [formData, setFormData] = useState({
        email: actionData?.fields?.email || '',
        password: actionData?.fields?.password || '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({
            ...form,
            [field]: e.target.value
        }));
    }

    return (
        <Layout>
            <div className="h-full justify-center bg-yellow-100 items-center flex flex-col gap-y-5">
                <form method="POST" className="rounded-2xl bg-white p-6 w-96">
                    <h2 className="text-3xl font-extrabold text-black-600 mb-5">Login</h2>
                    {actionData?.errors && (
                        <div className="text-red-500 mb-3">
                            {Object.values(actionData.errors).map((error, idx) => error && <p key={idx}>{error}</p>)}
                        </div>
                    )}
                    <TextField 
                        htmlFor="email" 
                        type="email" 
                        label="Email" 
                        value={formData.email} 
                        onChange={e => handleInputChange(e, 'email')} 

                    />
                    <TextField 
                        htmlFor="password" 
                        type="password" 
                        label="Password" 
                        value={formData.password} 
                        onChange={e => handleInputChange(e, 'password')} 
            
                    />
                    <div className="w-full text-center mt-5">
                        <button type="submit" name="_action" value="Sign In" className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600">Login</button>
                    </div>
                </form>
                <p className="text-gray-600">Don't have an account?<Link to="/signUp"><span className="text-red-600 px-2 underline">SignUp</span></Link></p>
            </div>
        </Layout>
    )
}

export default Login;