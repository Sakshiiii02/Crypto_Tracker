import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const Signup = async (email, password,username) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
       
    });

    const {data:userData , error:userError} = await supabase.from('crypto').insert([{email:email,username:username}]).select().single()

    if (userError) {
        console.error("Error inserting user into database:", userError.message);
    } else {
        console.log("User successfully added to database:", userData);
    }

    return data;
};


export const Login = async (email,password) => {

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
        toast.error(error.message)
    }
  };