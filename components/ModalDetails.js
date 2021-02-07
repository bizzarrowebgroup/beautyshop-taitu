const ModalDetails = ({
  data,
  fotos,
  orari,
  onConfirm,
  onCancel,
  isEnabled,
}) => {
  if (isEnabled) {
    let title = data.title ? data.title : "",
      desc = data.desc ? data.desc : "",
      via = data.via ? data.via : "",
      tipo = data.tipo == 0 ? "Parrucchiere" : "Estetista",
      stars = data.stars ? data.stars : 0,
      phone = data.phone ? data.phone : "",
      email = data.email ? data.email : "",
      economy = data.economy ? data.economy : "",
      id = data.id ? data.id : null,
      Background = fotos.length >= 1 ? fotos[0].url : '',
      orariLength = orari !== undefined ? Object.keys(orari).length : 0;

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
            <div className="flex justify-between border-b border-gray-100 py-12">
              <div style={{
                backgroundColor: "black",
                opacity: 0.66,
                top: 0,
                position: "absolute",
                zIndex: -1,
                height: 124,
                width: "100%"
              }} />
              <div style={{
                background: `url(${Background})`,
                opacity: 1,
                top: 0,
                position: "absolute",
                zIndex: -2,
                height: 124,
                width: "100%"
              }} />
              <div className="px-4 flex flex-col justify-items-start justify-start">
                <span className="text-white text-xs font-medium">{"Stai gestendo"}</span>
                <span className="font-bold text-white text-lg">{title}</span>
              </div>
              <div className="px-4">
                <button onClick={onCancel}><i className="fa fa-times-circle fa-lg text-white hover:text-red-600 transition duration-150"></i></button>
              </div>
            </div>
            <div className="px-10 py-5">
              <div className="px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Nome Negoziante"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder={"Inserisci il nome del commerciante"} disabled value={title} />
              </div>
              <div className="px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Via"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" placeholder={"Inserisci la via del commerciante"} disabled value={via} />
              </div>
              <div className="p-2 px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Descrizione"}
                </label>
                <textarea className="form-textarea mt-1 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" rows="3" placeholder="Inserisci la descrizione del commerciante" disabled value={desc}></textarea>
              </div>
              <div className="px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Tipologia Costosa"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" disabled value={economy} />
              </div>
              <div className="mt-2 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    {"Email"}
                  </label>
                  <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder="Inserisci la mail del commerciante" value={email} disabled />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    {"Telefono"}
                  </label>
                  <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" placeholder="Inserisci il telefono del commerciante" value={phone} disabled />
                </div>
              </div>
              <div className="md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    {"Tipologia Negoziante"}
                  </label>
                  <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder="Inserisci la mail del commerciante" value={tipo} disabled />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    {"Totale Stelle"}
                  </label>
                  <input disabled className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" disabled value={stars} />
                </div>
              </div>
              <div className="px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Servizi Negoziante"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder={""} disabled value={0} />
              </div>
              {orari && orariLength == 7 && (
                <div className="px-3 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                    {"Orari Negoziante"}
                  </label>
                  {/**orari negozio */}
                  <div className="flex flex-column flex-wrap justify-start justify-items-start content-start bg-grey-lighter text-grey-darker border rounded px-4 mb-3">
                    <div className="flex">
                      <div className="m-2 flex-row content-start justify-items-start justify-center">
                        <div className="flex-1 text-grey-darker">{"Lun"}</div>
                        <div className="flex-1 text-xs">{orari ? orari.lunedi?.closed ? "Chiuso" : `${orari.lunedi?.start}-${orari.lunedi?.end}` : ""}</div>
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center">
                        <div className="flex-1 text-grey-darker">{"Mar"}</div>
                        <div className="flex-1 text-xs">{orari ? orari.martedi?.closed ? "Chiuso" : `${orari.martedi?.start}-${orari.martedi?.end}` : ""}</div>
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center">
                        <div className="flex-1 text-grey-darker">{"Mer"}</div>
                        <div className="flex-1 text-xs">{orari ? orari.mercoledi?.closed ? "Chiuso" : `${orari.mercoledi?.start}-${orari.mercoledi?.end}` : ""}</div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="m-2 flex-row content-start justify-items-start justify-center">
                        <div className="flex-1 text-grey-darker">{"Gio"}</div>
                        <div className="flex-1 text-xs">{orari ? orari.giovedi?.closed ? "Chiuso" : `${orari.giovedi?.start}-${orari.giovedi?.end}` : ""}</div>
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center">
                        <div className="flex-1 text-grey-darker">{"Ven"}</div>
                        <div className="flex-1 text-xs">{orari ? orari.venerdi?.closed ? "Chiuso" : `${orari.venerdi?.start}-${orari.venerdi?.end}` : ""}</div>
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center">
                        <div className="flex-1 text-grey-darker">{"Sab"}</div>
                        <div className="flex-1 text-xs">{orari ? orari.sabato?.closed ? "Chiuso" : `${orari.sabato?.start}-${orari.sabato?.end}` : ""}</div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="m-2 flex-row content-start justify-items-start justify-center">
                        <div className="flex-1 text-grey-darker">{"Dom"}</div>
                        <div className="flex-1 text-xs">{orari ? orari.domenica?.closed ? "Chiuso" : `${orari.domenica?.start}-${orari.domenica?.end}` : ""}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Foto Negoziante"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder={""} disabled value={fotos.length} />
              </div>
              <div className="px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Servizi Negoziante"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder={""} disabled value={0} />
              </div>
              <div className="px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Recensioni Ricevute"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder={""} disabled value={0} />
              </div>
              <div className="px-3 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Prenotazioni Ricevute"}
                </label>
                <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder={""} disabled value={0} />
              </div>
            </div>
            {fotos.length >= 1 && (
              <div className="mx-12 md:mb-0 py-2 border rounded border-gray-200 pt-2 px-2">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Fotografie"}
                </label>
                <div className="flex">
                  {fotos.map((f) => (
                    <>
                      <div>
                        <img className="h-24 opacity-50 hover:opacity-100 cursor-pointer" src={f.url} />
                      </div>
                    </>
                  ))}
                </div>
              </div>
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

export default ModalDetails;