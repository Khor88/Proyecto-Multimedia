import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

// Import assets
import CombatIcon from '../images/CombatIcon.png';
import TournamentIcon from '../images/TournamentIcon.png';
import LeagueIcon from '../images/LeagueIcon.png';
import Banner from '../images/banner.png';

const MainPage: React.FC = () => {
  const history = useHistory();
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  const menuItems = [
    { title: 'Combate Rápido', route: '/combat', icon: CombatIcon },
    { title: 'Torneos Rápidos', route: '/tournament', icon: TournamentIcon },
    { title: 'Ligas', route: '/league', icon: LeagueIcon }
  ];

  const handleNavigate = (route: string) => {
    setActiveRoute(route);
    setTimeout(() => history.push(route), 200);
  };

  return (
    <IonPage>
      <IonContent>
        {/* Banner */}
        <div style={{ borderBottom: '4px solid var(--ion-color-primary)' }}>
          <IonImg src={Banner} style={{ width: '100%', height: 'auto', maxHeight: '220px', objectFit: 'cover' }} />
        </div>

        <IonGrid className="ion-padding-horizontal" style={{ marginTop: '24px' }}>
          <IonRow>
            {menuItems.map((item, idx) => (
              <IonCol size="12" key={idx}>
                <div 
                  onClick={() => handleNavigate(item.route)}
                  style={{ 
                    height: '110px', 
                    marginBottom: '16px',
                    backgroundColor: '#0D0D0D',
                    border: activeRoute === item.route ? '1px solid var(--ion-color-primary)' : '1px solid var(--fcx-border-color)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <IonImg src={item.icon} style={{ width: '72px', height: '72px', marginRight: '24px' }} />
                  <IonText style={{ fontSize: '20px', fontWeight: '600', color: '#fff' }}>
                    {item.title}
                  </IonText>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
