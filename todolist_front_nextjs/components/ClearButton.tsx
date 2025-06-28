import { FaTrashAlt } from "react-icons/fa";

export type ClearButtonProps = {
  disabled ?: boolean;
  onClick ?: () => void;
}

export default function ClearButton({ disabled = false, onClick = undefined } : ClearButtonProps) {

  return (

    <div className="text-center mb-3">

      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        className="bg-red-600 hover:bg-red-700 cursor-pointer disabled:cursor-default disabled:bg-red-200 disabled:text-red-300 text-white font-semibold py-2 px-4 rounded shadow-sm transition duration-300"
      >

        <div className="flex items-center">
          <FaTrashAlt size={ 20 } />
          <span className="ms-3">Clear List</span>
        </div>

      </button>

    </div>

  );

}