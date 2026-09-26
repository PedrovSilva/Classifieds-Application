import { useState } from 'react';
import {Form, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


export default function ClassificadoForm({ isOpen, onClose, OnSubmit }) {
    const [titulo, setTitulo] = useState('');   
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await OnSubmit({ titulo, descricao });

        setTitulo('');
        setDescricao('');
    };

    return (
        <Modal isOpen={isOpen}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader>Publicar Classificado</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="titulo">Titulo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            className="form-control"
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary">
                        Publicar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancelar
                    </button>
                </ModalFooter>
                </Form>
        </Modal>
    );
}