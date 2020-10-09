import React from 'react'

const Prenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState(undefined);
  //const [modalEditShowing, setEditModal] = useState(false);
  //const [editID, setEdit] = useState(null);
  //const [modalEditServiziData, setEditData] = useState(null);
  //const [modalEditReloading, setReloading] = useState(false);
  //const [deleteItemId, setDelete] = useState(undefined);
  //const [modalShow, setModalDetails] = useState(false);

  useEffect(() => {
    fire.firestore()
      .collection('servizi')
      .onSnapshot(snap => {
        let servizi = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setServizi(servizi);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: "order",
        Header: "Posizione",
        accessor: "order"
      },
      {
        Header: "Nome Servizo",
        accessor: "label",
        //Cell: props => <TitoloCommericante value={props} />
      },
      {
        Header: "Stato",
        accessor: d => d.enabled ? 'Visibile in App' : 'Non visible in App'
      },
    ],
    [servizi]
  );

  //const createServizio = async (data) => {
  //  setReloading(true);
  //  try {
  //    await fire.firestore().collection('servizi').add({ ...data, timestamp: Date.now() });
  //    setTimeout(() => {
  //      setReloading(false);
  //    }, 500);
  //  } catch (error) {
  //    setReloading(false);
  //    console.log(error, "errror")
  //  }
  //}

  //const editServizio = async (id, data) => {
  //  setReloading(true);
  //  try {
  //    await fire.firestore().collection('servizi').doc(id).update({ ...data, timestamp: Date.now() });
  //    //if (diocan) {
  //    //  console.log("diocan", diocan)
  //    //}
  //    setTimeout(() => {
  //      setReloading(false);
  //    }, 500);
  //  } catch (error) {
  //    setReloading(false);
  //    console.log(error, "errror")
  //  }
  //  //if (updateData) console.log("---updateData---", JSON.stringify(updateData))
  //}
  return (
    <div>
      <div className="flex-shrink-0">
        <button
          type="button"
          //onClick={() => setEditModal(!modalEditShowing)}
          className={"inline-flex shadow items-center px-3 py-1 sm:py-2 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 mr-1"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span>Crea Prenotazione</span>
        </button>
      </div>
      {prenotazioni !== undefined && (
        <Table
          columns={columns}
          data={prenotazioni}
          sortBy={[
            {
              id: "slot_date",
              desc: true
            }
          ]}
        //toggleEdit={(id, data) => {
        //  setEditModal(true);
        //  setEdit(id);
        //  setEditData(data);
        //}}
        //toggleModify={(id, data) => {
        //  setModalDetails(!modalShow);
        //  setDelete(id)
        //}}
        />
      )}
      {/*<ModalEditServizi
        isEnabled={modalEditShowing}
        data={modalEditServiziData}
        onCancel={() => {
          setEditModal(false);
          setEdit(null);
          setEditData(null)
        }}
        onConfirm={(isNew, data) => {
          if (isNew) createServizio(data);
          else editServizio(editID, data);
        }}
        isReloading={modalEditReloading}
        dataLenght={servizi?.length > 0 ? servizi.length : 0}
      />
      <Modal
        isEnabled={modalShow}
        title="Attenzione" desc="Sei sicuro di voler eliminare il seguente commericante?"
        onConfirm={async () => {
          try {
            const res = await fire.firestore().collection('servizi').doc(deleteItemId).delete();
            if (res) {
              console.log("--CANCELLATO OK--");
            }
          } catch (error) {
            console.log(error, "--errorcancellazione--")
          }
          setModalDetails(!modalShow);
        }}
        onCancel={() => {
          setModalDetails(!modalShow);
        }}
      />*/}
    </div>
  )
}

export default Prenotazioni;
