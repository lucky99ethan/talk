import React, { useState } from 'react'
import Layout from '~/components/layout';
import type { MetaFunction } from '@remix-run/react';
import TextField from '~/components/textField';
import { Link, useActionData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App Login" }
    ];
}

export const loader: LoaderFunction = async ({ request }) => {
    return null;
}

export const action: ActionFunction = async ({ request }) => {
    return null;
}

interface ActionData {
    fields?: {
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
                    <TextField htmlFor="Email" label="Email" value={formData.email} onChange={e => handleInputChange(e, 'email')} />
                    <TextField htmlFor="Password" label="Password" type="password" value={formData.password} onChange={e => handleInputChange(e, 'password')} />
                    <div className="w-full text-center mt-5">
                        <button type="submit" name="_action" value="Sign In" className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600">Login</button>
                    </div>
                </form>
                <p className="text-gray-600">Don't have an account?<Link to="/signUp"><span className="text-red-600 px-2 underline">SignUp</span></Link></p>
            </div>
        </Layout>
    )
}

export default Login