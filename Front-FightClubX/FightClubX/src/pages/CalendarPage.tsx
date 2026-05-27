import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { calendarOutline, locationOutline, trophyOutline, fitnessOutline, ribbonOutline } from 'ionicons/icons';

const CalendarPage: React.FC = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust to start with Monday (Lunes) as the first column
  // If firstDay is 0 (Sunday), it should be 6. If it's 1 (Monday), it should be 0.
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const events = [
    { id: 1, title: 'Torneo Amateur Madrid', date: '25 ' + monthNames[currentMonth], type: 'Torneo', icon: trophyOutline, color: 'var(--ion-color-primary)' },
    { id: 2, title: 'Combate Benéfico', date: '02 ' + monthNames[(currentMonth + 1) % 12], type: 'Combate', icon: fitnessOutline, color: 'var(--ion-color-secondary)' },
    { id: 3, title: 'Liga Regional S1', date: '15 ' + monthNames[(currentMonth + 1) % 12], type: 'Liga', icon: ribbonOutline, color: 'var(--ion-color-tertiary)' },
  ];

  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle style={{ fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Calendario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {/* Month Selector Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
          <IonText color="primary">
            <h2 style={{ fontWeight: '700', margin: 0, fontSize: '24px' }}>{monthNames[currentMonth]} {currentYear}</h2>
          </IonText>
          <IonIcon icon={calendarOutline} color="primary" style={{ fontSize: '24px' }} />
        </div>

        {/* Calendar Grid */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '15px', border: '1px solid var(--fcx-border-color)', marginBottom: '30px' }}>
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-text-center">
              {daysOfWeek.map(day => (
                <IonCol key={day}><IonText color="medium" style={{ fontSize: '12px', fontWeight: 'bold' }}>{day}</IonText></IonCol>
              ))}
            </IonRow>
            <IonRow className="ion-text-center" style={{ marginTop: '10px' }}>
              {/* Empty spaces for start offset */}
              {Array.from({ length: startOffset }).map((_, i) => (
                <IonCol size="1.7" key={`offset-${i}`} />
              ))}
              {/* Real days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === currentDay;
                return (
                  <IonCol size="1.7" key={day} style={{ padding: '8px 0', position: 'relative' }}>
                    <IonText style={{ 
                      color: isToday ? 'var(--ion-color-primary)' : '#fff', 
                      fontWeight: isToday ? '900' : 'normal',
                      fontSize: '14px'
                    }}>
                      {day}
                    </IonText>
                    {isToday && <div style={{ width: '4px', height: '4px', background: 'var(--ion-color-primary)', borderRadius: '50%', position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)' }} />}
                    {day === 25 && !isToday && <div style={{ width: '4px', height: '4px', background: 'rgba(255, 61, 113, 0.5)', borderRadius: '50%', position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)' }} />}
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        </div>

        <IonText color="medium">
          <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Próximos Eventos</h3>
        </IonText>

        <IonList style={{ background: 'transparent' }}>
          {events.map(event => (
            <IonCard key={event.id} style={{ 
              margin: '0 0 16px 0', 
              borderRadius: '20px', 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--fcx-border-color)',
              boxShadow: 'none'
            }}>
              <IonCardContent style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '15px', 
                    background: `rgba(${event.color.includes('primary') ? '255, 61, 113' : event.color.includes('secondary') ? '61, 187, 255' : '106, 100, 255'}, 0.1)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '16px'
                  }}>
                    <IonIcon icon={event.icon} style={{ fontSize: '24px', color: event.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <IonText><h2 style={{ fontWeight: '700', fontSize: '18px', margin: '0 0 4px 0' }}>{event.title}</h2></IonText>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IonIcon icon={calendarOutline} color="medium" style={{ fontSize: '14px' }} />
                        <IonText color="medium"><span style={{ fontSize: '13px' }}>{event.date}</span></IonText>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IonIcon icon={locationOutline} color="medium" style={{ fontSize: '14px' }} />
                        <IonText color="medium"><span style={{ fontSize: '13px' }}>Madrid</span></IonText>
                      </div>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
        {/* Spacer to prevent tab bar overlap */}
        <div style={{ height: '80px' }} />
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
