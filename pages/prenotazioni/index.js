import React, { useState, useEffect, useMemo } from 'react'
import fire from '../../config/fire-config';
import { useTable, useSortBy } from "react-table";
import moment from 'moment';
import ModalEditPrenotazione from '../../components/ModalEditPrenotazione';
import { Expo } from 'expo-server-sdk';

const Prenotazioni = () => {
  const [loading, setLoading] = useState(true);


  const [prenotazioni, setPrenotazioni] = useState(undefined);
  // const [utenti, setUtenti] = useState(undefined);
  const [modalEditShowing, setEditModal] = useState(false);
  const [editID, setEdit] = useState(null);
  const [modalEditServiziData, setEditData] = useState(null);
  // const [modalEditReloading, setReloading] = useState(false);
  //const [deleteItemId, setDelete] = useState(undefined);
  //const [modalShow, setModalDetails] = useState(false);

  useEffect(() => {
    moment.locale('it')
    try {
      initPage()
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    let observer = undefined;
    checkNewPrenotazioni(observer);
    return () => {
      if (observer !== undefined) observer();
    };
  }, [])

  const checkNewPrenotazioni = async (observer) => {
    return observer = fire.firestore().collection('prenotazioni').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'modified') {
          setLoading(true)
          setEditModal(false)
          initPage()
        }
        if (change.type === 'removed') {
          setLoading(true)
          setEditModal(false)
          initPage()
        }
      });
    });
  }

  const initPage = async () => {
    await fire.firestore()
      .collection('prenotazioni')
      .onSnapshot(async (snap) => {
        let prenotazioni = snap.docs.map(doc => ({
          id: doc.id,
          prenId: doc.id,
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
                commId: id,
                nomeCommerciante: data.title
              });
            }
          }
          let realPrenotazioni = prenotazioni.map((item, i) => Object.assign(item, commercianti.find(y => y.id == item.commercianteId)));

          let utenti = [];
          for (let data of realPrenotazioni) {
            let UtentiApp = await fire.firestore().collection('utentiApp').where('userId', "==", data.userId).get();
            if (UtentiApp !== undefined) {
              UtentiApp.forEach(async (doc) => {
                let uaData = doc.data();
                if (uaData !== undefined) {
                  utenti.push({
                    id: uaData.userId,
                    userId: uaData.userId,
                    nomeUtente: uaData.displayName
                  })
                }
              });
            }
          }
          let realFinal = realPrenotazioni.map((item, i) => Object.assign(item, utenti.find(y => y.id == item.userId)));

          // console.log("realFinal", realFinal)
          setPrenotazioni(realFinal);
          setLoading(false)

        }
      });
  }

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
      // {
      //   id: "servizio",
      //   Header: "Servizio",
      //   accessor: "nomeServizio",
      // },
      {
        id: "stato",
        Header: "Stato",
        accessor: 'state',
        Cell: ({ row: { original: { state } } }) => {
          // console.log("---state---", state)
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
      },
    ],
    [prenotazioni]
  );

  const onConfirmPren = async ({ id, userId, slot_date, slot_time, nomeCommerciante }) => {
    // console.log("---conferma pren---", { id, userId, slot_date, slot_time, nomeCommerciante });
    let db = fire.firestore();
    var objectRef = db.collection("prenotazioni").doc(id);

    const citiesRef = db.collection('notificationsUsers');
    const snapshot = await citiesRef.where('userId', '==', userId).get();
    if (snapshot.empty) {
      // non mando notifica
      console.log('Non trovo utente con notifica.');
    } else {
      // mando notifica
      snapshot.forEach(doc => {
        let data = doc.data();
        let pushToken = data.token ? data.token : "";
        let expo = new Expo();

        // Create the messages that you want to send to clients
        let messages = [];
        // for (let pushToken of somePushTokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          // continue;
        }

        messages.push({
          to: pushToken,
          sound: 'default',
          title: 'Appuntamento Confermato ✅',
          body: `Il tuo appuntamento da ${nomeCommerciante} per ${moment(slot_date).format("dddd DD MMMM YYYY")} alle ${slot_time} è stato confermato.`,
          // data: { withSome: 'data' },
        })
        // }

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
          // Send the chunks to the Expo push notification service. There are
          // different strategies you could use. A simple one is to send one chunk at a
          // time, which nicely spreads the load out over time:
          for (let chunk of chunks) {
            try {
              let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              console.log(ticketChunk);
              tickets.push(...ticketChunk);
              // NOTE: If a ticket contains an error code in ticket.details.error, you
              // must handle it appropriately. The error codes are listed in the Expo
              // documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            } catch (error) {
              console.error(error);
            }
          }
        })();
      });
    }

    objectRef.update({
      state: 1
    }).then(() => {
      // alert("Document successfully updated!")
    }).catch((error) => {
      alert("Error updating document: ", error)
    });

  }

  const onDeletePren = async({ id, userId, nomeCommerciante }) => {
    // alert("pren cancellata")
    let db = fire.firestore();
    var objectRef = db.collection("prenotazioni").doc(id);

    const citiesRef = db.collection('notificationsUsers');
    const snapshot = await citiesRef.where('userId', '==', userId).get();
    if (snapshot.empty) {
      // non mando notifica
      console.log('No matching documents.');
    } else {
      // mando notifica
      snapshot.forEach(doc => {
        let data = doc.data();
        let pushToken = data.token ? data.token : "";
        let expo = new Expo();

        // Create the messages that you want to send to clients
        let messages = [];
        // for (let pushToken of somePushTokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          // continue;
        }

        messages.push({
          to: pushToken,
          sound: 'default',
          title: 'Appuntamento Cancellato ❌',
          body: `Il tuo appuntamento da ${nomeCommerciante} è stato annullato.`,
          // data: { withSome: 'data' },
        })
        // }

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
          // Send the chunks to the Expo push notification service. There are
          // different strategies you could use. A simple one is to send one chunk at a
          // time, which nicely spreads the load out over time:
          for (let chunk of chunks) {
            try {
              let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              console.log(ticketChunk);
              tickets.push(...ticketChunk);
              // NOTE: If a ticket contains an error code in ticket.details.error, you
              // must handle it appropriately. The error codes are listed in the Expo
              // documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            } catch (error) {
              console.error(error);
            }
          }
        })();
      });
    }

    objectRef.update({
      state: 3
    }).then(() => {
      // alert("Document successfully updated!")
    }).catch((error) => {
      alert("Error updating document: ", error)
    });
    // console.log("---cancella pren---", { id, userId, nomeCommerciante });
  }
  if (loading) {
    return (
      <div className="flex h-screen bg-rose-600">
        <div className="m-auto">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
        </div>
      </div>
    )
  }

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
          toggleEdit={(id, data) => {
            setEditModal(true);
            setEdit(id);
            setEditData(data);
          }}
        //toggleModify={(id, data) => {
        //  setModalDetails(!modalShow);
        //  setDelete(id)
        //}}
        />
      )}
      <ModalEditPrenotazione
        isEnabled={modalEditShowing}
        data={modalEditServiziData}
        onCancel={() => {
          setEditModal(false);
          setEdit(null);
          setEditData(null)
        }}
        onConfirm={(id, userId, slot_date, slot_time, nomeCommerciante) => onConfirmPren({ id, userId, slot_date, slot_time, nomeCommerciante })}
        onDelete={(id, userId, nomeCommerciante) => onDeletePren({ id, userId, nomeCommerciante })}
      // onConfirm={(isNew, data) => {
      //   if (isNew) createServizio(data);
      //   else editServizio(editID, data);
      // }}
      // isReloading={modalEditReloading}
      // dataLenght={servizi?.length > 0 ? servizi.length : 0}
      />
      {/*<Modal
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
