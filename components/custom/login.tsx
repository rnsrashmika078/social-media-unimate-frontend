import React from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

// component
const Login = () => {
  return (
    <div className="border rounded-2xl flex flex-col w-full p-5">
      <h1 className="text-2xl mb-4">LOGIN</h1>
      <Field className="mb-2">
        <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
        <Input
          id="input-field-username"
          type="text"
          className="p-5 mb-2"
          placeholder="Enter your email"
        />
        <FieldLabel htmlFor="input-field-username">Password</FieldLabel>
        <Input
          id="input-field-username"
          type="text"
          className="p-5 mb-2"
          placeholder="Enter your password"
        />
        <FieldDescription>
          Enter your login credentials to login
        </FieldDescription>
      </Field>
      <Button>LOGIN</Button>
    </div>
  );
};

export default Login;
