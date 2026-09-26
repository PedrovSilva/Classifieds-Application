function ClassificadoTable({ classificados }) {
    function formatarDataAspNet(dataString) {
  if (!dataString) return "";


  const data = new Date(dataString);

  if (isNaN(data.getTime())) return "Data inválida";

  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

    return (
    <table className="table table-bordered"> 
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Data de Publicação</th>
                <th>Descrição</th>
            </tr>
        </thead>

        <tbody>
            {classificados.map((classificado) => (
                <tr key={classificado.id}>
                    <td>{classificado.titulo}</td>
                    <td>{
                        formatarDataAspNet(classificado.dataCadastro)
                    }</td>
                    <td>{classificado.descricao}</td>
                </tr>
            ))}
        </tbody>
    </table>
    );
}

export default ClassificadoTable;