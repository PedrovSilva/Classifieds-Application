import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Nav, NavItem, NavLink } from 'reactstrap';

const initialForm = {
    nome: '',
    email: '',
    password: '',
};

export default function AuthModal({
    isOpen,
    onClose,
    onSubmit,
    mode = 'login',
    onModeChange,
}) {
    const [form, setForm] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const isLogin = mode === 'login';

    useEffect(() => {
        if (isOpen) {
            setForm(initialForm);
            setError(null);
            setIsSubmitting(false);
        }
    }, [isOpen, mode]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const email = form.email.trim();
        const password = form.password;
        const nome = form.nome.trim();

        if (!email || password.length < 6) {
            setError('Informe e-mail e senha com pelo menos 6 caracteres.');
            return;
        }

        if (!isLogin && nome.length < 2) {
            setError('Informe um nome com pelo menos 2 caracteres.');
            return;
        }

        try {
            setIsSubmitting(true);

            await onSubmit({
                mode,
                nome,
                email,
                password,
            });

            setForm(initialForm);
        } catch (submitError) {
            const message =
                submitError?.response?.data ||
                (isLogin
                    ? 'Não foi possível entrar.'
                    : 'Não foi possível criar a conta.');

            setError(
                typeof message === 'string'
                    ? message
                    : 'Não foi possível concluir a autenticação.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) {
            return;
        }

        setForm(initialForm);
        setError(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} toggle={handleClose}>
            <Form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        {isLogin ? 'Entrar' : 'Criar conta'}
                    </h5>

                    <button
                        type="button"
                        className="btn-close"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="modal-body">
                    <Nav pills className="mb-3">
                        <NavItem>
                            <NavLink
                                href="#"
                                active={isLogin}
                                onClick={(event) => {
                                    event.preventDefault();
                                    onModeChange('login');
                                }}
                            >
                                Entrar
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                href="#"
                                active={!isLogin}
                                onClick={(event) => {
                                    event.preventDefault();
                                    onModeChange('register');
                                }}
                            >
                                Criar conta
                            </NavLink>
                        </NavItem>
                    </Nav>

                    {error && (
                        <Alert color="danger" className="py-2">
                            {error}
                        </Alert>
                    )}

                    {!isLogin && (
                        <div className="mb-3">
                            <label
                                htmlFor="nome"
                                className="form-label"
                            >
                                Nome
                            </label>

                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                className="form-control"
                                value={form.nome}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={100}
                                required
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            E-mail
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Senha
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            minLength={6}
                            maxLength={100}
                            required
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <Button
                        type="button"
                        color="secondary"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Aguarde...'
                            : isLogin
                                ? 'Entrar'
                                : 'Criar conta'}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
