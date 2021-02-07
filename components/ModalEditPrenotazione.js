import moment from 'moment';

const renderStatusRow = state => {
    let realStatus = "", realStatusColor = "";
    switch (state) {
        case 0:
            realStatus = "PRESA IN CARICO";
            realStatusColor = "bg-yellow-700";
            break;
        case 1:
            realStatus = "CONFERMATA";
            realStatusColor = "bg-green-400";
            break;
        case 2:
            realStatus = "CONCLUSA";
            realStatusColor = "bg-yellow-400";
            break;
        case 3:
            realStatus = "ANNULLATA";
            realStatusColor = "bg-red-600";
            break;
    }
    return (
        <div>
            <span className={`flex rounded-full ${realStatusColor} uppercase px-2 py-1 text-xs font-bold mr-3`}>{realStatus}</span>
        </div>
    )
}

const ModalEditPrenotazione = ({
    data,
    onCancel,
    isEnabled,
    onConfirm,
    onDelete
}) => {
    if (isEnabled) {
        // console.log("---data---", data)
        let nomeCommerciante = data.nomeCommerciante ? data.nomeCommerciante : "",
            id = data.prenId ? data.prenId : "",
            nomeUtente = data.nomeUtente ? data.nomeUtente : "",
            notes = data.notes ? data.notes : "",
            pren_date = data.pren_date ? data.pren_date : "",
            slot_date = data.slot_date ? data.slot_date : "",
            slot_time = data.slot_time ? data.slot_time : "",
            slot_end_time = data.slot_end_time ? data.slot_end_time : "",
            state = data.state ? data.state : 0,
            totale = data.totale ? data.totale : 0,
            userId = data.userId ? data.userId : 0
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
                        <div className="flex justify-between border-b border-gray-100 py-6">
                            <div className="px-4 flex flex-col justify-items-start justify-start">
                                <span className="text-black text-xs font-medium">{"PRENOTAZIONE"}</span>
                                <span className="font-bold text-black text-lg">{id}</span>
                                <span className="font-bold text-black text-lg">{nomeCommerciante}</span>
                            </div>
                            <div className="px-4">
                                <button onClick={onCancel}><i className="fa fa-times-circle fa-lg text-white hover:text-red-600 transition duration-150"></i></button>
                            </div>
                        </div>
                        <div className="px-10 py-5">
                            <div className="px-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Data prenotazione"}
                                </label>
                                {`${moment(slot_date).format("dddd DD MMMM YYYY").toLocaleUpperCase()}`} <br />
                                {`DALLE ${slot_time} ALLE ${slot_end_time}`}
                            </div>
                        </div>
                        <div className="px-10 py-5">
                            <div className="px-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Stato"}
                                </label>
                                {renderStatusRow(state)}
                            </div>
                        </div>
                        <div className="px-10 py-5">
                            <div className="px-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Prezzo"}
                                </label>
                                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" disabled value={`${totale} €`} />
                            </div>
                        </div>
                        <div className="px-10 py-5">
                            <div className="px-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Cliente"}
                                </label>
                                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" disabled value={nomeUtente} />
                            </div>
                        </div>
                        <div className="px-10 py-5">
                            <div className="px-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    {"Note del cliente"}
                                </label>
                                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" disabled value={notes} />
                            </div>
                        </div>
                        {state === 0 && (
                            <>
                                <div className="px-10 py-5">
                                    <button onClick={() => onConfirm(id, userId, slot_date, slot_time, nomeCommerciante)} class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">{"ACCETTA PRENOTAZIONE"}</button>
                                </div>
                                <div className="px-10 py-5">
                                    <button onClick={() => onDelete(id, userId, nomeCommerciante)} class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">{"RIFIUTA PRENOTAZIONE"}</button>
                                </div>
                            </>
                        )}
                        <div className="px-5 py-4 flex justify-end">
                            <button className="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150" onClick={onCancel}>{"Chiudi"}</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    return null;
}

export default ModalEditPrenotazione;