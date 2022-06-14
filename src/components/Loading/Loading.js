import Gif from "./pleasewait.gif"
import "./loading.css"

function Loading() {
    return (
        <>
            <div className="overlay_loading"></div>
            <div className="modal_for_loading">
                <img src={Gif} width="300px" alt="loading.." style={{ borderRadius: "100%" }} />
            </div>
        </>
    )
}

export default Loading