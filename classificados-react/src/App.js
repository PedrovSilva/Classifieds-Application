import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Alert,
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
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

const PAGE_SIZE = 10;

export default function App() {
    const [classificados, setClassificados] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [selectedClassificado, setSelectedClassificado] =
        useState(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClassificados = useCallback(async (currentPage) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getClassificados(
                currentPage,
                PAGE_SIZE
            );

            setClassificados(data.items);
            setPage(data.page);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
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
        fetchClassificados(page);
    }, [page, fetchClassificados]);

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

            await fetchClassificados(page);

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

            if (
                classificados.length === 1 &&
                page > 1
            ) {
                setPage((current) => current - 1);
                return;
            }

            await fetchClassificados(page);
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
                <>
                    <ClassificadoTable
                        classificados={classificados}
                        onEdit={handleOpenEdit}
                        onDelete={handleDelete}
                    />

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <small className="text-muted">
                            {totalItems} classificado
                            {totalItems !== 1 ? 's' : ''}
                        </small>

                        {totalPages > 1 && (
                            <Pagination className="mb-0">
                                <PaginationItem
                                    disabled={page === 1}
                                >
                                    <PaginationLink
                                        previous
                                        onClick={() =>
                                            setPage(
                                                (current) =>
                                                    current - 1
                                            )
                                        }
                                    />
                                </PaginationItem>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((pageNumber) => (
                                    <PaginationItem
                                        key={pageNumber}
                                        active={
                                            pageNumber === page
                                        }
                                    >
                                        <PaginationLink
                                            onClick={() =>
                                                setPage(
                                                    pageNumber
                                                )
                                            }
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem
                                    disabled={
                                        page === totalPages
                                    }
                                >
                                    <PaginationLink
                                        next
                                        onClick={() =>
                                            setPage(
                                                (current) =>
                                                    current + 1
                                            )
                                        }
                                    />
                                </PaginationItem>
                            </Pagination>
                        )}
                    </div>
                </>
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