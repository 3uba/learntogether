import Link from "next/link";

export const MenuButton = (props) => {
    return (
        <div
            className={`flex items-center justify-left hover:bg-[#E4E6E9] m-1 mr-2 h-[6vh] w-[16vw] md:w-auto md:p-1 rounded ${props.className}`}
        >
            {props.link !== undefined ? (
                <Link href={props.link}>
                    <a className="flex items-center justify-left md:w-[10vw] md:justify-center">
                        {props.children}
                    </a>
                </Link>
            ) : (
                <>{props.children}</>
            )}
        </div>
    );
};
