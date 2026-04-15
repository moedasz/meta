import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Servicos } from "./pages/Servicos";
import { ServicoDetail } from "./pages/ServicoDetail";
import { ComoFunciona } from "./pages/ComoFunciona";
import { Sobre } from "./pages/Sobre";
import { Contato } from "./pages/Contato";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { AnalyticsTracker } from "./components/AnalyticsTracker";

export default function App() {
    return (
        <BrowserRouter>
            <AnalyticsTracker />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicos" element={<Servicos />} />
                    <Route path="/servicos/:slug" element={<ServicoDetail />} />
                    <Route path="/como-funciona" element={<ComoFunciona />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
