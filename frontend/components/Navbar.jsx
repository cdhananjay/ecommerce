import Link from "next/dist/client/link";
import {ShoppingCart, Heart, CircleUser} from "lucide-react";
const Navbar = () => {
    function viewProfile(){

    }
    return (
        <nav className="flex py-2 px-4 justify-between text-2xl">
            <div className="text-4xl" ><Link href="/">title/logo</Link></div>
            <div className="flex gap-3">
                <Link href="/wishlist"><Heart size={32} /></Link>
                <Link href="/cart"><ShoppingCart size={32} /></Link>
                <Link href="/login"> <CircleUser size={32} /></Link>
            </div>
        </nav>
    );
};

export default Navbar;