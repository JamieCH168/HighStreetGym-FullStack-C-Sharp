import ReactDOM from 'react-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpToLine } from "@fortawesome/free-solid-svg-icons"

export default function toTop() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [borderVisible, setBorderVisible] = useState(true);
    const handleClick = () => {
        setBorderVisible(false);
    }

    const handleMouseLeave = () => {
        setBorderVisible(true);
    };

    return (
        <div className='fixed bottom-[210px] right-1/2'
            style={{ marginRight: 'calc(-4/12 * 100% - 80px)' }}
        >
            <div className={`mx-auto mt-10 rounded p-1 border-2 border-dashed border-indigo-600 ${borderVisible ? 'text-indigo-700' : " border-transparent"} `}
                onClick={handleClick}
                onMouseLeave={handleMouseLeave}
            >
                <div className="form-control flex-row w-[100%] rounded border-2 border-indigo-600 ">
                    <a href={undefined} onClick={scrollToTop}>
                        <div className='h-12 w-12 flex'>
                            <button className='m-auto'
                            >
                                <FontAwesomeIcon icon={faArrowsUpToLine} className='h-6'></FontAwesomeIcon>
                            </button>
                        </div>
                    </a>

                </div>
            </div>
        </div>
    );
}
