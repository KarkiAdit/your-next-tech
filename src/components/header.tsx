import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar
} from '@nextui-org/react';
import { auth } from '@/auth';

export default async function Header() {
    const session = await auth();
    let authContent: React.ReactNode;
    if (session?.user) {
        authContent = <>
            <NavbarItem className='font-bold'>
                {session.user.name}
            </NavbarItem>
            <NavbarItem>
                <Avatar src={session.user.image || ""} />
            </NavbarItem>
        </>
    } else {
        authContent = <>
            <NavbarItem>
                <Button type='submit' color='secondary' variant='bordered'>
                    Sign In
                </Button>
            </NavbarItem>

            <NavbarItem>
                <Button type='submit' color='primary' variant='flat'>
                    Sign Up
                </Button>
            </NavbarItem>
        </>
    }

    return(
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href='/' className='font-bold'>YourNextTech</Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                {/* TODO: Add searchbar functions */}
                <Input />
            </NavbarContent>
            <NavbarContent justify='end'>
                {authContent}
            </NavbarContent>
        </Navbar>
    )

}