import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Users,
  Settings,
  Bell,
  TrendingUp,
  Package,
  Receipt,
  Smartphone,
  X,
  Menu
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  // Estado para controlar o Modal
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRequest, setSelectedRequest] = useState(null);
const [menuOpen, setMenuOpen] = useState(false);

  const incomingRequests = [
    { id: 'REQ-2099', produtor: 'Fazenda Boa Vista', item: 'Adubo NPK 10-10-10', volume: '100 Sacas', status: 'Nova Demanda' },
    { id: 'REQ-2098', produtor: 'Laticínio Belo Vale LTDA', item: 'Embalagens Plásticas 500g', volume: '5.000 un', status: 'Aguardando NF-e' },
    { id: 'REQ-2097', produtor: 'Sítio São José', item: 'Semente de Milho Híbrido', volume: '20 Sacas', status: 'Proposta Enviada' },
  ];

  // Função para abrir o Modal com os dados da linha clicada
  const handleOpenModal = (req) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  // Função para simular o envio
  const handleSendProposal = (e) => {
    e.preventDefault();
    alert(`Proposta enviada com sucesso para ${selectedRequest.produtor}! O produtor receberá uma notificação no app.`);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* SIDEBAR */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        {menuOpen && (
        <div
            className="sidebar-overlay"
             onClick={() => setMenuOpen(false)}
            />
)}
        <div className="sidebar-header">
          <div className="brand-title">
            <TrendingUp size={28} className="brand-highlight" />
            Safra<span className="brand-highlight">Link</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-link active"><LayoutDashboard size={20} /> Painel Geral</div>
          <div className="nav-link"><ShoppingCart size={20} /> Mural de Demandas</div>
          <div className="nav-link"><Package size={20} /> Meu Catálogo</div>
          <div className="nav-link"><Receipt size={20} /> Notas Fiscais (NF-e)</div>
          <div className="nav-link"><Users size={20} /> Clientes / Produtores</div>
          <div className="nav-link"><Settings size={20} /> Configurações</div>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">MT</div>
            <div className="user-info">
              <h4>Mercantil Tontonho</h4>
              <p>Perfil: Comercial / Atacadista</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        <header className="topbar">

  <button
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <X size={26}/> : <Menu size={26}/>}
  </button>

  <h2 className="page-title">
    Visão Geral da OperaçãoF
  </h2>
          <div className="topbar-actions">
            <button 
              onClick={() => navigate('/')} 
              className="action-btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}
            >
              <Smartphone size={18} />
              Ver App Mobile
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <Bell size={24} color="var(--slate-600)" />
              <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--emerald-500)', width: 10, height: 10, borderRadius: '50%' }}></span>
            </button>
          </div>
        </header>

        <div className="content-body">
          {/* KPIs */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon"><ShoppingCart size={28} /></div>
              <div className="kpi-info"><h3>Novas Demandas</h3><p>124</p></div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon"><FileText size={28} /></div>
              <div className="kpi-info"><h3>Negócios Fechados</h3><p>87</p></div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon"><TrendingUp size={28} /></div>
              <div className="kpi-info"><h3>Faturamento Estimado</h3><p>R$ 142.500</p></div>
            </div>
          </div>

          {/* TABELA */}
          <div className="table-container">
            <div className="table-header">
              <h3>Mural de Demandas (Tempo Real)</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Produtor / Solicitante</th>
                  <th>Insumo Requisitado</th>
                  <th>Volume</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {incomingRequests.map((req) => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 700 }}>{req.id}</td>
                    <td>{req.produtor}</td>
                    <td>{req.item}</td>
                    <td>{req.volume}</td>
                    <td>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700,
                        backgroundColor: req.status === 'Nova Demanda' ? '#fef3c7' : 'var(--slate-100)',
                        color: req.status === 'Nova Demanda' ? '#d97706' : 'var(--slate-600)'
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {/* O botão agora aciona a função de abrir o Modal */}
                      <button 
                        className="action-btn" 
                        onClick={() => handleOpenModal(req)}
                        style={{ background: req.status === 'Nova Demanda' ? 'var(--emerald-600)' : 'var(--slate-100)', color: req.status === 'Nova Demanda' ? 'white' : 'var(--slate-700)' }}
                      >
                        {req.status === 'Nova Demanda' ? 'Responder' : 'Detalhes'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ================= RENDERIZAÇÃO DO MODAL ================= */}
      {isModalOpen && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Elaborar Proposta Comercial</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSendProposal}>
              <div className="modal-body">
                <div className="demand-details">
                  <p><strong>Solicitante:</strong> {selectedRequest.produtor}</p>
                  <p><strong>Item:</strong> {selectedRequest.item}</p>
                  <p><strong>Volume Solicitado:</strong> {selectedRequest.volume}</p>
                </div>

                <div className="input-group">
                  <label>Preço Unitário Ofertado (R$)</label>
                  <input type="number" placeholder="Ex: 140,00" required />
                </div>
                
                <div className="input-group">
                  <label>Prazo e Condições de Entrega</label>
                  <textarea rows="3" placeholder="Ex: Temos em estoque. Entrega em 2 dias úteis via transportadora parceira." required></textarea>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-send">Enviar para Aprovação</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}