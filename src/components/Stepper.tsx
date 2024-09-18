export default function ScreenStepper() {
    return (
        <div className="flex items-end flex-col font-[sans-serif] max-w-[250px]">
            <div className="flex items-start">
                <div className="mr-6">
                    <p className="text-[10px] font-bold text-gray-400">
                        STEP 1
                    </p>
                    <h6 className="text-lg font-bold text-[#333]">
                        Basic details
                    </h6>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 shrink-0 mx-[-1px] border-2 border-green-500 p-1.5 flex items-center justify-center rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full fill-green-500"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                data-original="#000000"
                            />
                        </svg>
                    </div>
                    <div className="w-0.5 h-24 rounded-md bg-gray-300 my-1"></div>
                </div>
            </div>
            <div className="flex items-start">
                <div className="mr-6">
                    <p className="text-[10px] font-bold text-gray-400">
                        STEP 2
                    </p>
                    <h6 className="text-lg font-bold text-[#333]">
                        Education details
                    </h6>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 shrink-0 mx-[-1px] border-2 border-green-500 p-1.5 flex items-center justify-center rounded-full">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="w-0.5 h-24 rounded-md bg-gray-300 my-1"></div>
                </div>
            </div>
            <div className="flex items-start">
                <div className="mr-6">
                    <p className="text-[10px] font-bold text-gray-400">
                        STEP 2
                    </p>
                    <h6 className="text-lg font-bold text-[#333]">
                        Company details
                    </h6>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 shrink-0 mx-[-1px] border-2 border-gray-300 p-1.5 flex items-center justify-center rounded-full">
                        <span className="text-lg text-gray-400">3</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
