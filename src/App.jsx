import { useState, useCallback,useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*()"
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); 
    }

    setPassword(pass);
  }, [length, number, character, setPassword])

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passGen();
  }, [length, number, character, passGen])
  
  return (
    <>
      <div className="w-full h-screen bg-black flex items-center justify-center flex-col ">
        <h1 className='text-center text-white text-5xl'>Password Generator</h1>
        <div className="w-1/2 h-40 bg-gray-900 mt-10 rounded-2xl p-10">
          <div className='tet mb-6'>
            <input
             type="text"
             value={password}
             placeholder='Password'
             readOnly
             ref={passwordRef}
             className='w-4/5 rounded-sm h-12 p-2 text-xl' />
            <button onClick={copyPass} className='bg-blue-500 rounded-sm w-16 h-12 text-white'>Copy</button>
          </div>
          <div className="flex">
            <input type="range" 
              min={8}
              max={20}
              className='mr-2'
              onChange={(e) => {setLength(e.target.value)}}/>
            <p className='text-orange-400 text-xl mr-5'>Length: ({length})</p>
              
            <input type="checkbox" 
              className='mr-2' 
              defaultChecked={number}
              id='numberInput'
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            
            <p className='text-orange-400 text-xl mr-5'>Numbers</p>
            <input type="checkbox" 
              className='mr-2'
              defaultChecked={character}
              id='charInput'
              onChange={() => {
                setCharacter((prev => !prev))
              }}
              />
            <p className='text-orange-400 text-xl'>Characters</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
