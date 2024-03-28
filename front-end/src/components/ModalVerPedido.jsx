
const ModalVerPedido = ({ isOpen, toggleModal }) => {
    if (!isOpen) return null;

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-xl h-full flex flex-col justify-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full">
                    <div className="flex items-center justify-between  md:p-5 border-b rounded-t dark:border-gray-600">
                        <h5 className="text-xl font-medium leading-normal text-surface dark:text-white" id="exampleModalScrollableLabel">
                            Ver pedido
                        </h5>
                        <button
                            onClick={toggleModal}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Cerral Modal</span>
                        </button>
                    </div>

                    <div className="md:p-7 h-4/6  overflow-y-auto">
                        <p>
                            This is some placeholder content to show the scrolling behavior
                            for modals. We use repeated line breaks to demonstrate how
                            content can exceed minimum inner height, thereby showing inner
                            scrolling. When content becomes longer than the predefined
                            max-height of modal, content will be cropped and scrollable
                            within the modal.
                        </p>
                        <div className='h-48'>
                            <p>This content should appear at the bottom after you scroll.</p>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
                        <button
                            onClick={toggleModal}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalVerPedido;
