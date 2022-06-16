import Gif from "./wait.gif"
import "./loading.css"

function Loading() {
    return (
        <>
            <div className="overlay_loading"></div>
            <div className="modal_for_loading">
                <img src={Gif}  alt="loading..."  width= "300px" />
            </div>
        </>
    )
}

export default Loading