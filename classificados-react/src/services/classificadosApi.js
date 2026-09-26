import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/classificados`;

export const getClassificados = async (page = 1, pageSize = 10) => {
    const response = await axios.get(
        `${baseUrl}?page=${page}&pageSize=${pageSize}`
    );

    return response.data;
};

export async function createClassificado(classificado) {
    const response = await axios.post(
        baseUrl,
        {
            titulo: classificado.titulo,
            descricao: classificado.descricao
        }
    );

    return response.data;
}