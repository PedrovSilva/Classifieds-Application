import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import {
    Alert,
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
    Spinner,
} from 'reactstrap';

import logo from './assets/jornal.png';

import AuthModal from './components/AuthModal';
import ClassificadoForm from './components/ClassificadoForm';
import ClassificadoTable from './components/ClassificadoTable';

import {
    clearStoredAuth,
    getStoredAuth,
    login,
    register,
    storeAuth,
} from './services/authApi';

import {
    getClassificados,
    createClassificado,
    updateClassificado,
    deleteClassificado,
} from './services/classificadosApi';

import type { AuthMode, AuthSubmitPayload, AuthUser } from './types/auth';
import type { Classificado, ClassificadoInput } from './types/classificado';

const PAGE_SIZE = 10;

export default function App() {
    const [classificados, setClassificados] = useState<Classificado[]>([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [selectedClassificado, setSelectedClassificado] =
        useState<Classificado | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>('login');
    const [auth, setAuth] = useState<AuthUser | null>(() => getStoredAuth());

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = Boolean(auth?.token);

    const fetchClassificados = useCallback(async (currentPage: number) => {
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
        } catch (fetchError) {
            console.error(fetchError);

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

    const requireAuth = (): boolean => {
        if (isAuthenticated) {
            return true;
        }

        setAuthMode('login');
        setIsAuthOpen(true);
        return false;
    };

    const handleOpenCreate = () => {
        if (!requireAuth()) {
            return;
        }

        setSelectedClassificado(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (classificado: Classificado) => {
        if (!requireAuth()) {
            return;
        }

        setSelectedClassificado(classificado);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedClassificado(null);
    };

    const handleSubmit = async (classificado: ClassificadoInput) => {
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
        } catch (submitError: unknown) {
            console.error(submitError);

            if (axios.isAxiosError(submitError) && submitError.response?.status === 401) {
                clearStoredAuth();
                setAuth(null);
                setAuthMode('login');
                setIsAuthOpen(true);
                setError('Sessão expirada. Faça login novamente.');
                return;
            }

            setError(
                selectedClassificado
                    ? 'Não foi possível atualizar o classificado.'
                    : 'Não foi possível criar o classificado.'
            );

            throw submitError;
        }
    };

    const handleDelete = async (classificado: Classificado) => {
        if (!requireAuth()) {
            return;
        }

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
        } catch (deleteError: unknown) {
            console.error(deleteError);

            if (axios.isAxiosError(deleteError) && deleteError.response?.status === 401) {
                clearStoredAuth();
                setAuth(null);
                setAuthMode('login');
                setIsAuthOpen(true);
                setError('Sessão expirada. Faça login novamente.');
                return;
            }

            setError(
                'Não foi possível excluir o classificado.'
            );
        }
    };

    const handleAuthSubmit = async ({
        mode,
        nome,
        email,
        password,
    }: AuthSubmitPayload) => {
        const result =
            mode === 'login'
                ? await login({ email, password })
                : await register({ nome, email, password });

        const nextAuth: AuthUser = {
            id: result.id,
            nome: result.nome,
            email: result.email,
            token: result.token,
            expiresAt: result.expiresAt,
        };

        storeAuth(nextAuth);
        setAuth(nextAuth);
        setIsAuthOpen(false);
        setError(null);
    };

    const handleLogout = () => {
        clearStoredAuth();
        setAuth(null);
        setIsFormOpen(false);
        setSelectedClassificado(null);
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

                <div className="d-flex gap-2 align-items-center">
                    {isAuthenticated ? (
                        <>
                            <small className="text-muted">
                                Olá, {auth?.nome}
                            </small>

                            <Button
                                color="outline-secondary"
                                size="sm"
                                onClick={handleLogout}
                            >
                                Sair
                            </Button>

                            <Button
                                color="success"
                                onClick={handleOpenCreate}
                            >
                                + Novo Classificado
                            </Button>
                        </>
                    ) : (
                        <Button
                            color="primary"
                            onClick={() => {
                                setAuthMode('login');
                                setIsAuthOpen(true);
                            }}
                        >
                            Entrar
                        </Button>
                    )}
                </div>
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
                        canManage={isAuthenticated}
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

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onSubmit={handleAuthSubmit}
                mode={authMode}
                onModeChange={setAuthMode}
            />
        </div>
    );
}
