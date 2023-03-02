import navbar from './navbar.module.css'

const Navbar = () => {
    return (
        <div className={navbar.main_Component}>
            <div className={navbar.header}>
                <h1 className={navbar.logo}>Order-Tracking-Chat-Bot</h1>
                <p className={navbar.options}>Home</p>
                <p className={navbar.options}>Blog</p>
                <p className={navbar.options}>Contact</p>
                <p className={navbar.options}>About</p>
            </div>
        </div>
    )
}

export default Navbar