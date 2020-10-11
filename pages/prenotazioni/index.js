import React, { useState, useEffect, useMemo } from 'react'
import fire from '../../config/fire-config';
import { useTable, useSortBy } from "react-table";
import moment from 'moment';

const backendURL = "http://localhost:3030/api/v1/";

const Prenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState(undefined);
  const [utenti, setUtenti] = useState(undefined);
  //const [modalEditShowing, setEditModal] = useState(false);
  //const [editID, setEdit] = useState(null);
  //const [modalEditServiziData, setEditData] = useState(null);
  //const [modalEditReloading, setReloading] = useState(false);
  //const [deleteItemId, setDelete] = useState(undefined);
  //const [modalShow, setModalDetails] = useState(false);

  useEffect(() => {
    moment.locale('it')
    initPage()
  }, []);

  const initPage = async () => {
    await fire.firestore()
      .collection('prenotazioni')
      .onSnapshot(async (snap) => {
        let prenotazioni = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (prenotazioni.length > 0) {
          let commercianti = [];
          for (let data of prenotazioni) {
            let Commerciante = await fire.firestore().collection('commercianti').doc(data.commercianteId).get();
            if (Commerciante !== undefined) {
              let data = Commerciante.data();
              let id = Commerciante.id;
              commercianti.push({
                id,
                nomeCommerciante: data.title
              });
            }
          }
          //let realPrenotazioni = prenotazioni.map((item, i) => Object.assign({}, item, commercianti[i]));
          let realPrenotazioni = prenotazioni.map((item, i) => Object.assign(item, commercianti.find(y => y.id == item.commercianteId)));
          //console.log("realPrenotazioni", realPrenotazioni);
          let servizi = [];
          for (let data of realPrenotazioni) {
            //console.log(data,"--data--")
            let Servizio = await fire.firestore().collection('servizicommercianti').doc(data.serviceId).get();
            if (Servizio !== undefined) {
              let dataL = Servizio.data();
              let id = Servizio.id;
              if (dataL !== undefined) {
                //console.log("---daTs---", dataL)
                servizi.push({
                  id,
                  nomeServizio: dataL?.titolo ? dataL?.titolo : ""
                });
              }
            }
          }
          let final = realPrenotazioni.map((item, i) => Object.assign(item, servizi.find(y => y.id == item.serviceId)));

          let utenti = [];
          for (let data of final) {
            let UtentiApp = await fire.firestore().collection('utentiApp').where('userId', "==", data.userId).get();
            if (UtentiApp !== undefined) {
              //console.log(UtentiApp);
              UtentiApp.forEach(async (doc) => {
                //console.log(doc.id, " => ", doc.data());
                let uaData = doc.data();
                //let uId = doc.id;
                if (uaData !== undefined) {
                  let uaRData = await fetchUser(uaData.userId);
                  //console.log("--uaRData",uaRData)
                  let nome = uaRData.displayName;
                  utenti.push({
                    id: uaRData.uid,
                    nomeUtente: nome
                  })
                }
              });
            }
          }
          //console.log("utenti", utenti)
          let realFinal = final.map((item, i) => Object.assign(item, utenti.find(y => y.id == item.userId)));

          //let final = realPrenotazioni.map((item, i) => Object.assign({}, item, servizi[i]));
          console.log("realFinal", realFinal)
          setPrenotazioni(realFinal);
          //console.log(realPrenotazioni, "--realPrenotazioni--")
        }
        //setPrenotazioni(prenotazioni);
      });
    //await fire.firestore()
    //  .collection('utentiApp')
    //  .onSnapshot(async (snap) => {
    //    let utenti = snap.docs.map(doc => ({
    //      id: doc.id,
    //      ...doc.data()
    //    }));
    //    if (utenti !== undefined) {
    //      let finalUtenti = [];
    //      for (let index = 0; index < utenti.length; index++) {
    //        const utente = utenti[index];
    //        if (utente.userId) {
    //          //console.log("--utente--", utente);
    //          let dataUser = await fetchUser(utente.userId);
    //          if (dataUser !== undefined) {
    //            if (dataUser.uid == utente.userId) {
    //              var element = {};
    //              element = dataUser;
    //              finalUtenti.push({ ...element });
    //            }
    //          }
    //        }
    //      }
    //      let realFinalUtenti = utenti.map((item, i) => Object.assign({}, item, finalUtenti[i]));
    //      if (realFinalUtenti.length > 0) setUtenti(realFinalUtenti);
    //    }
    //  });
  }
  const fetchUser = async (id) => {
    try {
      if (id) {
        let data = { id: id };
        const res = await fetch(
          backendURL,
          {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(data)
          }
        );
        const result = await res.json();
        setTimeout(() => null, 0);
        if (result) {
          return result;
        } else {
          return undefined;
        }
      } else return undefined;
    } catch (e) {
      console.log("error-fetch", e);
      return undefined;
    }
  }
  //const RenderUtente = ({ value }) => {
  //  let nomeUtente = undefined;
  //  if (utenti !== undefined) {
  //    nomeUtente = utenti.filter(item => {
  //      if (item.userId === value) return [item];
  //    });
  //  }
  //  if (nomeUtente !== undefined) {
  //    let dati = nomeUtente[0];
  //    let nome = dati?.displayName;
  //    return (
  //      <>
  //        <div>{dati?.phone}</div>
  //        <div>{nome?.toString().toUpperCase()}</div>
  //      </>
  //    );
  //  } else {
  //    return (<></>);
  //  }
  //}
  const columns = useMemo(
    () => [
      {
        id: "nomeUtente",
        Header: "Utente",
        accessor: "nomeUtente",
        //Cell: ({ cell: { value } }) => <RenderUtente value={value} />
      },
      {
        id: "slot_date",
        Header: "Data prenotazione",
        accessor: "slot_date",
        Cell: ({ row }) => {
          //console.log("--row--", row)
          let d = moment(row.original?.slot_date).format('dddd DD MMMM')
          //let h = moment(row.original?.slot_date).format('HH:mm');
          let slot_time = row.original?.slot_time;
          let slot_end_time = row.original?.slot_end_time;
          return (
            <div className="flex flex-col">
              <div className="text-xs">{d.toUpperCase()}</div>
              <div>{`${slot_time.toUpperCase()} - ${slot_end_time.toUpperCase()}`}</div>
            </div>
          )
        },
      },
      {
        id: "commerciante",
        Header: "Commerciante",
        accessor: "nomeCommerciante",
      },
      {
        id: "servizio",
        Header: "Servizio",
        accessor: "nomeServizio",
      },
      {
        id: "stato",
        Header: "Stato",
        accessor: 'status',
        Cell: ({ row }) => {
          return (
            <div>
              <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{"REQUEST_APPROVAL"}</span>
            </div>
          )
        }
      },
    ],
    [prenotazioni, utenti]
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

function Table({ columns, data, toggleEdit, toggleModify }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
  }, useSortBy);

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table {...getTableProps()} className="min-w-full leading-normal">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {/*...column.getHeaderProps()*/}
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : (
                          ' -[ORDINA]-'
                        )}
                    </span>
                  </th>
                ))}
                {/*<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">*</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>*/}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} onClick={() => toggleEdit(row.original.id, row.original)} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {cell.render("Cell")}
                    </td>;
                  })}
                  {/*<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button type="button" className="inline-block text-gray-500 hover:text-gray-700" onClick={() => toggleEdit(row.original.id, row.original)}>
                      <i className="fa fa-pencil fa-lg transition duration-150"></i>
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button type="button" className="inline-block text-gray-500 hover:text-gray-700" onClick={() => toggleModify(row.original.id, row.original)}>
                      <i className="fa fa-trash fa-lg transition duration-150"></i>
                    </button>
                  </td>*/}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prenotazioni;
