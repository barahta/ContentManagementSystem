import Select, { StylesConfig } from 'react-select';

export default function MySelect({options}){

    return (
        <Select
            className='select'
            options={options}
            placeholder="Select table"
            styles={{
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: 'rgba(180, 180, 180, 1)',
                    backgroundColor: 'rgba(51, 51, 51, 1)',
                    fontFamily:'Montserrat, sans-serif',
                    textTransform:'uppercase',
                    fontSize:'0.7rem',
                    fontWeight:'600',
                }),
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: 'rgba(51, 51, 51, 1)',
                    borderWidth:'3px',
                    borderRadius:'0',
                    borderColor:'rgba(180, 180, 180, 1)',
                    height:'40px',
                    width:'calc(80% + 26px)',
                    marginBottom:'10px',
                    outline: 'none',
                    appearance:'none',
                    div: {
                        fontFamily:'Montserrat, sans-serif',
                        textTransform:'uppercase',
                        fontSize:'0.7rem',
                        fontWeight:'600',
                        color: 'rgba(180, 180, 180, 1) !important', // Устанавливаем цвет текста внутри input
                    },
                    ':hover': {
                        borderColor:'rgba(180, 180, 180, 1)',  // Замените цветом, который вы хотите видеть при наведении
                    },
                    ':focus-within': {
                        color:'rgba(180, 180, 180, 1)',
                        outline: 'none',
                        boxShadow: 'none',
                    }
                }),
            }}
        />
    )
}