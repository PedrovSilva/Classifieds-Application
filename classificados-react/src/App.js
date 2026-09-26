import './App.css';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'reactstrap';

import logo from './assets/jornal.png';

import ClassificadoForm from './components/ClassificadoForm';
import ClassificadoTable from './components/ClassificadoTable';

import {
    getClassificados,
    createClassificado
} from './services/classificadosApi';

export default function App() {
    const [classificados, setClassificados] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchClassificados();
    }, []);

    const fetchClassificados = async () => {
        try {
            const data = await getClassificados(1, 20);
            setClassificados(data);
        } catch (error) {
            console.error('Erro ao carregar classificados:', error);
        }
    };

    const handleCreateClassificado = async (classificado) => {
        try {
            await createClassificado(classificado);
            await fetchClassificados();
            setIsFormOpen(false);
        } catch (error) {
            console.error('Erro ao criar classificado:', error);
        }
    };

    return (
        <div className="App">
            <br />

            <h3>Classificados</h3>

            <header>
                <img
                    src={logo}
                    alt="Classificados"
                    className="imagem"
                />

                <Button
                    color="success"
                    onClick={() => setIsFormOpen(true)}
                >
                    + Novo Classificado
                </Button>
            </header>

            <ClassificadoTable
                classificados={classificados}
            />

            <ClassificadoForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleCreateClassificado}
            />
        </div>
    );
}
