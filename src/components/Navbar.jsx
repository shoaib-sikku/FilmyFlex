import { useContext } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import { Appstate } from '../App'

const Navbar = () => {
  const useAppstate = useContext(Appstate);
  return (
    <>
      <nav className='stack'>
        <Link to={'/'}><h1>FILMYFLEX</h1></Link>
        <div>
          {useAppstate.login ?
            <Link to={'/addmovie'}><Button variant="text" style={{ color: 'white' }} startIcon={<AddIcon style={{ color: 'rgb(82, 5, 5)' }} />}>ADD NEW</Button></Link>
            :
            <>
              <Link to={'/login'}><Button variant="contained" color='success'>Login</Button></Link>
              <Link to={'/signup'}><Button variant="contained">Signup</Button></Link>
            </>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar
