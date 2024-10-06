import Link from "next/link"

const Footer = () => {
    return (
        <div className="flex justify-center">
            <div className="max-w-5xl w-full items-center flex justify-center border-solid border-t border-stone-200 mx-12 p-4">
                <p className="text-xs text-stone-400 text-center">
                    Created by{' '}
                    <Link href="https://britzoblan.com">Britta Oblan</Link>
                </p>
            </div>
        </div>
    )
}

export default Footer