import React, { useState } from 'react';

const TestForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div>
            <h2>Formulário de Teste</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>

                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default TestForm;
