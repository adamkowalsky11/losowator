import './App.css';
import { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

function App() {

  const [listItems, setListItems] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(true);

  const save = (e) => {
    e.preventDefault();

    if(name === ''){
      setError('Enter name')
    }
    else{
    listItems.push(name);
    setName('');
    setError('');
    }

  }

  const reset = (e) => {
    e.preventDefault();

    setListItems([]);
    setWinner('');
    setError('');

  }

  const win = (e) => {
    e.preventDefault();

    if(listItems[0] === undefined){
      setError("List is empty, please add some people");
    }
    else{
    var winn = listItems[Math.floor(Math.random()*listItems.length)];
    setWinner(winn);

    setLoading(false);
    sleep((Math.random()*501) + 500).then(() => { setLoading(true); });
    }
  }

  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div className='container pt-5 pb-5 my-5 border col-md-6 bg-light'>

      <link href='https://fonts.googleapis.com/css?family=Berkshire Swash' rel='stylesheet'></link>
      <h2 className='text-center mb-5' style={{"font-weight": "bold", "font-family": "Berkshire Swash", "font-size": "32px"}}> LOSOWATOR </h2>

      {
        error && <ReactBootStrap.Alert variant='danger' className='text-center'>{error}</ReactBootStrap.Alert>
      }  

      <input 
      type='text'
      placeholder='Add name'
      name='name'
      className='form-control'
      value={name}
      required
      onChange={(e => setName(e.target.value))}
      >
      </input>

      <div className='text-center'>
        <button className='btn btn-primary mt-3 mx-2' onClick={(e) => save(e)}> Add </button>
        <button className='btn btn-danger mt-3 mx-2' onClick={(e) => reset(e)}> Reset </button>
        <button className='btn btn-success mt-3 mx-2' onClick={(e) => win(e)}> Check winner! </button>
      </div>

    <table className='table table-bordered mt-4 text-center' style={{"table-layout":"fixed", "width": "100%"}}>
      <thead style={{"background-color": '#A9A9A9', fontWeight: "bolder"}}>
        <tr>
          <td> Players </td>
        </tr>
      </thead>
      <tbody>
      {
        listItems.map((item, b) =>
        <tr key={b}>
          <td>{item}</td>
        </tr>
        )
      }
      </tbody>
    </table>

    { loading ?
    <div className='text-center'>
      
    {
      winner !== '' ? 'And the winner is... ' + winner + '!' : ''
    }

    </div>
    : 
      <div className='d-flex justify-content-center'>
        <ReactBootStrap.Spinner animation='border'/>
      </div>
    }

    </div>
  );
}

export default App;
