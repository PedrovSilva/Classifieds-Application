import api from './authApi';

export async function getClassificados(page = 1, pageSize = 20) {
    const response = await api.get('/classificados', {
        params: {
            page,
            pageSize,
        },
    });

    return response.data;
}

export async function getClassificado(id) {
    const response = await api.get(`/classificados/${id}`);

    return response.data;
}

export async function createClassificado(classificado) {
    const response = await api.post('/classificados', {
        titulo: classificado.titulo,
        descricao: classificado.descricao,
    });

    return response.data;
}

export async function updateClassificado(id, classificado) {
    const response = await api.put(`/classificados/${id}`, {
        titulo: classificado.titulo,
        descricao: classificado.descricao,
    });

    return response.data;
}

export async function deleteClassificado(id) {
    await api.delete(`/classificados/${id}`);
}
