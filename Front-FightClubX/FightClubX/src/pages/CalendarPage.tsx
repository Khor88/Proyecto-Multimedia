import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonNote,
  IonImg
} from '@ionic/react';

// Import icons
import CombatIcon from '../images/CombatIcon.png';

const CalendarPage: React.FC = () => {
  const events = [
    { id: 1, title: 'Torneo Amateur Madrid', date: '25 Mayo 2026', type: 'Torneo' },
    { id: 2, title: 'Combate Benéfico', date: '02 Junio 2026', type: 'Combate' },
    { id: 3, title: 'Liga Regional S1', date: '15 Junio 2026', type: 'Liga' },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg src={CombatIcon} className="fcx-page-icon" />
        
        <IonList style={{ background: 'transparent', marginTop: '20px' }}>
          {events.map(event => (
            <IonItem key={event.id} style={{ '--padding-bottom': '10px' }}>
              <IonLabel>
                <h2 style={{ fontWeight: '600' }}>{event.title}</h2>
                <IonNote style={{ color: 'var(--fcx-text-muted)' }}>{event.date}</IonNote>
              </IonLabel>
              <IonBadge color="dark" slot="end" style={{ border: '1px solid var(--fcx-border-color)', fontWeight: '400' }}>
                {event.type}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
