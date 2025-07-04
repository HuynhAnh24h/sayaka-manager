import { createContext,useState, useContext } from "react";

const ModalContext = createContext()

export const ModalProvider = ({children}) =>{
    const [modal,setModal] = useState(null)
    const openModal = (modalName) => setModal(modalName)
    const closeModal = () => setModal(null)

    return (
        <ModalContext.Provider value={{modal, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)