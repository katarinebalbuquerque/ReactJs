import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/views/home/Home';
import Detalhar from '../components/views/detalhar/Detalhar';
import Cadastrar from '../components/views/cadastrar/Cadastrar';
import Excluir from '../components/views/excluir/Excluir';
import Atualizar from '../components/views/atualizar/Atualizar';

const Routing = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/detalhes/:id' element={<Detalhar/>} />
                <Route path='/cadastrar' element={<Cadastrar/>}/>
                <Route path='/excluir/:id' element={<Excluir/>} />
                <Route path='/atualizar/:id' element={<Atualizar/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;