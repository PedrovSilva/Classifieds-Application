import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/classificados`;

export async function getClassificados(page = 1, pageSize = 20) {
    const response = await axios.get(baseUrl, {
        params: {
            page,
            pageSize,
        },
    });

    return response.data;
}

export async function getClassificado(id) {
    const response = await axios.get(`${baseUrl}/${id}`);

    return response.data;
}

export async function createClassificado(classificado) {
    const response = await axios.post(baseUrl, {
        titulo: classificado.titulo,
        descricao: classificado.descricao,
    });

    return response.data;
}

export async function updateClassificado(id, classificado) {
    const response = await axios.put(`${baseUrl}/${id}`, {
        titulo: classificado.titulo,
        descricao: classificado.descricao,
    });

    return response.data;
}

export async function deleteClassificado(id) {
    await axios.delete(`${baseUrl}/${id}`);
}