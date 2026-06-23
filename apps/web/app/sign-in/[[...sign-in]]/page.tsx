import type { JSX } from "react"
import { SignIn } from "@clerk/nextjs";

export default function SignInPage(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            card: "bg-card border-border",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton:
              "bg-background border-border hover:bg-accent",
            formFieldInput: "bg-background border-border",
            footerActionLink: "text-primary hover:text-primary/90",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl=""
      />
    </div>
  );
}
