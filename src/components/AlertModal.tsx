interface AlertModalProps {
  text: string
  cancel: () => void
  confirm: () => void
}

export const AlertModal = ({ text, cancel, confirm }: AlertModalProps) => {
  return (
    <div className='text-center modal-container'>
      <div className='modal-child'>
        <p>{text}</p>
        <div className='flex gap-2'>
          <button type='button' className='btn' onClick={() => cancel()}>
            Cancelar
          </button>
          <button type='button' className='btn' onClick={() => confirm()}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
