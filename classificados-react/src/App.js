import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Alert,
    Button,
    Spinner,
} from 'reactstrap';

import logo from './assets/jornal.png';

import ClassificadoForm from './components/ClassificadoForm';
import ClassificadoTable from './components/ClassificadoTable';

import {
    getClassificados,
    createClassificado,
    updateClassificado,
    deleteClassificado,
} from './services/classificadosApi';

export default function App() {
    const [classificados, setClassificados] = useState([]);

    const [selectedClassificado, setSelectedClassificado] =
        useState(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClassificados = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getClassificados(1, 20);

            setClassificados(data);
        } catch (error) {
            console.error(error);

            setError(
                'Não foi possível carregar os classificados.'
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClassificados();
    }, [fetchClassificados]);

    const handleOpenCreate = () => {
        setSelectedClassificado(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (classificado) => {
        setSelectedClassificado(classificado);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedClassificado(null);
    };

    const handleSubmit = async (classificado) => {
        try {
            setError(null);

            if (selectedClassificado) {
                await updateClassificado(
                    selectedClassificado.id,
                    classificado
                );
            } else {
                await createClassificado(classificado);
            }

            await fetchClassificados();

            handleCloseForm();
        } catch (error) {
            console.error(error);

            setError(
                selectedClassificado
                    ? 'Não foi possível atualizar o classificado.'
                    : 'Não foi possível criar o classificado.'
            );

            throw error;
        }
    };

    const handleDelete = async (classificado) => {
        const confirmed = window.confirm(
            `Deseja realmente excluir "${classificado.titulo}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError(null);

            await deleteClassificado(classificado.id);

            setClassificados((current) =>
                current.filter(
                    (item) => item.id !== classificado.id
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                'Não foi possível excluir o classificado.'
            );
        }
    };

    return (
        <div className="App">
            <h3>Classificados</h3>

            <header>
                <img
                    src={logo}
                    alt="Classificados"
                    className="imagem"
                />

                <Button
                    color="success"
                    onClick={handleOpenCreate}
                >
                    + Novo Classificado
                </Button>
            </header>

            {error && (
                <Alert
                    color="danger"
                    className="mt-3"
                    toggle={() => setError(null)}
                >
                    {error}
                </Alert>
            )}

            {loading ? (
                <div className="text-center mt-4">
                    <Spinner />

                    <p className="mt-2">
                        Carregando classificados...
                    </p>
                </div>
            ) : classificados.length === 0 ? (
                <Alert color="info" className="mt-4">
                    Nenhum classificado encontrado.
                </Alert>
            ) : (
                <ClassificadoTable
                    classificados={classificados}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                />
            )}

            <ClassificadoForm
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                onSubmit={handleSubmit}
                classificado={selectedClassificado}
            />
        </div>
    );
}