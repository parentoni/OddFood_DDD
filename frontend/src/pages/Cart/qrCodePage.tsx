import QRCode from "react-qr-code"
import { FaRegCheckCircle } from "react-icons/fa";

export const QrCodePage = (props : {message : {message : string}}) => {
    return (
        <div className="w-full rounded-lg flex px-4 items-center  flex-col justify-center my-2 h-[70%] bg-gray-100">
            {/* <h1 className='text-3xl font-semibold text-center'>{props.message.message}</h1> */}

            <QRCode value={props.message.message}/>
            {/* <FaRegCheckCircle color={"#ef4444"} size={128} className=" opacity-80 "/> */}
            <p className='text-xl pb-4 font-semibold text-center'>Pedido realizado! Escaneie o QR-CODE ou copie o código PIX abaixo.</p>

            {/* <p className='text-2xl pt-4 font-semibold text-center'>Escaneie a chave PIX:</p> */}

        </div>
    )
}