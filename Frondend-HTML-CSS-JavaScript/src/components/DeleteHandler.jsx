
export default function DeleteHandler({ onDelete, onCancel }) {

  return (
    <div className="fixed inset-0 bg-[#0000004d] text-3xl m-auto flex justify-evenly items-center z-20">

      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure><img src="../../public/stop.jpg" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title text-amber-300 text-3xl">Warning!</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary  mr-4" onClick={() => { onCancel() }} >Cancel</button>
            <button className="btn btn-secondary" onClick={() => {
              onDelete()
            }}> Confirm</button>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#f4eeee] h-[350px] w-[350px] flex justify-around items-center flex-col rounded-lg " >
        <p className="text-center">Are you sure you want to delete this item?</p>
        <div>
          <button
            className="btn btn-primary  mr-4"
            onClick={() => { onCancel() }}
          >
            Cancel
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              onDelete()
            }}
          >
            Confirm
          </button>

        </div>
      </div> */}


    </div>
  );
}
