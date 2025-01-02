import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SUPABASE_URL or SUPABASE_ANON_KEY is not set');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const logins = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
  console.log("the data: ", data)
  return data;
};

export const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    console.error('Sign Up error:', error);
    throw new Error('Sign Up failed');
  }

  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database using Supabase
  const { error: dbError } = await supabase.from('profile').insert([
    { email, password: hashedPassword, name },
  ]);

  if (dbError) {
    console.error('Database error:', dbError);
    throw new Error('Database error');
  }

  return data;
};