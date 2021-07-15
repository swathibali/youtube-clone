import './loginScreen.scss'

const LoginScreen = () => {
    return (
        <div className="login">
            <div className="login__container">
                <h2>Youtube Clone</h2>
                <img 
                    src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' 
                    alt="" 
                />
                <button>Login into google</button>
                <p>This project is made using YOUTUBE DATA API</p>
            </div>
        </div>
    )
}

export default LoginScreen
