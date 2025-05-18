import React from 'react';
import PropTypes from 'prop-types';

const FinalizarCompraModal = ({ onClose }) => {
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1070 }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Finalizar Compra</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Dados do cliente */}
            <div className="card mb-3">
              <div className="card-body">
                <h6 className="card-title">Dados do Cliente</h6>
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input type="text" className="form-control" placeholder="Digite seu nome" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Telefone / WhatsApp</label>
                  <input type="tel" className="form-control" placeholder="(XX) XXXXX-XXXX" />
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div className="card mb-3">
              <div className="card-body">
                <h6 className="card-title">Pagamento</h6>
                <div className="mb-3">
                  <label className="form-label">Forma de Pagamento</label>
                  <select className="form-select">
                    <option value="pix">PIX</option>
                    <option value="credito">Cartão de Crédito</option>
                    <option value="debito">Cartão de Débito</option>
                    <option value="dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CPF e Observação */}
            <div className="card mb-3">
              <div className="card-body">
                <h6 className="card-title">Informações Fiscais e Observações</h6>
                <div className="mb-3">
                  <label className="form-label">CPF</label>
                  <input type="text" className="form-control" placeholder="Digite seu CPF (opcional)" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Observações</label>
                  <textarea className="form-control" rows="3" placeholder="Ex: Retirar na portaria..."></textarea>
                </div>
              </div>
            </div>

            {/* Acesso / Conta */}
            <div className="text-center mt-3">
              <p className="mb-1">Possui uma conta ou deseja criar uma?</p>
              <a href="#" className="text-decoration-underline fw-bold">Entrar / Criar Conta</a>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary">Confirmar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
};

FinalizarCompraModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default FinalizarCompraModal;
