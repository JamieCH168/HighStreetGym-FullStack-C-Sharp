import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export default function activityFilter({ activityName, onActivityChange, onCancelActivity }) {
    // const [showConfirm, setShowConfirm] = useState(false);
    const changeHandler = e => {
        onActivityChange(e.target.value);
    };
    const cancelHandler = () => {
        onCancelActivity("");
    }

    return (
        <div className="mx-auto mt-10 rounded border-2 border-dashed  p-1 hover:border-transparent" >
            <div className="form-control flex-row w-[100%] rounded border-2 ">
                {/* <label className="label">
                    <span className="label-text text-xl">Search Class:</span>
                </label> */}
                <button className="btn btn-ghost btn-circle text-zinc-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <select
                    className="input input-bordered"
                    value={activityName}
                    onChange={changeHandler}
                ><option value="" >-- Select an class --</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Abs">Abs</option>
                    <option value="HIIT or high-intensity interval training">HIIT or high-intensity interval training</option>
                    <option value="Indoor cycling">Indoor cycling</option>
                    <option value="Boxing">Boxing</option>
                    <option value="Zumba">Zumba</option>
                </select>
                <div className='h-12 w-12 flex text-zinc-50'>
                    <button className='m-auto'
                        onClick={cancelHandler}>
                        <FontAwesomeIcon icon={faXmark} className='h-6'></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
}
