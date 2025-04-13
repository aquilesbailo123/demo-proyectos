import useModalStore from "@/stores/ModalStore"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./ModalBase.css"

const ModalBase = () => {
    
    const isModalOpen = useModalStore((state) => state.isModalOpen)
    const closeModal = useModalStore((state) => state.closeModal)
    const modalContent = useModalStore((state) => state.modalContent)
    
    const location = useLocation()

    const handleOverlayClick = (e : any) => {
        if (e.target === e.currentTarget) {
            // NOTE this allows for sending a custom prop "handleClose()" for executing when modal overlay is clicked
            if (modalContent && typeof modalContent.props.handleClose === 'function') {
                modalContent.props.handleClose()
            }
            closeModal()
        }
    }

    useEffect((() => {
        if (isModalOpen) {
        closeModal()
        }
    }), [location.pathname])

    if (!isModalOpen) return null

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                {modalContent && <div>{modalContent}</div>}
            </div>
        </div>
    )
}

export default ModalBase