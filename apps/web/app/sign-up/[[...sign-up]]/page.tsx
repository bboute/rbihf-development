import type { JSX } from "react"
import { redirect } from "next/navigation";

export default function SignUpPage(): JSX.Element {
  redirect("/sign-in");
}
