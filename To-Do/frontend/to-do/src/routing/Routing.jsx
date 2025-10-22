import {createBrowserRouter} from "react-router-dom";
import Home from "../components/views/home/Home";
import CriarTarefa from "../components/views/criar/Criar";
import AtualizarTarefa from "../components/views/atualizar/Atualizar";
import RemoverTarefa from "../components/views/remover/Remover";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/> 
    },
    {
        path: "/criar",
        element: <CriarTarefa/>
    },
    {
        path: "/atualizar/:id",
        element: <AtualizarTarefa/>
    },
    {
        path: "/remover/:id",
        element: <RemoverTarefa/>
    }
]);

export default router;