//SHARED
import { Icons } from '_@shared/icons/Imports'
//TYPES MODULES
import type { Meta } from '@storybook/react'

const IconsDoc: Meta = {
  title: 'Atoms/Icons',
}
export default IconsDoc

export const Docs = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        backgroundColor: 'rgba(194, 194, 194, 0.1)',
        padding: '20px',
        borderRadius: '5px',
      }}
    >
      {Object.keys(Icons).map((key) => {
        const Icon = Icons[key as keyof typeof Icons].icon

        return (
          <div
            key={key}
            style={{
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '10px', color: '#333', flex: 1 }}>
              <Icon style={{ width: 'auto', height: 40, color: '#333' }} />
            </div>
            <div style={{ fontSize: '16px', color: '#64748b' }}>{key}</div>
          </div>
        )
      })}
    </div>
  )
}
