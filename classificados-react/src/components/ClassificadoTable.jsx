import React from 'react';
import { Button, Table } from 'reactstrap';

function formatarData(dataString) {
    if (!dataString) {
        return '-';
    }

    const data = new Date(dataString);

    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function ClassificadoTable({
    classificados,
    onEdit,
    onDelete,
}) {
    return (
        <div className="table-responsive mt-4">
            <Table
                striped
                bordered
                hover
                responsive
                className="align-middle"
            >
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Data de cadastro</th>
                        <th style={{ width: '180px' }}>
                            Ações
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {classificados.map((classificado) => (
                        <tr key={classificado.id}>
                            <td>
                                <strong>
                                    {classificado.titulo}
                                </strong>
                            </td>

                            <td>
                                {classificado.descricao}
                            </td>

                            <td>
                                {formatarData(
                                    classificado.dataCadastro
                                )}
                            </td>

                            <td>
                                <div className="d-flex gap-2">
                                    <Button
                                        color="primary"
                                        size="sm"
                                        onClick={() =>
                                            onEdit(classificado)
                                        }
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() =>
                                            onDelete(classificado)
                                        }
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}