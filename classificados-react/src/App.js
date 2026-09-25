import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from './assets/jornal.png';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

function App() {

  const baseUrl = `${process.env.REACT_APP_API_URL}/classificados`;

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);

  const [classificadoSelecionado, setClassificadoSelecionado] = useState({
    id: '',
    titulo: '',
    descricao: '',
    dataCadastro: ''
  })

  const abrirFecharModalIncluir = ()=>{
    setModalIncluir(!modalIncluir)
  }

  const handleChange = e=>{
    const {name, value} = e.target;
    setClassificadoSelecionado({
      ...classificadoSelecionado, [name]:value
    })
  }

  const pedidoGet = async () => {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          page: 1,
          pageSize: 20
        }
      });

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const pedidoPost = async () => {
    try {
      const payload = {
        titulo: classificadoSelecionado.titulo,
        descricao: classificadoSelecionado.descricao
      };

      const response = await axios.post(baseUrl, payload);

      setData(current => [...current, response.data]);

      abrirFecharModalIncluir();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    pedidoGet();
  }, [])

  return (
    <div className="App"> 
      <br/>
      <h3>Classificados</h3>
      <header>
      <img src={logo} alt='Classificados' className='imagem'/>
        <Button className="btn btn-success" onClick={()=>abrirFecharModalIncluir()}>+ Novo Classificado</Button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Título</th>
            <th>Data de Publicação</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
            {data.map(classificado=>(
              <tr key={classificado.id}>
                <td>{classificado.titulo}</td>
                <td>{new Date(classificado.dataCadastro).toLocaleString(
                  'pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>{/* Formata a data */}
                <td>{classificado.descricao}</td> 
              </tr>
            ))}
        </tbody>
      </table>
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Publicar Classificado</ModalHeader>
        <ModalBody>
          <div className='form-group'>
          <label>Título</label>
          <br/>
          <input type='text' className='form-control' name='titulo' required onChange={handleChange}/>
          <br/>
          <label>Descrição</label>
          <br/>
          <textarea className='form-control' name='descricao' required onChange={handleChange}/>
          <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPost()}>Confirmar</button>{''}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
