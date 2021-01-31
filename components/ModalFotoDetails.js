const ModalFotoDetails = ({
    data,
    onCancel,
    show
}) => {
    if (show) {
        let isMain = data.isMain ? data.isMain === true ? "SI" : "NO" : "NO",
            url = data.url ? data.url : "",
            id = data.id ? data.id : "",
            comTitle = data.com ? data.com.title : "";
        return (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div
                    className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                >
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    ></span>
                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="px-10 py-5">
                            <div className="px-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Nome Negoziante"}
                                </label>
                                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" disabled defaultValue={comTitle} />
                            </div>
                            <div className="px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"E' foto principale"}
                                </label>
                                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" disabled defaultValue={isMain} />
                            </div>
                            <div className="p-2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Foto"}
                                </label>
                                <img className="h-24 opacity-50 hover:opacity-100 cursor-pointer" src={url} />
                                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" defaultValue={url} />
                            </div>
                        </div>

                        <div className="px-5 py-4 flex justify-end">
                            <button className="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150" onClick={onCancel}>{"Chiudi"}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return null
}

export default ModalFotoDetails;