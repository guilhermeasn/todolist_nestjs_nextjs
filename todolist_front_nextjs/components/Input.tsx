import { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export type InputProps = {
  error?: string | null;
  onInput: (value: string) => Promise<boolean>;
  onUpdated?: () => void;
}

export default function Input({ error = null, onInput, onUpdated } : InputProps) {

  const [ value, setValue ] = useState<string>('');
  const [ wait, setWait ] = useState<boolean>(false);

  useEffect(() => { if(onUpdated) onUpdated(); }, [ value ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!value || wait) return;
    setWait(true);
    if(await onInput(value)) setValue('');
    setWait(false);
  }

  return (

    <form onSubmit={ handleSubmit } className={ "w-full max-w-lg mx-auto m-3 p-2 rounded-sm" + (error ? ' bg-red-300' : '') }>
      
      <div className='relative'>

        <input
          id="nome"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="New Item"
          className="w-full border border-gray-400 bg-white rounded-sm p-4 text-gray-800 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
          disabled={ wait }
        />

        <button
          type='submit'
          title="Send"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer transition disabled:bg-gray-300 disabled:cursor-default"
          disabled={ !value || wait }
        >
          <FaPaperPlane size={16} />
        </button>
        
      </div>

      { error && (
        <div className='m-1 text-sm text-red-950'>
          { error }
        </div>
      ) }

    </form>

  );
}
