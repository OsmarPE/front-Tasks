import { Link } from "react-router-dom";
import Container from "../Container";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";
import { ChevronRight } from "lucide-react";

export default function HeaderLanding() {

    const { userId } = useAuth()

   

    return (
        <header className="">
            <Container className="h-20 flex items-center justify-between">
                <Link to='' className="uppercase tracking-[4px] text-xs md:text-sm ">OS PROJECTS</Link>
                <div className="flex gap-3 md:gap-4">

                    {userId && (
                        <Button asChild variant={'link'} >
                            <Link className="flex items-center  md:gap-2 group/link" to={'/main'}>
                            Dashboard
                            <ChevronRight className="transition-all duration-300 group-hover/link:translate-x-1" width={16} />
                            </Link>
                        </Button>
                    )}
                    <SignedOut>
                        <Button asChild>
                            <SignInButton>
                                Iniciar Sesión
                            </SignInButton>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    <ModeToggle />
                </div>
            </Container>
        </header>
    )
}
