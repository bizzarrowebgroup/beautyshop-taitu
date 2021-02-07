import React, { useState, useContext } from 'react';
import fire from '../config/fire-config';
import RouteContext from '../config/RouteContext';
import moment from 'moment';
moment.locale("it");

const CreateCommerciante = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [via, setVia] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState(null);
  const [plan, setPlan] = useState(null);
  const [step, setStep] = useState(0);
  const [economy, setEconomy] = useState(0);
  const [hours, setHours] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    lunedi: "off",
    martedi: "off",
    mercoledi: "off",
    giovedi: "off",
    venerdi: "off",
    sabato: "off",
    domenica: "off"
  });
  const [lunediOrari, setLunedi] = useState({
    start: null,
    end: null
  });
  const [martediOrari, setMartedi] = useState({
    start: null,
    end: null
  });
  const [mercolediOrari, setMercoledi] = useState({
    start: null,
    end: null
  });
  const [giovediOrari, setGiovedi] = useState({
    start: null,
    end: null
  });
  const [venerdiOrari, setVenerdi] = useState({
    start: null,
    end: null
  });
  const [sabatoOrari, setSabato] = useState({
    start: null,
    end: null
  });
  const [domenicaOrari, setDomenica] = useState({
    start: null,
    end: null
  });
  const { ShowNotification } = useContext(RouteContext)

  const [notification, setNotification] = useState('');
  const [notificationType, setNType] = useState(0); // 0 = danger / 1 = warning / 2 = success / 3 =info
  const showNotification = (text, time, type) => {
    setNotification(text)
    setNType(type)
    setTimeout(() => {
      setNotification('');
      setNType(0)
    }, time)
  }
  const handleSubmit = async (event) => {
    let data = {
      title: title,
      desc: desc,
      economy: economy,
      stars: 0,
      tipo: !type ? 1 : 0,
      via: via,
      email: email,
      phone: phone,
      plan: plan
    };
    let orari = {
      lunediOrari,
      martediOrari,
      mercolediOrari,
      giovediOrari,
      venerdiOrari,
      sabatoOrari,
      domenicaOrari
    }
    console.log(orari, "--data--\n\n")
    event.preventDefault();
    //return;
    try {
      const commerciante = await fire.firestore()
        .collection('commercianti')
        .add(data);
      const orario = await fire.firestore()
        .collection('orari')
        .add({
          commercianti: commerciante.id
        });
      /**
       * add orari to DB DIOCAN! 
       */
      await fire.firestore().collection('orari').doc(orario.id).collection('orario').add({
        day: 1,
        open: lunediOrari.start !== null ? lunediOrari.start : "", //end
        close: lunediOrari.end !== null ? lunediOrari.end : ""
      })
      await fire.firestore().collection('orari').doc(orario.id).collection('orario').add({
        day: 2,
        open: martediOrari.start !== null ? martediOrari.start : "", //end
        close: martediOrari.end !== null ? martediOrari.end : ""
      })
      await fire.firestore().collection('orari').doc(orario.id).collection('orario').add({
        day: 3,
        open: mercolediOrari.start !== null ? mercolediOrari.start : "", //end
        close: mercolediOrari.end !== null ? mercolediOrari.end : ""
      })
      await fire.firestore().collection('orari').doc(orario.id).collection('orario').add({
        day: 4,
        open: giovediOrari.start !== null ? giovediOrari.start : "", //end
        close: giovediOrari.end !== null ? giovediOrari.end : ""
      })
      await fire.firestore().collection('orari').doc(orario.id).collection('orario').add({
        day: 5,
        open: venerdiOrari.start !== null ? venerdiOrari.start : "", //end
        close: venerdiOrari.end !== null ? venerdiOrari.end : ""
      })
      await fire.firestore().collection('orari').doc(orario.id).collection('orario').add({
        day: 6,
        open: sabatoOrari.start !== null ? sabatoOrari.start : "", //end
        close: sabatoOrari.end !== null ? sabatoOrari.end : ""
      })
      await fire.firestore().collection('orari').doc(orario.id).collection('orario').add({
        day: 7,
        open: domenicaOrari.start !== null ? domenicaOrari.start : "", //end
        close: domenicaOrari.end !== null ? domenicaOrari.end : ""
      })
      // debug mode
      //setTitle('');
      //setDesc('');
      //setVia('');
      //setEmail('');
      //setPhone('');
      //setType(null);
      //setPlan(null);
      //setStep(0);
      //setEconomy(0);
      showNotification("Nuovo commerciante creato", 2000, 2)
    } catch (error) {
      showNotification(error, 5000, 0)
    }
  }
  const changeType = (ty) => ty !== type ? setType(!type) : setType(null);
  const changePlan = (pl) => pl !== plan ? setPlan(pl) : setPlan(null);
  const checkAndGoOn = () => {
    if (title !== '' && type !== null && plan !== null) {
      setStep(step + 1);
    } else if (title == '') {
      showNotification("Inserisci il nome dell'azienda!", 5000, 1)

    } else if (type == null) {
      showNotification("L'azienda deve avere un tipo valido!", 5000, 1)

    } else if (plan == null) {
      showNotification("Scegli un piano per questo commerciante!", 5000, 1)

    } else if (title == '' && type == null && plan == null) {
      showNotification("Inserisci tutti i campi, sono obbligatori!!!", 5000, 0)
    }
  }
  const handleOptionChange = (changeEvent, type) => {
    let val = changeEvent; //changeEvent.target.value;
    //console.log("---", {
    //  val,
    //  type,
    //  selectedOption
    //})
    if (type == 0) {
      setLunedi({
        start: val == "on" ? "08:30" : null,
        end: val == "on" ? "19:30" : null
      });
      setSelectedOption({
        ...selectedOption,
        lunedi: val
      });
    } else if (type == 1) {
      setMartedi({
        start: val == "on" ? "08:30" : null,
        end: val == "on" ? "19:30" : null
      });
      setSelectedOption({
        ...selectedOption,
        martedi: val
      });
    } else if (type == 2) {
      setMercoledi({
        start: val == "on" ? "08:30" : null,
        end: val == "on" ? "19:30" : null
      });
      setSelectedOption({
        ...selectedOption,
        mercoledi: val
      });
    } else if (type == 3) {
      setGiovedi({
        start: val == "on" ? "08:30" : null,
        end: val == "on" ? "19:30" : null
      });
      setSelectedOption({
        ...selectedOption,
        giovedi: val
      });
    } else if (type == 4) {
      setVenerdi({
        start: val == "on" ? "08:30" : null,
        end: val == "on" ? "19:30" : null
      });
      setSelectedOption({
        ...selectedOption,
        venerdi: val
      });
    } else if (type == 5) {
      setSabato({
        start: val == "on" ? "08:30" : null,
        end: val == "on" ? "19:30" : null
      });
      setSelectedOption({
        ...selectedOption,
        sabato: val
      });
    } else if (type == 6) {
      setDomenica({
        start: val == "on" ? "08:30" : null,
        end: val == "on" ? "19:30" : null
      });
      setSelectedOption({
        ...selectedOption,
        domenica: val
      });
    }
  }
  //const handleOptionChange1 = changeEvent => {
  //  let val = changeEvent.target.value;
  //  setSelectedOption((state) => ({ ...state, martedi: val }))
  //}
  React.useEffect(() => {
    let done = createHours()
    setHours(done);
  }, []);
  const createHours = (realStart, slotTime, endTime) => {
    const hours = [];
    const startHour = 7;
    for (let hour = 0; hour < 15; hour++) {
      hours.push(
        moment({ hour })
          .add(startHour, 'hours')
          .format('LT')
      );

      hours.push(
        moment({
          hour,
          minute: 15
        })
          .add(startHour, 'hours')
          .format('LT')
      );

      hours.push(
        moment({
          hour,
          minute: 30
        })
          .add(startHour, 'hours')
          .format('LT')
      );

      hours.push(
        moment({
          hour,
          minute: 45
        })
          .add(startHour, 'hours')
          .format('LT')
      );
    }
    return hours;
  }
  const { lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica } = selectedOption;
  return (
    <div>
      <div className={`${notification == '' ? "hidden" : ""}`} style={{
        position: "absolute",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 9999
      }}>
        <ShowNotification notification={notification} notificationType={notificationType} />
      </div>
      <div className="rounded-md w-full p-5 mb-4 bg-white shadow">
        <div className={`${step == 0 ? "" : "hidden"}`}>
          <div className="border-b border-gray-200 mb-7">
            <div className="text-gray-800 text-center text-2xl pb-6">Crea un nuovo Commerciante</div>
          </div>
          <div className="pt-7">
            <div className="sm:flex sm:justify-center pb-8">
              <div className="w-full">
                <div className="mb-2 mt-2">
                  <div className="text-sm text-left text-gray-700 font-medium">Nome azienda</div>
                </div>
                <input id="title" value={title} placeholder="Inserisci il nome da visualizzare" className="appearance-none form-input block shadow-sm w-full md:w-1/2 h-10 text-gray-900 text-sm transition duration-150 ease-in-out md:leading-5" onChange={({ target }) => setTitle(target.value)} />
                <div className="mt-5 mb-2">
                  <div className="text-sm text-left text-gray-700 font-medium">Scegli il tipo</div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <button onClick={() => changeType(true)} type="button" className={` ${type !== null && type ? "border-green-300" : "border-gray-200"} col-span-1 flex shadow-sm rounded-md border cursor-pointer duration-200 focus:outline-none hover:border-green-300 `}>
                    <div className="bg-green-50 flex-shrink-0 flex items-center h-14 w-14 justify-center rounded-l-md">
                      <svg viewBox="0 0 425.197 423.627" className="h-8 w-8">
                        <path d="M194.184 212.99l-70.745 69.67-70.745-69.67 70.745-69.67z" fill="#932279"></path>
                        <path d="M208.92 198.72l-69.685-70.11L208.92 58.5l69.685 70.11z" fill="#efa724"></path>
                        <path d="M278.763 297.6l-70.745 69.67-70.745-69.67 70.745-69.67z" fill="#9ccd2a"></path>
                        <path d="M293.496 283.318l-69.685-70.11 69.685-70.11 69.685 70.11z" fill="#262577"></path>
                        <path d="M222.78 226.796h94.46v95.16h-94.46z" fill="#efa724"></path>
                        <path d="M223.16 103.918h94.78v94.68h-94.78z" fill="#932279"></path>
                        <path d="M95.905 226.8h98.677v98.677H95.905z" fill="#262577"></path>
                        <path d="M95.897 99.915h98.68v98.107h-98.68z" fill="#9ccd2a"></path>
                        <path d="M208.915 53.503l-42.63 42.892H92.367v72.57L47.66 212.994l44.72 44.04v71.972h71.758l43.868 43.202 43.868-43.202h72.502v-71.768l43.765-44.033-43.162-43.426V96.962H252.11zm-.003 9.994l33.26 33.465H219.6v86.006l-10.69 10.755-10.82-10.886V96.395h-21.88zM99.41 103.44h59.87l-25.026 25.18 56.79 57.138v8.74H180.41l-56.984-56.12-24.015 23.65zm69.8 0h21.836v72.308l-46.852-47.14zm57.45.58h22.53l24.44 24.59-46.97 47.256zm32.464 0h58.81v58.673L293.489 138.1l-56.63 56.977H226.66v-9.213l56.905-57.253zm34.366 44.074l24.444 24.593v22.39h-71.14zm-170.053.18l46.936 46.224H99.41v-22.564zm-31.07 30.597v22.672h85.16l11.63 11.453-10.444 10.286H92.378v23.85l-34.662-34.136zm232.61.905l33.228 33.432-33.83 34.038V223.27h-85.6l-10.002-10.063 11.017-11.084h85.188zm-126.885 13.072l10.813 10.88 2.492-2.507 8.204-8.254v9.157h10.254l-11.017 11.084 10.002 10.063h-9.588v10.782l-11.247-11.076-9.9 9.75v-9.444h-9.355l10.444-10.286-11.63-11.453h10.527zm-98.67 37.48h72.134l-48.122 47.39-24.012-23.647zm82.172 0h9.45v9.35l-58.81 57.916 24.733 24.358H99.424v-57.976l24.003 23.638zm44.7 0h9.556l57.636 57.987 2.483-2.498 21.357-21.487v57.635h-58.304l24.746-24.37-57.474-56.603zm19.5 0h71.542v24.008l-23.84 23.985zm-37.774 2.545l11.238 11.068v85.068h22.582l-33.82 33.307-33.82-33.307h23.912v-86.378zm-16.967 16.71v72.37h-24.02L142.294 297.6zm35.25 1.298l47.435 46.715-24.745 24.37h-22.7z" fill="#fff"></path>
                      </svg>
                    </div>
                    <div className="rounded-r-md px-5 py-1 text-left">
                      <span className="font-medium text-sm">Parrucchiere</span>
                    </div>
                  </button>
                  <button onClick={() => changeType(false)} type="button" className={` ${type !== null && !type ? "border-pink-300" : "border-gray-200"} col-span-1 flex shadow-sm rounded-md border cursor-pointer duration-200 focus:outline-none hover:border-pink-300 `}>
                    <div className="bg-pink-100 flex-shrink-0 flex items-center h-14 w-14 justify-center rounded-l-md">
                      <svg viewBox="0 0 128 128" className="h-8 w-8">
                        <path fill="#A80030" d="M73.776 67.531c-2.065.028.391 1.063 3.087 1.479a27.453 27.453 0 002.023-1.741c-1.679.41-3.387.419-5.11.262m11.086-2.763c1.229-1.697 2.127-3.556 2.442-5.478-.276 1.369-1.019 2.553-1.72 3.801-3.86 2.431-.363-1.443-.002-2.916-4.15 5.225-.57 3.133-.72 4.593m4.093-10.648c.249-3.72-.733-2.544-1.063-1.125.384.201.69 2.622 1.063 1.125M65.944 3.283c1.102.198 2.381.35 2.202.612 1.206-.263 1.48-.506-2.202-.612m2.202.613l-.779.161.725-.064.054-.097m34.372 51.634c.123 3.34-.978 4.961-1.969 7.829l-1.786.892c-1.46 2.838.142 1.802-.903 4.059-2.281 2.027-6.921 6.345-8.406 6.738-1.084-.023.734-1.278.972-1.771-3.052 2.098-2.449 3.147-7.118 4.422l-.136-.305c-11.516 5.417-27.51-5.318-27.299-19.966-.123.931-.349.697-.605 1.074-.594-7.537 3.481-15.107 10.353-18.196 6.722-3.329 14.602-1.963 19.417 2.524-2.644-3.465-7.909-7.137-14.148-6.793-6.111.097-11.828 3.98-13.735 8.196-3.132 1.972-3.495 7.6-4.859 8.628-1.835 13.491 3.453 19.318 12.398 26.175 1.407.949.396 1.093.587 1.815-2.972-1.392-5.694-3.493-7.931-6.065 1.186 1.739 2.468 3.429 4.125 4.756-2.803-.949-6.546-6.79-7.64-7.028 4.832 8.649 19.599 15.169 27.333 11.935-3.579.131-8.124.073-12.145-1.413-1.688-.869-3.984-2.669-3.574-3.007 10.553 3.944 21.456 2.988 30.586-4.333 2.323-1.81 4.861-4.887 5.594-4.93-1.105 1.661.188.8-.66 2.266 2.316-3.733-1.005-1.521 2.394-6.448l1.256 1.729c-.467-3.098 3.848-6.861 3.41-11.762.99-1.499 1.104 1.612.054 5.061 1.457-3.825.384-4.44.759-7.597.404 1.062.935 2.188 1.208 3.308-.95-3.696.975-6.226 1.45-8.373-.467-.208-1.464 1.634-1.692-2.732.034-1.896.528-.993.718-1.46-.373-.215-1.349-1.668-1.944-4.456.431-.655 1.151 1.698 1.739 1.795-.378-2.217-1.028-3.907-1.053-5.609-1.713-3.579-.606.478-1.996-1.536-1.823-5.687 1.513-1.32 1.738-3.903 2.763 4.003 4.339 10.208 5.062 12.777-.552-3.133-1.443-6.168-2.532-9.105.839.354-1.352-6.446 1.091-1.943-2.609-9.6-11.166-18.569-19.038-22.778.962.881 2.179 1.989 1.743 2.162-3.915-2.331-3.227-2.513-3.787-3.498-3.19-1.297-3.399.104-5.511.003-6.012-3.188-7.171-2.85-12.703-4.848l.252 1.177c-3.984-1.327-4.641.503-8.945.004-.263-.205 1.379-.74 2.73-.937-3.85.508-3.67-.759-7.438.14.929-.651 1.909-1.082 2.9-1.637-3.139.191-7.495 1.828-6.151.339-5.121 2.286-14.218 5.493-19.322 10.28l-.161-1.073c-2.339 2.809-10.2 8.387-10.826 12.022l-.625.146c-1.218 2.06-2.004 4.396-2.97 6.517-1.592 2.713-2.334 1.044-2.107 1.469-3.132 6.349-4.687 11.683-6.03 16.057.958 1.432.022 8.614.385 14.364-1.572 28.394 19.928 55.962 43.43 62.329 3.445 1.23 8.567 1.184 12.924 1.311-5.141-1.471-5.806-.778-10.813-2.525-3.614-1.701-4.405-3.644-6.964-5.864l1.014 1.79c-5.019-1.775-2.918-2.198-7.002-3.491l1.083-1.412c-1.627-.123-4.309-2.74-5.042-4.191l-1.779.07c-2.138-2.638-3.277-4.538-3.194-6.011l-.575 1.024c-.652-1.119-7.865-9.893-4.123-7.85-.696-.637-1.62-1.035-2.622-2.856l.762-.871c-1.802-2.316-3.315-5.287-3.2-6.276.96 1.298 1.627 1.54 2.287 1.763-4.548-11.285-4.803-.622-8.248-11.487l.729-.059c-.559-.842-.898-1.756-1.347-2.652l.316-3.161c-3.274-3.786-.916-16.098-.443-22.851.328-2.746 2.733-5.669 4.563-10.252l-1.114-.192c2.131-3.717 12.167-14.928 16.815-14.351 2.251-2.829-.446-.011-.886-.723 4.945-5.119 6.5-3.617 9.838-4.537 3.6-2.137-3.089.833-1.383-.815 6.223-1.589 4.41-3.613 12.528-4.42.857.487-1.987.752-2.701 1.385 5.185-2.536 16.408-1.959 23.697 1.408 8.458 3.952 17.961 15.638 18.336 26.631l.427.114c-.216 4.37.669 9.424-.865 14.066l1.043-2.201M51.233 70.366l-.29 1.448c1.357 1.845 2.435 3.843 4.167 5.283-1.246-2.434-2.173-3.44-3.877-6.731m3.208-.126c-.718-.795-1.144-1.751-1.62-2.704.456 1.675 1.388 3.114 2.255 4.578l-.635-1.874m56.785-12.343l-.304.762a36.72 36.72 0 01-3.599 11.487 36.107 36.107 0 003.903-12.249M66.353 2.293c1.396-.513 3.433-.281 4.914-.617-1.93.162-3.852.259-5.75.503l.836.114M17.326 28.362c.322 2.979-2.242 4.135.567 2.171 1.506-3.39-.588-.935-.567-2.171M14.025 42.15c.646-1.986.764-3.18 1.011-4.328-1.788 2.285-.823 2.773-1.011 4.328"></path>
                      </svg>
                    </div>
                    <div className="rounded-r-md px-5 py-1 text-left">
                      <span className="font-medium text-sm">Estetista</span>
                    </div>
                  </button>
                </div>
                <div className="mt-5 mb-2">
                  <div className="text-sm text-left text-gray-700 font-medium">Scegli un piano</div>
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                  <button onClick={() => changePlan(0)} className={`${plan !== null && plan == 0 ? "border-green-400" : ""} col-span-1 shadow-sm rounded-md duration-200 focus:outline-none border hover:border-green-400 border-gray-200" type="button`}>
                    <div className="border-b border-gray-200 flex flex-row justify-items-center justify-center content-center">
                      <div className="text-xs text-center ">€ 2,99 al mese</div>
                      <div className="text-xs font-bold text-center px-2">+</div>
                      <div className="text-xs text-center ">€ 0,25 a pren.</div>
                    </div>
                    <div className="p-4">
                     
                    </div>
                  </button>
                  <button onClick={() => changePlan(1)} className={`${plan !== null && plan == 1 ? "border-green-400" : ""} col-span-1 shadow-sm rounded-md duration-200 focus:outline-none border hover:border-green-400 border-gray-200" type="button`}>
                    <div className="border-b border-gray-200 flex flex-row justify-items-center justify-center content-center">
                      <div className="text-xs text-center ">€ 5,99 al mese</div>
                      <div className="text-xs font-bold text-center px-2">+</div>
                      <div className="text-xs text-center ">€ 0,20 a pren.</div>
                    </div>
                    <div className="p-4">
                      
                    </div>
                  </button>
                  <button onClick={() => changePlan(2)} className={`${plan !== null && plan == 2 ? "border-green-400" : ""} col-span-1 shadow-sm rounded-md duration-200 focus:outline-none border hover:border-green-400 border-gray-200" type="button`}>
                    <div className="border-b border-gray-200 flex flex-row justify-items-center justify-center content-center">
                      <div className="text-xs text-center ">€ 7,99 al mese</div>
                      <div className="text-xs font-bold text-center px-2">+</div>
                      <div className="text-xs text-center ">€ 0,15 a pren.</div>
                    </div>
                    <div className="p-4">
                    </div>
                  </button>
                  <button onClick={() => changePlan(3)} className={`${plan !== null && plan == 3 ? "border-green-400" : ""} col-span-1 shadow-sm rounded-md duration-200 focus:outline-none border hover:border-green-400 border-gray-200" type="button`}>
                    <div className="border-b border-gray-200">
                      <div className="text-sm text-center p-2">€ 59,99 annui</div>
                    </div>
                    <div className="p-4">
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-3 sm:pt-5 border-t border-gray-200 flex flex-row-reverse">
              <button onClick={checkAndGoOn} type="button" className="active:text-gray-800 active:bg-gray-50 inline-flex rounded-md shadow-sm border border-gray-300 whitespace-no-wrap justify-center items-center w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-600 sm:text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                {"Prossimo Step"}
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`${step == 1 ? "" : "hidden"}`}>
          <div className="border-b border-gray-200 pb-7">
            <div className="text-gray-800 text-center text-2xl pb-6">Informazioni generali</div>
          </div>
          <div className="pt-7">
            <div className="sm:flex sm:justify-center pb-6">
              <div className="grid grid-cols-1 row-gap-2 sm:row-gap-3 col-gap-1 sm:grid-cols-10 sm:max-w-xl">
                <div className="col-span-10">
                  <label className="block text-sm text-left text-gray-700 font-medium mb-2">Descrizione</label>
                  <textarea id="desc" value={desc} onChange={({ target }) => setDesc(target.value)} className="form-input block h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm" placeholder="Inserisci una descrizione corposa" />
                </div>
                <div className="col-span-10">
                  <label className="block text-sm text-left text-gray-700 font-medium mb-2">Indirizzo</label>
                  <input id="billingAddress" value={via} onChange={({ target }) => setVia(target.value)} className="form-input block h-10 mt-1 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm" placeholder="Via Mestrina 28, 30173 Mestre VE" />
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <label className="block text-sm text-left text-gray-700 font-medium mb-2">Email</label>
                  <input id="email" value={email} onChange={({ target }) => setEmail(target.value)} className="form-input block h-10 mt-1 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm" />
                </div>
                <div className="col-span-10 sm:col-span-2">
                  <label className="block text-sm text-left text-gray-700 font-medium mb-2">Telefono</label>
                  <input id="phone" value={phone} onChange={({ target }) => setPhone(target.value)} type="text" className="form-input block h-10 mt-1 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm" />
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <label className="block text-sm text-left text-gray-700 font-medium mb-2">Economia</label>
                  <select onChange={({ target }) => setEconomy(Number(target.value))} id="billingCountry" className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                    <option disabled></option>
                    <option value="0">Conveniente</option>
                    <option value="1">Medio / Alta</option>
                    <option value="2">Alta</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pt-3 sm:pt-5 border-t border-gray-200 sm:flex sm:flex-row-reverse">
              <span className="flex w-full sm:ml-2 sm:w-auto">
                <button onClick={checkAndGoOn} type="submit" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-600 sm:text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  {"Prossimo Step"}
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </span>
              <span className="flex w-full sm:w-auto mb-1 sm:mb-0 mt-2 sm:mt-0 sm:ml-4">
                <button onClick={() => setStep(step - 1)} type="button" className="active:text-gray-800 active:bg-gray-50 inline-flex rounded-md shadow-sm border border-gray-300 whitespace-no-wrap justify-center items-center w-full sm:w-auto px-4 py-2 bg-white text-base leading-6 font-medium text-gray-600 sm:text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {"Step precedente"}
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className={`${step == 2 ? "" : "hidden"}`}>
          <div className="border-b border-gray-200 pb-7">
            <div className="text-gray-800 text-center text-2xl pb-6">Informazioni generali</div>
          </div>
          <div className="pt-7">
            <div className="sm:flex sm:justify-center pb-6">
              <div className="grid grid-cols-1 row-gap-2 sm:row-gap-3 col-gap-1 sm:grid-cols-10 sm:max-w-xl">
                <div className="col-span-10">
                  <label className="block text-sm text-left text-gray-700 font-medium mb-2">Orari</label>
                  <div className="flex flex-col flex-wrap justify-start justify-items-start content-start bg-grey-lighter text-grey-darker border rounded px-4 mb-3">
                    <div className="flex">
                      <div className="m-2 flex-row content-start justify-items-start justify-center border-t border-l border-r border-gray-400 rounded">
                        <div className="text-grey-darker pl-2">{"Lunedi"}</div>
                        <div className="text-xs border-t border-b border-gray-400 px-2 py-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="off" onClick={() => handleOptionChange("off", 0)} checked={lunedi == "off"} />
                              <span className="ml-2 text-xs font-mono text-red-400">Chiuso</span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="on" onClick={() => handleOptionChange("on", 0)} checked={lunedi == "on"} />
                              <span className="ml-2 text-xs font-mono text-green-700">Aperto</span>
                            </label>
                          </div>
                        </div>
                        {lunedi == "on" && (
                          <div className="flex flex-row border-b border-gray-400 pb-2 pt-2 px-2 content-center justify-center">
                            <div className="flex-1 text-xs pr-2">
                              <div className="text-grey-darker">{"Apertura"}</div>
                              <select onChange={({ target }) => setLunedi({ ...lunediOrari, start: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="text-grey-darker">{"Chiusura"}</div>
                              <select onChange={({ target }) => setLunedi({ ...lunediOrari, end: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center border-t border-l border-r border-gray-400 rounded">
                        <div className="flex-1 text-grey-darker">{"Martedi"}</div>
                        <div className="text-xs border-t border-b border-gray-400 px-2 py-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="off" onClick={() => handleOptionChange("off", 1)} checked={martedi == "off"} />
                              <span className="ml-2 text-xs font-mono text-red-400">Chiuso</span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="on" onClick={() => handleOptionChange("on", 1)} checked={martedi == "on"} />
                              <span className="ml-2 text-xs font-mono text-green-700">Aperto</span>
                            </label>
                          </div>
                        </div>
                        {martedi == "on" && (
                          <div className="flex flex-row border-b border-gray-400 pb-2 pt-2 px-2 content-center justify-center">
                            <div className="flex-1 text-xs pr-2">
                              <div className="text-grey-darker">{"Apertura"}</div>
                              <select onChange={({ target }) => setMartedi({ ...martediOrari, start: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="text-grey-darker">{"Chiusura"}</div>
                              <select onChange={({ target }) => setMartedi({ ...martediOrari, end: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center border-t border-l border-r border-gray-400 rounded">
                        <div className="flex-1 text-grey-darker">{"Mercoledi"}</div>
                        <div className="text-xs border-t border-b border-gray-400 px-2 py-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="off" onClick={() => handleOptionChange("off", 2)} checked={mercoledi == "off"} />
                              <span className="ml-2 text-xs font-mono text-red-400">Chiuso</span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="on" onClick={() => handleOptionChange("on", 2)} checked={mercoledi == "on"} />
                              <span className="ml-2 text-xs font-mono text-green-700">Aperto</span>
                            </label>
                          </div>
                        </div>
                        {mercoledi == "on" && (
                          <div className="flex flex-row border-b border-gray-400 pb-2 pt-2 px-2 content-center justify-center">
                            <div className="flex-1 text-xs pr-2">
                              <div className="text-grey-darker">{"Apertura"}</div>
                              <select onChange={({ target }) => setMercoledi({ ...mercolediOrari, start: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="text-grey-darker">{"Chiusura"}</div>
                              <select onChange={({ target }) => setMercoledi({ ...mercolediOrari, end: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="m-2 flex-row content-start justify-items-start justify-center border-t border-l border-r border-gray-400 rounded">
                        <div className="flex-1 text-grey-darker">{"Giovedi"}</div>
                        <div className="text-xs border-t border-b border-gray-400 px-2 py-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="off" onClick={() => handleOptionChange("off", 3)} checked={giovedi == "off"} />
                              <span className="ml-2 text-xs font-mono text-red-400">Chiuso</span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="on" onClick={() => handleOptionChange("on", 3)} checked={giovedi == "on"} />
                              <span className="ml-2 text-xs font-mono text-green-700">Aperto</span>
                            </label>
                          </div>
                        </div>
                        {giovedi == "on" && (
                          <div className="flex flex-row border-b border-gray-400 pb-2 pt-2 px-2 content-center justify-center">
                            <div className="flex-1 text-xs pr-2">
                              <div className="text-grey-darker">{"Apertura"}</div>
                              <select onChange={({ target }) => setGiovedi({ ...giovediOrari, start: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="text-grey-darker">{"Chiusura"}</div>
                              <select onChange={({ target }) => setGiovedi({ ...giovediOrari, end: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center border-t border-l border-r border-gray-400 rounded">
                        <div className="flex-1 text-grey-darker">{"Venerdì"}</div>
                        <div className="text-xs border-t border-b border-gray-400 px-2 py-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="off" onClick={() => handleOptionChange("off", 4)} checked={venerdi == "off"} />
                              <span className="ml-2 text-xs font-mono text-red-400">Chiuso</span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="on" onClick={() => handleOptionChange("on", 4)} checked={venerdi == "on"} />
                              <span className="ml-2 text-xs font-mono text-green-700">Aperto</span>
                            </label>
                          </div>
                        </div>
                        {venerdi == "on" && (
                          <div className="flex flex-row border-b border-gray-400 pb-2 pt-2 px-2 content-center justify-center">
                            <div className="flex-1 text-xs pr-2">
                              <div className="text-grey-darker">{"Apertura"}</div>
                              <select onChange={({ target }) => setVenerdi({ ...venerdiOrari, start: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="text-grey-darker">{"Chiusura"}</div>
                              <select onChange={({ target }) => setVenerdi({ ...venerdiOrari, end: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="m-2 flex-row content-start justify-items-start justify-center border-t border-l border-r border-gray-400 rounded">
                        <div className="flex-1 text-grey-darker">{"Sabato"}</div>
                        <div className="text-xs border-t border-b border-gray-400 px-2 py-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="off" onClick={() => handleOptionChange("off", 5)} checked={sabato == "off"} />
                              <span className="ml-2 text-xs font-mono text-red-400">Chiuso</span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="on" onClick={() => handleOptionChange("on", 5)} checked={sabato == "on"} />
                              <span className="ml-2 text-xs font-mono text-green-700">Aperto</span>
                            </label>
                          </div>
                        </div>
                        {sabato == "on" && (
                          <div className="flex flex-row border-b border-gray-400 pb-2 pt-2 px-2 content-center justify-center">
                            <div className="flex-1 text-xs pr-2">
                              <div className="text-grey-darker">{"Apertura"}</div>
                              <select onChange={({ target }) => setSabato({ ...sabatoOrari, start: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="text-grey-darker">{"Chiusura"}</div>
                              <select onChange={({ target }) => setSabato({ ...sabatoOrari, end: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-2">
                      <div className="m-2 flex-row content-start justify-items-start justify-center border-t border-l border-r border-gray-400 rounded">
                        <div className="flex-1 text-grey-darker">{"Domenica"}</div>
                        <div className="text-xs border-t border-b border-gray-400 px-2 py-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="off" onClick={() => handleOptionChange("off", 6)} checked={domenica == "off"} />
                              <span className="ml-2 text-xs font-mono text-red-400">Chiuso</span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" class="form-checkbox h-4 w-4" value="on" onClick={() => handleOptionChange("on", 6)} checked={domenica == "on"} />
                              <span className="ml-2 text-xs font-mono text-green-700">Aperto</span>
                            </label>
                          </div>
                        </div>
                        {domenica == "on" && (
                          <div className="flex flex-row border-b border-gray-400 pb-2 pt-2 px-2 content-center justify-center">
                            <div className="flex-1 text-xs pr-2">
                              <div className="text-grey-darker">{"Apertura"}</div>
                              <select onChange={({ target }) => setDomenica({ ...domenicaOrari, start: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="text-grey-darker">{"Chiusura"}</div>
                              <select onChange={({ target }) => setDomenica({ ...domenicaOrari, end: target.value })} className="block appearance-none form-select h-10 text-gray-900 w-full py-2 px-3 border rounded-md focus:outline-none shadow-sm transition duration-150 ease-in-out text-sm">
                                <option disabled></option>
                                {hours !== null && hours.map((item, index) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  )
                                })
                                }
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3 sm:pt-5 border-t border-gray-200 sm:flex sm:flex-row-reverse">
              <span className="flex w-full sm:ml-2 sm:w-auto">
                <button onClick={handleSubmit} type="submit" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-600 sm:text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  {"Crea Commerciante"}
                  <svg className="animate-spin ml-1 hidden h-4 mt-px text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </span>
              <span className="flex w-full sm:w-auto mb-1 sm:mb-0 mt-2 sm:mt-0 sm:ml-4">
                <button onClick={() => setStep(step - 1)} type="button" className="active:text-gray-800 active:bg-gray-50 inline-flex rounded-md shadow-sm border border-gray-300 whitespace-no-wrap justify-center items-center w-full sm:w-auto px-4 py-2 bg-white text-base leading-6 font-medium text-gray-600 sm:text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {"Step precedente"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateCommerciante;