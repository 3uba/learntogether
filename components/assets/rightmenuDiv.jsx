import Link from "next/link";

export const RightMenuDiv = (props) => {
    return (
        <div
            className={`flex items-center justify-left hover:bg-[#3a3b3c] m-1 mr-2 h-[6vh] w-[16vw] rounded-md ${props.className}`}
        >
            {props.link !== undefined ? (
                <Link href={props.link}>
                    <a className="flex items-center justify-left">
                        {props.children}
                    </a>
                </Link>
            ) : (
                <>{props.children}</>
            )}
            {console.log(props.className)}
        </div>
    );
};
