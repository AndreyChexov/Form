import { useFormik } from "formik";


const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'Обязательное для заполнения поле!';
    } else if(/^[A-Za-zА-Яа-яЁё\s]{6,}/) {
            errors.name = 'не то!'
    }

    if(!values.email) {
        errors.email = 'Обязательное для заполнения поле!';
    } else if(
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Введите корректный адрес электронной почты!'
    }

    if(!values.tel) {
        errors.tel = 'Обязательное для заполнения поле!';
    }

    if(!values.date) {
        errors.date = 'Обязательное для заполнения поле!';
    }

    if(!values.message) {
        errors.message = 'Обязательное для заполнения поле!';
    } else if (values.message.length < 10 ) {
        errors.message = 'Минимум 10 символов!';
    }
    else if (values.message.length > 300 ) {
        errors.message = 'Максимум 300 символов!';
    }

    if(!values.terms) {
        errors.terms = 'Необходимо согласие для отправки данных!';
    }

return errors;
    
}

const Form = () => {

    const formik = useFormik({
        initialValues:  {
            name: '',
            email: '',
            tel: '',
            date: '',
            message: '',
            terms: false
        },
        validate,

        onSubmit: (values) => { 
            fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values) 
            }
                
            )
            .then(data => {
                if(data) {
                    alert('Данные успешно отправлены!')
                }
            })
            .catch(() => {
                alert('Что-то пошло не так... Попробуйте еще раз')
            })
            .finally(() => {
                
            })
        }   
    })


    return (
        <form className="form" onSubmit={formik.handleSubmit}>

            <h1>Заполните форму</h1>
            <label htmlFor="name" >Ваше имя</label>
            <input type="text"
             name="name"
            className="mb-4"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            />
            {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}

            <label htmlFor="name">Ваша почта</label>
            <input type="email" name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}

            <label htmlFor="name">Ваш номер телефона</label>
            <input type="text" name='tel' className="mb-4" placeholder="+7 (999) 123 45 67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
            value={formik.values.tel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.errors.tel && formik.touched.tel ? <div className="error">{formik.errors.tel}</div> : null}

            <label htmlFor="name">Дата рождения</label>
            <input type="date" name="date" 
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.errors.date && formik.touched.date ? <div className="error">{formik.errors.date}</div> : null}

            <label htmlFor="name">Сообщение</label>
            <textarea type="text" name="message" 
            className="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.errors.message && formik.touched.message ? <div className="error">{formik.errors.message}</div> : null}

            <label className="checkbox">
    
            <input type="checkbox" name="terms"
            className="terms"
            value={formik.values.terms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>

                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null}

            <button type="submit">Отправить</button>
            
        </form>
        
        
    )
};


export default Form;