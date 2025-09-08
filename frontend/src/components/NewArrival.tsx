export const NewArrival = () => {
    return(
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4">
                <div className="bg-[#DB4444] w-5 h-10 rounded" />
                <span className="text-[#DB4444] text-[18px]">Featured New Arrival</span>
            </div>

            <div className="flex justify-between">
                <h3 className="text-[48px] capitalize">New Arrival</h3>
            </div>

            <div className="flex gap-6 py-4">
                <div>
                    <img src="/Featured_left.webp" alt="New Arrival" draggable={false}/>
                </div>

                <div className="flex flex-col gap-6">
                    <div>
                        <img src="/Right_Top.webp" alt="New Arrival" draggable={false}/>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <img src="/right_bottom_left.webp" alt="New Arrival" draggable={false}/>
                        </div>

                        <div>
                            <img src="/right_bottom_right.webp" alt="New Arrival" draggable={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}