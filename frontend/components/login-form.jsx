'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {useState} from "react";
import axios from "axios";
import {redirect} from "next/navigation";
export function LoginForm({
  className,
  ...props
}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post("http://localhost:3000/api/user/login",
          {
          email: email,
          password: password,
        },
          {
            withCredentials: true,
          }
      )
      alert(data.message)
      // if (data.success) redirect("/profile");
      // else redirect("/login");
    }
    catch (error) {
      console.log("error logging in", error)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/*<a*/}
                  {/*  href="#"*/}
                  {/*  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">*/}
                  {/*  Forgot your password?*/}
                  {/*</a>*/}
                </div>
                <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
              </Field>
              <Field>
                <Button onClick={(e) => submitForm(e) } type="submit">Login</Button>
                {/*<Button variant="outline" type="button">*/}
                {/*  Login with Google*/}
                {/*</Button>*/}
                <FieldDescription className="text-center">
                  Don't have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
