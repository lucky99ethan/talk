import React, { useState } from 'react';
import Layout from '~/components/layout';
import type { MetaFunction } from '@remix-run/react';
import TextField from '~/components/textField';
import { Link, useActionData, useOutletContext } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { validationEmail, validatePassword, validateName } from '~/components/utils/validator.server';
import { signUp } from '~/components/utils/auth.server';
import { SupabaseOutletContext } from '~/components/utils/supabaseClient';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App Sign Up" }
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
    const name = form.get("name");

    // Log the form data
    console.log("Form Data:", { action, email, password, name });

    if (
        typeof action !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof name !== "string"
    ) {
        return json({ error: "Invalid Form Data" }, { status: 400 });
    }

    const errors = {
        email: validationEmail(email),
        password: validatePassword(password),
        name: validateName(name),
    };

    if (Object.values(errors).some(Boolean)) {
        return json({ errors, fields: { email, password, name } }, { status: 400 });
    }

    try {
        const { user, session } = await signUp({ email, password, name });
        if (!user) {
            throw new Error('Sign Up failed');
        }
        return redirect("/login");
    } catch (error) {
        console.error("Sign Up error:", error);
        return json({ error: error.message || "Sign Up failed" }, { status: 500 });
    }
}

interface ActionData {
    fields?: {
        email?: string;
        password?: string;
        name?: string;
    };
    errors?: {
        email?: string;
        password?: string;
        name?: string;
    };
    error?: string;
}

const SignUp = () => {
    const actionData = useActionData<ActionData>();
    
    const [formData, setFormData] = useState({
        email: actionData?.fields?.email || '',
        password: actionData?.fields?.password || '',
        name: actionData?.fields?.name || '',
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({
            ...form,
            [field]: e.target.value
        }));
    }

    const { supabase, domainUrl } = useOutletContext<SupabaseOutletContext>();


    return (
        <Layout>
            <div className="h-full justify-center bg-yellow-100 items-center flex flex-col gap-y-5">
                <form method="POST" className="rounded-2xl bg-white p-6 w-96">
                    <h2 className="text-3xl font-extrabold text-black-600 mb-5">Sign Up</h2>
                    {actionData?.errors && (
                        <div className="text-red-500 mb-3">
                            {Object.values(actionData.errors).map((error, idx) => error && <p key={idx}>{error}</p>)}
                        </div>
                    )}
                    {actionData?.error && (
                        <div className="text-red-500 mb-3">
                            <p>{actionData.error}</p>
                        </div>
                    )}
                    <TextField 
                        htmlFor="name" 
                        type="text" 
                        label="Name" 
                        value={formData.name} 
                        onChange={e => handleInputChange(e, 'name')} 
                    />
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
                        <button type="submit" name="_action" value="Sign Up" className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600">Sign Up</button>
                    </div>
                </form>
                <p className="text-gray-600">Already have an account?<Link to="/login"><span className="text-red-600 px-2 underline">Login</span></Link></p>
            </div>
        </Layout>
    )
}

export default SignUp;