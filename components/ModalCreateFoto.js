const ModalCreateFoto = ({
    commercianti,
    onCancel,
    show,
    setCommerciante,
    createFoto,
    isChecked,
    changeCheck,
    fotoUrl,
    setFotoUrl
}) => {
    if (show && commercianti !== undefined) {
        // console.log("----commercianti  GOT---", commercianti)
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
                                    {"Scegli il Commerciante"}
                                </label>
                                <select onChange={({ target }) => setCommerciante(target.value)} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                    <option disabled></option>
                                    {Object.keys(commercianti).map((key, index) => {
                                        return (
                                            <option key={index} value={commercianti[key].id}>{commercianti[key].title}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="px-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Foto URL"}
                                </label>
                                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" onChange={setFotoUrl} defaultValue={fotoUrl} />
                            </div>
                            <div className="px-3 md:mb-0">
                                <label className="flex justify-start items-start">
                                    <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                                        <input type="checkbox" className="opacity-0 absolute" defaultChecked={isChecked} onChange={changeCheck} />
                                        <svg className={`fill-current w-4 h-4 text-green-500 pointer-events-none ${isChecked === false ? "hidden" : ""}`} viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                                    </div>
                                    <div className="select-none">{"E' la foto principale?"}</div>
                                </label>
                            </div>
                        </div>
                        <div className="px-10 py-5">
                            <button onClick={() => createFoto()} className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">{"AGGIUNGI FOTO"}</button>
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

export default ModalCreateFoto;