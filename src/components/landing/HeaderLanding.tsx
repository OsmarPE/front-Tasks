import { Link } from "react-router-dom";
import Container from "../Container";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export default function HeaderLanding() {
    return (
        <header className="">
            <Container className="h-20 flex items-center justify-between">
                <Link to='' className="uppercase tracking-[4px] text-sm">OS PROJECTS</Link>
                <div className="flex gap-4">
                    <Button variant={'secondary'}>Registrarse</Button>
                    <Button>Iniciar Sesión</Button>
                    <ModeToggle/>
                </div>
            </Container>
        </header>
    )
}
