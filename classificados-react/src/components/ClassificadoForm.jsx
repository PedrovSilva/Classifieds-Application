import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'reactstrap';

const initialForm = {
    titulo: '',
    descricao: '',
};

export default function ClassificadoForm({
    isOpen,
    onClose,
    onSubmit,
    classificado = null,
}) {
    const [form, setForm] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditing = Boolean(classificado);

    useEffect(() => {
        if (classificado) {
            setForm({
                titulo: classificado.titulo ?? '',
                descricao: classificado.descricao ?? '',
            });
        } else {
            setForm(initialForm);
        }
    }, [classificado, isOpen]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const titulo = form.titulo.trim();
        const descricao = form.descricao.trim();

        if (titulo.length < 3 || titulo.length > 80) {
            return;
        }

        if (descricao.length < 3 || descricao.length > 2500) {
            return;
        }

        try {
            setIsSubmitting(true);

            await onSubmit({
                titulo,
                descricao,
            });

            setForm(initialForm);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) {
            return;
        }

        setForm(initialForm);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} toggle={handleClose}>
            <Form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        {isEditing
                            ? 'Editar Classificado'
                            : 'Novo Classificado'}
                    </h5>

                    <button
                        type="button"
                        className="btn-close"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="modal-body">
                    <div className="mb-3">
                        <label
                            htmlFor="titulo"
                            className="form-label"
                        >
                            Título
                        </label>

                        <input
                            id="titulo"
                            name="titulo"
                            type="text"
                            className="form-control"
                            value={form.titulo}
                            onChange={handleChange}
                            minLength={3}
                            maxLength={80}
                            required
                        />

                        <small className="text-muted">
                            {form.titulo.length}/80
                        </small>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="descricao"
                            className="form-label"
                        >
                            Descrição
                        </label>

                        <textarea
                            id="descricao"
                            name="descricao"
                            className="form-control"
                            rows="5"
                            value={form.descricao}
                            onChange={handleChange}
                            minLength={3}
                            maxLength={2500}
                            required
                        />

                        <small className="text-muted">
                            {form.descricao.length}/2500
                        </small>
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
                        color="success"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Salvando...'
                            : isEditing
                                ? 'Salvar alterações'
                                : 'Criar'}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}