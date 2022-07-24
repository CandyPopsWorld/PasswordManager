
import './Passwords.scss';
const Passwords = () => {
    return (
        <div className="passwords_section">
            <div className="passwords_section_item">
                <div className="passwords_section_header">
                    <h2>Ваши пароли</h2>
                </div>
            </div>

            <div className="passwords_section_item">
                <div className="passwords_list">
                    <div className="passwords_list_item">
                        <div className="passwords_list_item_name_source">
                            РЕСУРС
                        </div>
                        <div className="passwords_list_item_name_password">
                            ПАРОЛЬ
                        </div>
                    </div>

                    <div className="passwords_list_item">
                        <div className="passwords_list_item_source">
                            Google
                        </div>
                        <div className="passwords_list_item_password">
                            123456789
                        </div>
                    </div>

                    <div className="passwords_list_item">
                        <div className="passwords_list_item_source">
                            Facebook
                        </div>
                        <div className="passwords_list_item_password">
                            qwertyuiop
                        </div>
                    </div>

                </div>
            </div>

            <div className="passwords_section_item">
                <div className="passwords_section_add_password_form">
                    <div className="passwords_section_add_password_form_item">
                        <label htmlFor="">Название ресурса</label>
                        <input type="text"/>
                    </div>

                    <div className="passwords_section_add_password_form_item">
                        <label htmlFor="">Пароль для этого ресурса</label>
                        <input type="text"/>
                    </div>
                    <button>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Passwords;