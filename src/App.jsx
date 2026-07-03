import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { 
  Search, Bell, MapPin, Sprout, 
  Stethoscope, Wheat, Home, ClipboardList, 
  MessageSquare, User, ChevronRight, Star, Plus, Calendar, ArrowLeft, Monitor, Send, CheckCircle2, X
} from 'lucide-react';

export default function App() {
  const navigate = useNavigate();
  
  // Controle de Telas Principais e Modais
  const [currentView, setCurrentView] = useState('home'); // 'home', 'pedidos', 'nova_demanda', 'mensagens'
  const [activeChat, setActiveChat] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null); // <-- Novo Modal de Produto/Anúncio
  
  // Controle de Abas
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [activeTab, setActiveTab] = useState('Em Negociação');
  
  const filters = ['Todos', 'Insumos', 'Serviços', 'Commodities', 'Maquinário'];
  const tabs = ['Abertas', 'Em Negociação', 'Concluídas'];

  // ================= DADOS SIMULADOS ENRIQUECIDOS =================
  const feedData = [
    { 
      id: 1, 
      title: 'AgroBoi Soluções', 
      subtitle: 'Sementes, Fertilizantes e Defensivos', 
      rating: '4.8', 
      distance: '12 km', 
      icon: <Sprout size={24} color="var(--emerald-600)" />,
      description: 'Líder regional na distribuição de insumos de alta performance. Oferecemos as melhores marcas de adubos NPK e sementes certificadas com pronta entrega para sua fazenda.',
      products: ['Adubo NPK 10-10-10', 'Semente de Milho Híbrido', 'Fungicida Premium']
    },
    { 
      id: 2, 
      title: 'Dr. Carlos MedVet', 
      subtitle: 'Especialista em Grandes Animais', 
      rating: '5.0', 
      distance: 'Atende na fazenda', 
      icon: <Stethoscope size={24} color="var(--emerald-600)" />,
      description: 'Atendimento médico veterinário especializado em gado de corte e leite. Serviços de reprodução, ultrassonografia, inseminação em tempo fixo (IATF) e cirurgias de campo.',
      products: ['Manejo Reprodutivo', 'Ultrassom Bovino', 'Consultoria Sanitária']
    }
  ];

  const requestsData = [
    { id: 'REQ-1042', title: '50 Sacas de Adubo NPK', date: '02 Jul 2026', status: 'Em Negociação', badgeClass: 'status-negociacao' },
    { id: 'REQ-1041', title: 'Visita Técnica (Bovinos)', date: '30 Jun 2026', status: 'Abertas', badgeClass: 'status-aberta' },
  ];

  const chatsData = [
    { id: 1, name: 'Mercantil Tontonho', initials: 'MT', lastMessage: 'Nova proposta comercial recebida.', time: 'Agora', unread: 1 },
    { id: 2, name: 'Cerealista Safra Ouro', initials: 'CS', lastMessage: 'A cotação do milho subiu hoje.', time: 'Ontem', unread: 0 },
  ];

  // ================= RENDERIZAÇÃO =================
  return (
    <div className="page-wrapper">
      <div className="mobile-container">
        
        {/* === HEADER GLOBAL === */}
        {currentView !== 'nova_demanda' && (
          <header className="app-header">
            <div className="header-top" style={{ alignItems: 'flex-start' }}>
              <div>
                <h1 className="greeting-title">
                  {currentView === 'mensagens' ? 'Mensagens' : currentView === 'pedidos' ? 'Meus Pedidos' : 'Olá, Produtor'}
                </h1>
                
                {currentView === 'home' && (
                  <div className="location-badge">
                    <MapPin size={16} />
                    <span>Fazenda Santa Luzia • 5km</span>
                  </div>
                )}
                
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="profile-switcher" 
                  style={{ marginTop: '0.75rem', background: 'var(--emerald-600)', color: 'white', border: 'none' }}
                >
                  <Monitor size={14} />
                  Acessar Painel Web
                </button>
              </div>
              <button className="btn-notification">
                <Bell size={20} />
              </button>
            </div>

            {currentView === 'home' && (
              <div className="search-wrapper" style={{ marginTop: '1rem' }}>
                <Search size={20} className="search-icon" />
                <input type="text" placeholder="Buscar insumos, vet..." className="search-input" />
              </div>
            )}
          </header>
        )}

        {/* === TELA 1: HOME === */}
        {currentView === 'home' && (
          <>
            <div className="filters-container">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`chip ${activeFilter === filter ? 'active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="feed-container">
              <div className="feed-header">
                <h2 className="feed-title">Fornecedores Próximos</h2>
              </div>
              <div className="feed-list">
                {feedData.map((item) => (
                  /* Clique no card agora abre o modal passando o item selecionado */
                  <div key={item.id} className="card" onClick={() => setSelectedSupplier()}>
                    <div className="card-icon-wrapper">{item.icon}</div>
                    <div className="card-content">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-subtitle">{item.subtitle}</p>
                      <div className="card-metrics" style={{marginTop: '0.5rem'}}>
                        <Star size={14} color="var(--amber-500)" fill="var(--amber-500)" />
                        <span style={{fontSize: '0.75rem', fontWeight: 700}}>{item.rating}</span>
                        <div className="metric-dot"></div>
                        <span className="metric-distance">{item.distance}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="card-arrow" />
                  </div>
                ))}
              </div>
            </div>
            <button className="fab-btn" onClick={() => setCurrentView('nova_demanda')}><Plus size={24} /></button>
          </>
        )}

        {/* === TELA 2: PEDIDOS === */}
        {currentView === 'pedidos' && (
          <div className="feed-container" style={{ paddingTop: '1rem' }}>
            <div className="tabs-container">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="requests-list">
              {requestsData.filter(req => req.status === activeTab).map((req) => (
                <div key={req.id} className="request-card">
                  <div className="req-header">
                    <span className="req-id">{req.id}</span>
                    <span className={`status-badge ${req.badgeClass}`}>{req.status}</span>
                  </div>
                  <h3 className="req-title">{req.title}</h3>
                  <div className="req-date"><Calendar size={14} />{req.date}</div>
                </div>
              ))}
            </div>
            <button className="fab-btn" onClick={() => setCurrentView('nova_demanda')}><Plus size={24} /></button>
          </div>
        )}

        {/* === TELA 3: NOVA DEMANDA === */}
        {currentView === 'nova_demanda' && (
          <div className="form-container" style={{ paddingTop: '2.5rem' }}>
            <div className="form-header-inner">
              <button className="btn-back" onClick={() => setCurrentView('pedidos')} style={{ border: 'none' }}>
                <ArrowLeft size={20} color="var(--slate-700)" />
              </button>
              <h2 className="form-title">Pedir Insumo</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Sua demanda foi enviada!'); setCurrentView('pedidos'); }}>
              <div className="form-group">
                <label className="form-label">O que você precisa?</label>
                <input type="text" className="form-input" placeholder="Ex: Semente de Milho" required />
              </div>
              <div className="form-group">
                <label className="form-label">Quantidade</label>
                <input type="text" className="form-input" placeholder="Ex: 50 Sacas" required />
              </div>
              <button type="submit" className="btn-submit">Publicar no Mural</button>
            </form>
          </div>
        )}

        {/* === TELA 4: CAIXA DE MENSAGENS === */}
        {currentView === 'mensagens' && (
          <div className="chat-container" style={{ flex: 1, padding: '1rem 1.5rem', overflowY: 'auto' }}>
            {chatsData.map((chat) => (
              <div key={chat.id} className="chat-item" onClick={() => setActiveChat(true)} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--slate-100)', cursor: 'pointer' }}>
                <div className="chat-room-avatar" style={{ flexShrink: 0 }}>{chat.initials}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-800)' }}>{chat.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: chat.unread > 0 ? 'var(--slate-800)' : 'var(--slate-500)', fontWeight: chat.unread > 0 ? 600 : 400 }}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div style={{ background: 'var(--emerald-500)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: '1rem', height: 'fit-content' }}>
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* === BOTTOM NAVIGATION === */}
        {currentView !== 'nova_demanda' && (
          <nav className="bottom-nav">
            <div className={`nav-item ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>
              <Home size={24} /> <span className="nav-label">Início</span>
            </div>
            <div className={`nav-item ${currentView === 'pedidos' ? 'active' : ''}`} onClick={() => setCurrentView('pedidos')}>
              <ClipboardList size={24} /> <span className="nav-label">Pedidos</span>
            </div>
            <div className={`nav-item ${currentView === 'mensagens' ? 'active' : ''}`} onClick={() => setCurrentView('mensagens')}>
              <MessageSquare size={24} />
              {currentView !== 'mensagens' && <div className="badge-dot"></div>}
              <span className="nav-label">Chat</span>
            </div>
            <div className="nav-item">
              <User size={24} /> <span className="nav-label">Perfil</span>
            </div>
          </nav>
        )}

        {/* === TELA SOBREPOSTA: CHAT DA NEGOCIAÇÃO === */}
        {activeChat && (
          <div className="chat-room">
            <header className="chat-room-header">
              <button className="btn-back" onClick={() => setActiveChat(false)} style={{ border: 'none', background: 'none' }}>
                <ArrowLeft size={24} color="var(--slate-600)" />
              </button>
              <div className="chat-room-avatar">MT</div>
              <div className="chat-room-info"><h3>Mercantil Tontonho</h3><p>Online</p></div>
            </header>
            <div className="chat-room-body">
              <div className="message-bubble message-sent">Olá! Vocês têm Adubo NPK em estoque?</div>
              <div className="message-bubble message-received">Olá, Produtor! Segue a nossa proposta comercial.</div>
              <div className="proposal-card">
                <div className="proposal-header"><CheckCircle2 size={18} /><span>Proposta Comercial</span></div>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>Adubo NPK 10-10-10 (50 sacas)</p>
                <div className="proposal-price">R$ 140,00 <span style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>/saca</span></div>
                <button className="btn-accept" onClick={() => alert('Proposta aceita!')}>Aceitar Proposta</button>
              </div>
            </div>
            <footer className="chat-room-footer">
              <input type="text" className="chat-input" placeholder="Digite uma mensagem..." />
              <button className="btn-send-msg"><Send size={18} /></button>
            </footer>
          </div>
        )}

        {/* === ==================================================== === */}
        {/* === NOVO MODAL: DETALHES DO FORNECEDOR (BOTTOM SHEET)   === */}
        {/* === ==================================================== === */}
        {selectedSupplier && (
          <div className="mobile-modal-overlay" onClick={() => setSelectedSupplier(null)}>
            {/* stopPropagation impede fechar o modal ao clicar no meio dele */}
            <div className="mobile-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-modal-header">
                <h3 className="mobile-modal-title">{selectedSupplier.title}</h3>
                <button onClick={() => setSelectedSupplier(null)} style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="mobile-modal-body">
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-500)' }}>
                  <MapPin size={16} color="var(--emerald-600)" />
                  <span>{selectedSupplier.distance}</span>
                  <span>•</span>
                  <Star size={14} color="var(--amber-500)" fill="var(--amber-500)" />
                  <span style={{ color: 'var(--slate-800)' }}>{selectedSupplier.rating}</span>
                </div>

                <p className="mobile-modal-desc">{selectedSupplier.description}</p>
                
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '0.25rem' }}>Especialidades em Destaque:</h4>
                  <div className="product-tag-list">
                    {selectedSupplier.products.map((prod, idx) => (
                      <span key={idx} className="product-tag">{prod}</span>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn-action-mobile" 
                  onClick={() => {
                    setSelectedSupplier(null);
                    setCurrentView('nova_demanda');
                  }}
                >
                  Solicitar Orçamento Direto
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}