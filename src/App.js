import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RutaNoValida } from './components/RutaNoValida';
import { Index as Alta } from './components/ALTA/Index';
import { Index as Inicio } from './components/INICIO/Index';
import { Index as Contacto } from './components/CONTACTO/Index';
import { Index as Nosotros } from './components/NOSOTROS/Index';
import { Index as Carrito } from './components/CARRITO/Index';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Navbar />


        <Routes>

          <Route index element={<Inicio />} />

          <Route path="alta" element={<Alta />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />


          <Route path="*" element={<RutaNoValida />} />

        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
