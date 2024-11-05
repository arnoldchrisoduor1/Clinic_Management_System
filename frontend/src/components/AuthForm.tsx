"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleUser, Mail, Phone, LockKeyhole } from "lucide-react";
import Input from "./Input";
import Select from "./Select";
import useManageUser from '../graphql/ManageUser';

const AuthForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isRegistering, setIsRegistering] = useState(true);
  const [signUpInput, setSignUpInput] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  });

  const roles = ["admin", "patient", "doctor", "nurse", "pharmacist", "supplier", "delivery", "procurement"];
  
  // Extract functions from the user management hook
  const { handleCreateUser, handleSignIn } = useManageUser();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (isRegistering) {
      setSignUpInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignInInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignUpInput((prev) => ({ ...prev, role: event.target.value }));
  };

  useEffect(() => {
    const email = searchParams.get("email") || "";
    setSignUpInput((prev) => ({ ...prev, email }));
  }, [searchParams]);

  const handleSubmit = async () => {
    if (isRegistering) {
      // Call the createUser function
      await handleCreateUser({
        username: signUpInput.username,
        email: signUpInput.email,
        phone: signUpInput.phone,
        role: signUpInput.role,
        password: signUpInput.password,
      });
      // Optionally redirect or show a success message here
    } else {
      // Call the signIn function
      await handleSignIn({
        email: signInInput.email,
        password: signInInput.password,
      });
      // Optionally redirect or show a success message here
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-20 overflow-x-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className="sm:text-3xl md:text-5xl lg:text-6xl text-center text-black tracking-tighter font-medium">
          {isRegistering ? "Create a New Account" : "Welcome Back"}
        </h1>
        <div className="flex flex-col gap-5 my-10 w-full">
          {isRegistering && (
            <Input
              icon={CircleUser}
              placeholder="Username"
              type="text"
              inputClassName="w-full"
              name="username"
              value={signUpInput.username}
              onChange={handleInputChange}
            />
          )}
          <Input
            icon={Mail}
            placeholder="Email"
            type="email"
            inputClassName="w-full"
            name="email"
            value={isRegistering ? signUpInput.email : signInInput.email}
            onChange={handleInputChange}
          />
          {isRegistering && (
            <Input
              icon={Phone}
              placeholder="Phone Number"
              type="tel"
              inputClassName="w-full"
              name="phone"
              value={signUpInput.phone}
              onChange={handleInputChange}
            />
          )}
          <Input
            icon={LockKeyhole}
            placeholder="Password"
            type="password"
            isContentVisible={false}
            inputClassName="w-full"
            name="password"
            value={isRegistering ? signUpInput.password : signInInput.password}
            onChange={handleInputChange}
          />
          {isRegistering && (
            <Select
              name="role"
              value={signUpInput.role}
              onChange={handleRoleChange}
              options={roles}
            />
          )}
        </div>
        <button
          className="bg-black text-white text-xl px-10 py-2 rounded-md hover:text-white/70 mb-8 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleSubmit} // Call the handleSubmit function
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <p>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? " Login" : " Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
