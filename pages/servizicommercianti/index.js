import React, { useState, useEffect } from 'react'
import fire from '../../config/fire-config';
import { useTable, useSortBy } from "react-table";
import Modal from "../../components/Modal";

// TODO ADD VALIDATION !!!

function ModalEditServizi({ isEnabled, data, onCancel, onConfirm, dataLenght, isReloading }) {
  console.log(isEnabled, "---isEnabled---")
  const [label, setLabel] = useState(data ? data.titolo : "");
  const [ordine, setOrdine] = useState(data !== null ? data.order : dataLenght);
  const [enabled, setEnabled] = useState(data ? data.enabled : false);
  const [costo, setCost] = useState(data ? data.cost ? parseInt(data.cost).toFixed(2) : 0 : 0);
  const [durata, setDurata] = useState(data ? data.durata ? data.durata : 0 : 0);
  //  moment(timeSelected).add(serviceDuration * 10, 'minutes').format("HH:mm"),
  const [desc, setDesc] = useState(data ? data.desc ? data.desc : "" : "");
  // CATEGORIE
  const [categoriaServizio, setCategoria] = useState(data ? data.servizi : undefined);
  const [categoriaServizioID, setCatID] = useState(undefined);

  const [categoriaLabel, setCatLabel] = useState(undefined);
  const [categorieServizi, setCategorieServizi] = useState(undefined);
  // COMMERCIANTE
  const [commerciante, setCommerciante] = useState(data ? data.commerciante : undefined);
  const [commercianteID, setCommercianteID] = useState(data ? data.commerciante : undefined);
  const [commercianti, setCommercianti] = useState(undefined);
  const [realCommerciante, setRealCommerciante] = useState(undefined);

  useEffect(() => {
    obtainCommercianti();
    obtainCommerciante();
    obtainCategories();
  }, [])

  useEffect(() => {
    if (categoriaServizio !== undefined) {
      obtainCategory(categoriaServizio);
    }
  }, [categoriaServizio])
  useEffect(() => {
    if (commerciante !== undefined) {
      obtainCommerciante(commerciante);
    }
  }, [commerciante])

  const obtainCategory = async (cat) => {
    if (cat) {
      fire.firestore().collection('servizi').doc(cat).get()
        .then(function (doc) {
          if (doc.exists) {
            if (doc.id == cat) {
              setCatID(doc.id);
              setCatLabel(doc.data().label);
            }
            //setRealCategoriaServizio(doc.data().label);
          } else {
            console.log("Non riesco a trovare la categoria!!!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }

  const obtainCategories = async () => {
    await fire.firestore().collection("servizi").get().then(querySnapshot => {
      let finalCatServizi = [];
      querySnapshot.forEach(doc => {
        finalCatServizi.push({ id: doc.id, ...doc.data() })
      });
      if (isEnabled) setCatID(finalCatServizi[0].id); // first round
      setCategorieServizi(finalCatServizi);
    });
  }

  const obtainCommercianti = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let querySnapshot = await fire.firestore().collection("commercianti").get();
        let finalCommercianti = [];
        querySnapshot.forEach(doc => {
          finalCommercianti.push({ id: doc.id, ...doc.data() });
        });
        //console.log("--finalCommercianti--", finalCommercianti)
        if (isEnabled) setCommercianteID(finalCommercianti[0].id); // first round
        setCommercianti(finalCommercianti)
        resolve();
      } catch (error) {
        console.log(error, "--error--")
        resolve();
      }
    });
  }

  const obtainCommerciante = (commerciante) => {
    // ho tutto
    if (commercianti !== undefined && commerciante !== undefined) {
      setCommercianteID(commerciante)
      let label = commercianti.map(item => { if (item.id == commerciante) return item.title });
      setRealCommerciante(label);
    } else if (commerciante !== undefined) {
      // ho solo il commerciante dalla tabella
      setCommercianteID(commerciante)
      setRealCommerciante(commerciante);
    } else if (commercianti !== undefined) {
      // ho solo i commercianti da db quindi ne sto creando uno nuovo
      setRealCommerciante(commercianti[0].title);
      setCommercianteID(commercianti[0].id)
    }
  }
  // disabled atm
  const changeCategoria = (val) => {
    setCatID(val);
    //setCatLabel();
  }

  const RenderSelectCategoriesServices = () => {
    let label = "";
    if (categorieServizi !== undefined && categoriaLabel !== undefined) {
      label = categorieServizi.map(item => { if (item.id == categoriaServizioID) return item.label });
    }
    return (
      <>
        {isEnabled && <option disabled>{categoriaLabel !== undefined ? categoriaLabel : label}</option>}
        {categorieServizi !== undefined && categorieServizi.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </>
    )
  }

  const changeCommerciante = val => {
    //console.log(val, "--changeVALCOMMERCIANTE--")
    //let label = commercianti.map(item => { if (item.id == val) return item.title });
    setRealCommerciante(val);
    setCommercianteID(val)
  }

  const RenderSelectCommerciante = () => {
    let label = ""
    if (commercianti && realCommerciante && isEnabled) label = commercianti.map(item => { if (item.id == realCommerciante) return item.title });
    else if (isEnabled && commercianti) label = commercianti.map(item => { if (item.id == commercianteID) return item.title });
    return (
      <>
        {isEnabled && <option disabled>{label ? label : ""}</option>}
        {commercianti !== undefined && commercianti.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
      </>
    )
  }

  const renderSelectOrderOptions = (length) => {

    let index = -1, arr = [];
    while (index < length) {
      index++;
      var obj = {};
      obj['label'] = index;
      obj['value'] = index;
      arr.push(obj);
    }
    if (arr.length > 0) {
      return (
        <>
          <option disabled></option>
          {arr.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
        </>
      )
    }
  }
  const handleOptionChange = () => {
    setEnabled(!enabled);
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div className="fixed inset-0 transition-opacity" style={{ zIndex: -1 }}>
          <div className="absolute inset-0 bg-gray-500 opacity-75" style={{ zIndex: -1 }}></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
        ></span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full` +
            `${isReloading ? ' hidden' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between border-b border-gray-100 py-6">
            <div className="px-4 flex flex-col justify-center content-center flex-wrap">
              <span className={`font-medium text-black text-xs`}>{data == null ? "Nuovo Servizio" : "Stai gestendo la Categoria di Servizio"}</span>
              <span className={`font-bold text-black text-lg`}>{data == null ? "" : label}</span>
            </div>
            <div className="px-4">
              <button onClick={onCancel}><i className="fa fa-times-circle fa-lg text-black hover:text-red-600 transition duration-150"></i></button>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="px-4 py-4">
              <div className="md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Nome Servizio"}
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  type="text"
                  placeholder={"Inserisci il nome"}
                  value={label}
                  onChange={({ target }) => setLabel(target.value)}
                />
              </div>
              <div className="md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold ">
                  {"Costo"}
                </label>
                <span className="block uppercase tracking-wide text-grey-darker italic mb-2" style={{ fontSize: 9 }}>{"Espresso in €"}</span>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  type="number"
                  placeholder={"00.00 €"}
                  value={costo}
                  onChange={({ target }) => setCost(target.value)}
                />
              </div>
              <div className="md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold ">
                  {"Durata"}
                </label>
                <span className="block uppercase tracking-wide text-grey-darker italic" style={{ fontSize: 9 }}>{"Espresso in minuti"}</span>
                <span className="block uppercase tracking-wide text-grey-darker italic mb-2" style={{ fontSize: 9 }}>{"Ex: 6 = 1 ora"}</span>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  type="tel"
                  placeholder={""}
                  value={durata}
                  min={0}
                  maxLength={3}
                  max={480}
                  onChange={({ target }) => setDurata(target.value)}
                />
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold ">
                  {"Descrizione"}
                </label>
                <span className="block uppercase tracking-wide text-grey-darker italic" style={{ fontSize: 9 }}>{"La descrizione del servizio"}</span>
                <textarea
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  type="text"
                  placeholder={""}
                  value={desc}
                  onChange={({ target }) => setDesc(target.value)}
                />
              </div>
              <div className="md:mb-0 mb-2">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                  {"Ordine"}
                </label>
                {/*<input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder={"Inserisci il nome"} value={data.label} />*/}
                {dataLenght > 0 && (
                  <select onChange={({ target }) => setOrdine(Number(target.value))} value={ordine} disabled={data == null} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                    {renderSelectOrderOptions(dataLenght)}
                  </select>
                )}
              </div>
              <div className="md:mb-1 mt-2">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold ">
                  {"Stato Servizio"}
                </label>
                <div className="border border-gray-400 rounded-lg mx-1 my-1 p-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className={`form-checkbox checkbox-off h-4 w-4 rounded-lg`} value="off" onChange={() => handleOptionChange()} checked={!enabled} />
                      <span className="ml-2 text-xs text-black">Disattivato</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className={`form-checkbox checkbox-on h-4 w-4 rounded-lg`} value="on" onChange={() => handleOptionChange()} checked={enabled} />
                      <span className="ml-2 text-xs text-green-700">Visibile</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                {"Categoria del Servizio"}
              </label>
              {/*<span className="block uppercase tracking-wide text-grey-darker italic" style={{ fontSize: 9 }}>{"La descrizione del servizio"}</span>*/}
              <select
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                //type="text"
                placeholder={""}
                value={categoriaServizioID}
                onChange={({ target }) => changeCategoria(target.value)}
              >
                <RenderSelectCategoriesServices />
              </select>
            </div>
            <div className="md:mb-0 mt-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                {"Commerciante proprietario"}
              </label>
              {/*<span className="block uppercase tracking-wide text-grey-darker italic" style={{ fontSize: 9 }}>{"La descrizione del servizio"}</span>*/}
              <select
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                type="text"
                placeholder={""}
                value={realCommerciante}
                //disabled={data !== null}
                onChange={({ target }) => changeCommerciante(target.value)}
              >
                <RenderSelectCommerciante />
              </select>
            </div>
          </div>
          <div className="px-4 py-4 flex">
            <div className="m-auto">
              <button onClick={() => onConfirm(isEnabled, {
                enabled,
                order: ordine,
                titolo: label,
                cost: costo,
                durata,
                desc,
                servizi: categoriaServizioID,
                commerciante: commercianteID
              })} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                {data == null ? "Aggiungi servizio" : "Aggiorna servizio"}
              </button>
            </div>
          </div>
        </div>
        <div className={`${isReloading ? 'z-10 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-blue-700 transition ease-in-out duration-150 cursor-not-allowed' : 'hidden'}`}>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
            Caricamento
          </div>
      </div>
    </div>
  );
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
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button type="button" className="inline-block text-gray-500 hover:text-gray-700" onClick={() => toggleEdit(row.original.id, row.original)}>
                      <i className="fa fa-pencil fa-lg transition duration-150"></i>
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button type="button" className="inline-block text-gray-500 hover:text-gray-700" onClick={() => toggleModify(row.original.id)}>
                      <i className="fa fa-trash fa-lg transition duration-150"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CategoriaServizio = (catId) => {
  const [label, setLabel] = useState("");
  let { value } = catId;
  catId = value;
  //console.log(catId, "catId")
  if (catId !== undefined) {
    fire.firestore().collection('servizi').doc(catId).get().then((doc) => {
      if (doc.exists) {
        setLabel(doc.data().label);
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
  //console.log("labelfinal", label)
  return (
    <div className="ml-3">
      <p className="text-gray-900 whitespace-no-wrap">
        {label}
      </p>
    </div>
  );
};

function ServiziIndex() {
  const [servizi, setServizi] = useState(undefined);
  const [modalEditShowing, setEditModal] = useState(false);
  const [editID, setEdit] = useState(null);
  const [modalEditServiziData, setEditData] = useState(null);
  const [modalEditReloading, setReloading] = useState(false);
  const [deleteItemId, setDelete] = useState(undefined);
  const [modalShow, setModalDetails] = useState(false);
  const [modalNew, setIsNew] = useState(false);
  const [commercianti, setCommercianti] = useState(undefined);
  useEffect(() => {
    fire.firestore().collection('servizicommercianti').onSnapshot(snap => {
      let servizi = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServizi(servizi);
    });
    getComm();
  }, []);

  const getComm = async () => {
    let comm = await fire.firestore().collection("commercianti").get();
    let finalCommercianti = [];
    comm.forEach(doc => {
      finalCommercianti.push({ id: doc.id, ...doc.data() });
    });
    setCommercianti(finalCommercianti)
  }

  const RenderCommerciante = ({ d }) => {
    if (commercianti !== undefined) {
      let comm = commercianti.filter(item => {
        if (item.id == d) {
          return item;
        }
      });
      if (comm) {
        return comm[0].title
      }
    }
    return "";
  }

  const columns = React.useMemo(
    () => [
      //{
      //  id: "order",
      //  Header: "Posizione",
      //  accessor: "order"
      //},
      {
        id: "commerciante",
        Header: "Commerciante",
        accessor: "commerciante",
        Cell: d => <RenderCommerciante d={d.cell.value} />,
      },
      {
        id: "nome",
        Header: "Nome",
        accessor: "titolo"
      },
      {
        id: "catservizi",
        Header: "Cat. Servizi",
        accessor: "servizi",
        Cell: d => <CategoriaServizio value={d.row.original.servizi} />
      },
      //{
      //  id: "stato",
      //  Header: "Stato",
      //  accessor: d => d.enabled ? 'Visibile in App' : 'Non visible in App'
      //},
      //{
      //  id: "costo",
      //  Header: "Costo",
      //  accessor: d => `${parseInt(d.cost).toFixed(2)} €`,
      //},

    ],
    [commercianti, servizi]
  );

  const createServizio = async (data) => {
    setReloading(true);
    try {
      console.log(data, "--data--")
      await fire.firestore().collection('servizicommercianti').add({ ...data, timestamp: Date.now() });
      setTimeout(() => {
        setReloading(false);
      }, 500);
    } catch (error) {
      setReloading(false);
      console.log(error, "errror")
    }
  }

  const editServizio = async (id, data) => {
    setReloading(true);
    try {
      console.log("---dataToupdate---", data)
      fire.firestore().collection('servizicommercianti').doc(id).update({ ...data, timestamp: Date.now() });
      setTimeout(() => {
        setReloading(false);
      }, 500);
    } catch (error) {
      setReloading(false);
      console.log(error, "errror")
    }
    //if (updateData) console.log("---updateData---", JSON.stringify(updateData))
  }

  const handleDelete = async () => {
    try {
      if (deleteItemId !== undefined) {
        //console.log("--CANCELLANDO--", deleteItemId);
        const res = await fire.firestore().collection('servizicommercianti').doc(deleteItemId).delete();
        if (res) {
          setDelete(undefined);
        }
        //console.log("--CANCELLATO OK--", res);
      } else {
        //console.log("--deleteItemId not provided to servizi commercianti--");
      }
    } catch (error) {
      console.log(error, "--errorcancellazione--")
    }
    setModalDetails(!modalShow);
  }

  return (
    <div>
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={() => {
            setEditModal(!modalEditShowing);
            setIsNew(true);
          }}
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
          <span>Crea Servizio</span>
        </button>
      </div>
      {servizi !== undefined && (
        <Table
          columns={columns}
          data={servizi}
          sortBy={[
            {
              id: "cost",
              desc: true
            }
          ]}
          toggleEdit={(id, data) => {
            setEditModal(true);
            setEdit(id);
            setEditData(data);
          }}
          toggleModify={(id, data) => {
            setModalDetails(!modalShow);
            setDelete(id);
            //setModalDetails(!modalDetails);
            ////let index = fotos.findIndex(f => f.commercianti == data.id);
            //var filteredArray = fotos.filter(f => f.commercianti === data.id);
            //renderOrari(data.id)
            //setModalDetailsInfo(data);
            //setModalFotos(filteredArray);
          }}
        />
      )}
      {modalEditShowing && (
        <ModalEditServizi
          isEnabled={modalNew}
          data={modalEditServiziData}
          onCancel={() => {
            setEditModal(false);
            setEdit(null);
            setEditData(null)
            setIsNew(false);
          }}
          onConfirm={(isNew, data) => {
            if (isNew) createServizio(data)
            else editServizio(editID, data)
            //setIsNew(false);
          }}
          isReloading={modalEditReloading}
          dataLenght={servizi?.length >= 0 ? servizi?.length : 0}
        />
      )}
      <Modal
        isEnabled={modalShow}
        title="Attenzione" desc="Sei sicuro di voler eliminare il seguente servizio del commerciante?"
        onConfirm={() => {
          handleDelete();
        }}
        onCancel={() => {
          setModalDetails(!modalShow);
        }}
      />
    </div>
  )
}

export default ServiziIndex;
