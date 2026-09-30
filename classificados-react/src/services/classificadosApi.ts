import api from './authApi';
import type {
    Classificado,
    ClassificadoInput,
    PagedResult,
} from '../types/classificado';

export async function getClassificados(
    page = 1,
    pageSize = 20
): Promise<PagedResult<Classificado>> {
    const response = await api.get<PagedResult<Classificado>>(
        '/classificados',
        {
            params: {
                page,
                pageSize,
            },
        }
    );

    return response.data;
}

export async function getClassificado(id: number): Promise<Classificado> {
    const response = await api.get<Classificado>(`/classificados/${id}`);

    return response.data;
}

export async function createClassificado(
    classificado: ClassificadoInput
): Promise<Classificado> {
    const response = await api.post<Classificado>('/classificados', {
        titulo: classificado.titulo,
        descricao: classificado.descricao,
    });

    return response.data;
}

export async function updateClassificado(
    id: number,
    classificado: ClassificadoInput
): Promise<Classificado> {
    const response = await api.put<Classificado>(`/classificados/${id}`, {
        titulo: classificado.titulo,
        descricao: classificado.descricao,
    });

    return response.data;
}

export async function deleteClassificado(id: number): Promise<void> {
    await api.delete(`/classificados/${id}`);
}
